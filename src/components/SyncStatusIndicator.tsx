import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import Icon from './Icon';
import ThemedText from './ThemedText';

import { syncService } from '@/services/sync-service';
import { useSyncStore } from '@/stores/sync-store';

export const SyncStatusIndicator: React.FC = () => {
  // Always call the hook, handle errors in the component logic
  const storeState = useSyncStore();

  // Check if store is properly initialized
  if (!storeState || typeof storeState.getSyncStats !== 'function') {
    console.warn('Sync store not properly initialized');
    return null;
  }

  const { isSyncing, lastSyncTime, syncEnabled, getSyncStats } = storeState;
  const stats = getSyncStats();

  const handleManualSync = () => {
    if (!isSyncing) {
      syncService.syncNow();
    }
  };

  const getStatusColor = () => {
    if (isSyncing) return 'text-blue-500';
    if (stats.failed > 0) return 'text-red-500';
    if (stats.unsynced > 0) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getStatusText = () => {
    if (isSyncing) return 'Syncing...';
    if (stats.failed > 0) return `${stats.failed} failed`;
    if (stats.unsynced > 0) return `${stats.unsynced} pending`;
    return 'Up to date';
  };

  const getStatusIcon = () => {
    if (isSyncing) return 'RefreshCw';
    if (stats.failed > 0) return 'AlertCircle';
    if (stats.unsynced > 0) return 'Clock';
    return 'CheckCircle';
  };

  if (!syncEnabled) {
    return (
      <View className="flex-row items-center rounded-lg bg-gray-100 p-2">
        <Icon name="WifiOff" size={16} className="mr-2 text-gray-500" />
        <ThemedText className="text-sm text-gray-500">Sync disabled</ThemedText>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={handleManualSync}
      disabled={isSyncing}
      className="flex-row items-center rounded-lg bg-gray-50 p-2">
      <Icon
        name={getStatusIcon()}
        size={16}
        className={`${getStatusColor()} mr-2 ${isSyncing ? 'animate-spin' : ''}`}
      />
      <View className="flex-1">
        <ThemedText className={`text-sm ${getStatusColor()}`}>{getStatusText()}</ThemedText>
        {lastSyncTime && (
          <ThemedText className="text-xs text-gray-500">
            Last sync: {new Date(lastSyncTime).toLocaleTimeString()}
          </ThemedText>
        )}
      </View>
      {stats.total > 0 && (
        <View className="rounded-full bg-gray-200 px-2 py-1">
          <ThemedText className="text-xs text-gray-600">
            {stats.synced}/{stats.total}
          </ThemedText>
        </View>
      )}
    </TouchableOpacity>
  );
};
