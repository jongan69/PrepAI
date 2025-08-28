import React, { useEffect } from 'react';

import { syncService } from '@/services/sync-service';
import { useSyncStore } from '@/stores/sync-store';

interface SyncInitializerProps {
  children: React.ReactNode;
}

export const SyncInitializer: React.FC<SyncInitializerProps> = ({ children }) => {
  // Call hook unconditionally at the top level
  const storeState = useSyncStore();

  // Extract values safely with fallbacks
  const syncEnabled = storeState?.syncEnabled ?? false;
  const isSyncing = storeState?.isSyncing ?? false;
  const lastSyncTime = storeState?.lastSyncTime;
  const getSyncStats = storeState?.getSyncStats ?? (() => ({}));

  useEffect(() => {
    // Initialize sync service
    syncService.initialize();

    // Set up periodic sync if enabled
    if (syncEnabled) {
      syncService.startBackgroundSync();
    }

    return () => {
      syncService.stopBackgroundSync();
    };
  }, [syncEnabled]);

  // Log sync status for debugging
  useEffect(() => {
    if (!storeState) return;

    const stats = getSyncStats();
    console.log('🔄 Sync Status:', {
      enabled: syncEnabled,
      syncing: isSyncing,
      lastSync: lastSyncTime,
      stats,
    });
  }, [syncEnabled, isSyncing, lastSyncTime, getSyncStats, storeState]);

  // Handle case where store might not be fully initialized
  if (!storeState) {
    console.warn('Sync store not initialized yet');
    return <>{children}</>;
  }

  return <>{children}</>;
};
