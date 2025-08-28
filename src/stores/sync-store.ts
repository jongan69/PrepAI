import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Import storage with error handling
let Storage: any;
try {
  Storage = require('expo-sqlite/kv-store').default;
} catch (error) {
  console.warn('SQLite storage not available, using memory storage');
  Storage = {
    getItem: () => Promise.resolve(null),
    setItem: () => Promise.resolve(),
    removeItem: () => Promise.resolve(),
  };
}

export interface SyncOperation {
  id: string;
  operation: 'CREATE' | 'UPDATE' | 'DELETE';
  tableName: string;
  recordId: string;
  recordData?: any;
  timestamp: string;
  synced: boolean;
  syncAttempts: number;
  lastSyncAttempt?: string;
  error?: string;
}

interface SyncState {
  // Operations tracking
  operations: SyncOperation[];
  lastSyncTime: string | null;
  isSyncing: boolean;
  syncEnabled: boolean;

  // Actions
  addOperation: (operation: Omit<SyncOperation, 'id' | 'synced' | 'syncAttempts'>) => void;
  markOperationSynced: (operationId: string) => void;
  markOperationFailed: (operationId: string, error: string) => void;
  clearSyncedOperations: () => void;
  setLastSyncTime: (timestamp: string) => void;
  setIsSyncing: (syncing: boolean) => void;
  setSyncEnabled: (enabled: boolean) => void;

  // Computed values
  getUnsyncedOperations: () => SyncOperation[];
  getSyncStats: () => {
    total: number;
    synced: number;
    unsynced: number;
    failed: number;
    syncPercentage: number;
  };
}

// Create store with error handling
let useSyncStore: any;

try {
  useSyncStore = create<SyncState>()(
    persist(
      (set, get) => ({
        // Initial state
        operations: [],
        lastSyncTime: null,
        isSyncing: false,
        syncEnabled: true,

      // Actions
      addOperation: (operation) => {
        const newOperation: SyncOperation = {
          ...operation,
          id: `${operation.tableName}_${operation.recordId}_${Date.now()}`,
          synced: false,
          syncAttempts: 0,
        };

        console.log(`🔄 SyncStore - adding operation:`, newOperation);

        set((state) => {
          const newState = {
            operations: [...state.operations, newOperation],
          };
          console.log(`🔄 SyncStore - new state operations count:`, newState.operations.length);
          return newState;
        });

        console.log(
          `🔄 SyncStore - added ${operation.operation} operation for ${operation.tableName}:${operation.recordId}`
        );
      },

      markOperationSynced: (operationId) => {
        set((state) => ({
          operations: state.operations.map((op) =>
            op.id === operationId
              ? { ...op, synced: true, lastSyncAttempt: new Date().toISOString() }
              : op
          ),
        }));
      },

      markOperationFailed: (operationId, error) => {
        set((state) => ({
          operations: state.operations.map((op) =>
            op.id === operationId
              ? {
                  ...op,
                  syncAttempts: op.syncAttempts + 1,
                  lastSyncAttempt: new Date().toISOString(),
                  error,
                }
              : op
          ),
        }));
      },

      clearSyncedOperations: () => {
        set((state) => ({
          operations: state.operations.filter((op) => !op.synced),
        }));
      },

      setLastSyncTime: (timestamp) => {
        set({ lastSyncTime: timestamp });
      },

      setIsSyncing: (syncing) => {
        set({ isSyncing: syncing });
      },

      setSyncEnabled: (enabled) => {
        set({ syncEnabled: enabled });
      },

      // Computed values
      getUnsyncedOperations: () => {
        return get().operations.filter((op) => !op.synced);
      },

      getSyncStats: () => {
        const { operations } = get();
        const total = operations.length;
        const synced = operations.filter((op) => op.synced).length;
        const unsynced = operations.filter((op) => !op.synced && !op.error).length;
        const failed = operations.filter((op) => op.error).length;
        const syncPercentage = total > 0 ? Math.round((synced / total) * 100) : 100;

        return {
          total,
          synced,
          unsynced,
          failed,
          syncPercentage,
        };
      },
    }),
    {
      name: 'sync-store',
      storage: createJSONStorage(() => Storage),
      partialize: (state) => ({
        operations: state.operations,
        lastSyncTime: state.lastSyncTime,
        syncEnabled: state.syncEnabled,
      }),
    }
  )
);
} catch (error) {
  console.error('Failed to create sync store:', error);
  // Fallback store
  useSyncStore = () => ({
    operations: [],
    lastSyncTime: null,
    isSyncing: false,
    syncEnabled: false,
    addOperation: () => {},
    markOperationSynced: () => {},
    markOperationFailed: () => {},
    clearSyncedOperations: () => {},
    setLastSyncTime: () => {},
    setIsSyncing: () => {},
    setSyncEnabled: () => {},
    getUnsyncedOperations: () => [],
    getSyncStats: () => ({
      total: 0,
      synced: 0,
      unsynced: 0,
      failed: 0,
      syncPercentage: 100,
    }),
  });
}

export { useSyncStore };
