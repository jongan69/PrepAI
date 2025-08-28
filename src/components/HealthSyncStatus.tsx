import React from 'react';
import { View } from 'react-native';

import { Button } from './Button';
import Icon from './Icon';
import ThemedText from './ThemedText';

import { useSyncStore } from '@/stores/sync-store';

interface HealthSyncStatusProps {
  showControls?: boolean;
  className?: string;
  compact?: boolean;
}

export function HealthSyncStatus({ showControls = true, className = '', compact = false }: HealthSyncStatusProps) {
  const { isSyncing, lastSyncTime, syncEnabled, getSyncStats, setSyncEnabled } = useSyncStore();

  const stats = getSyncStats();

  const getStatusIcon = () => {
    if (isSyncing) return 'Loader2';
    if (stats.syncPercentage === 100) return 'CheckCircle';
    if (stats.failed > 0) return 'AlertCircle';
    return 'Cloud';
  };

  const getStatusColor = () => {
    if (isSyncing) return 'text-blue-500';
    if (stats.syncPercentage === 100) return 'text-green-500';
    if (stats.failed > 0) return 'text-red-500';
    return 'text-gray-500';
  };

  const getStatusText = () => {
    if (isSyncing) return 'Syncing...';
    if (stats.syncPercentage === 100) return 'Synced';
    if (stats.failed > 0) return 'Sync Error';
    return `${stats.syncPercentage}% Synced`;
  };

  const formatLastSync = () => {
    if (!lastSyncTime) return 'Never';
    const now = new Date();
    const lastSync = new Date(lastSyncTime);
    const diff = now.getTime() - lastSync.getTime();
    const minutes = Math.floor(diff / (1000 * 60));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (compact) {
    return (
      <View className={`flex-row items-center space-x-2 ${className}`}>
        <Icon
          name={getStatusIcon()}
          size={16}
          className={getStatusColor()}
        />
        <ThemedText className="text-xs text-gray-600 dark:text-gray-400">{getStatusText()}</ThemedText>
        {showControls && (
          <Button
            onPress={() => setSyncEnabled(!syncEnabled)}
            className={`px-2 py-1 ${syncEnabled ? 'bg-red-500' : 'bg-green-500'}`}
            title={syncEnabled ? 'Stop' : 'Auto'}
            textClassName="text-xs text-white"
          />
        )}
      </View>
    );
  }

  return (
    <View className={`flex-row items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-800 ${className}`}>
      <View className="flex-row items-center space-x-3">
        <Icon
          name={getStatusIcon()}
          size={20}
          className={getStatusColor()}
        />
        <View>
          <ThemedText className="text-sm font-medium">Health Data Sync</ThemedText>
          <ThemedText className="text-xs text-gray-500 dark:text-gray-400">
            {getStatusText()} • Last sync: {formatLastSync()}
          </ThemedText>
        </View>
      </View>

      {showControls && (
        <View className="flex-row space-x-2">
          <Button
            onPress={() => setSyncEnabled(!syncEnabled)}
            className={`px-3 py-1 ${syncEnabled ? 'bg-red-500' : 'bg-green-500'}`}
            title={syncEnabled ? 'Stop Auto' : 'Enable Auto'}
            textClassName="text-xs text-white"
          />
        </View>
      )}
    </View>
  );
}
