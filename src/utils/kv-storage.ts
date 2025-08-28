import Storage from 'expo-sqlite/kv-store';

/**
 * Enhanced key-value storage utility using expo-sqlite
 * Provides both async and sync APIs with additional convenience methods
 */
export class KVStorage {
  /**
   * Set a value with automatic JSON serialization
   */
  static async setItem(key: string, value: any): Promise<void> {
    try {
      const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
      await Storage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Failed to set item ${key}:`, error);
      throw error;
    }
  }

  /**
   * Set a value synchronously with automatic JSON serialization
   */
  static setItemSync(key: string, value: any): void {
    try {
      const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
      Storage.setItemSync(key, serializedValue);
    } catch (error) {
      console.error(`Failed to set item ${key} synchronously:`, error);
      throw error;
    }
  }

  /**
   * Get a value with automatic JSON deserialization
   */
  static async getItem<T = any>(key: string): Promise<T | null> {
    try {
      const value = await Storage.getItem(key);
      if (value === null) return null;

      // Try to parse as JSON, fallback to string
      try {
        return JSON.parse(value) as T;
      } catch {
        return value as T;
      }
    } catch (error) {
      console.error(`Failed to get item ${key}:`, error);
      return null;
    }
  }

  /**
   * Get a value synchronously with automatic JSON deserialization
   */
  static getItemSync<T = any>(key: string): T | null {
    try {
      const value = Storage.getItemSync(key);
      if (value === null) return null;

      // Try to parse as JSON, fallback to string
      try {
        return JSON.parse(value) as T;
      } catch {
        return value as T;
      }
    } catch (error) {
      console.error(`Failed to get item ${key} synchronously:`, error);
      return null;
    }
  }

  /**
   * Remove an item
   */
  static async removeItem(key: string): Promise<void> {
    try {
      await Storage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove item ${key}:`, error);
      throw error;
    }
  }

  /**
   * Remove an item synchronously
   */
  static removeItemSync(key: string): void {
    try {
      Storage.removeItemSync(key);
    } catch (error) {
      console.error(`Failed to remove item ${key} synchronously:`, error);
      throw error;
    }
  }

  /**
   * Get all keys
   */
  static async getAllKeys(): Promise<string[]> {
    try {
      return await Storage.getAllKeys();
    } catch (error) {
      console.error('Failed to get all keys:', error);
      return [];
    }
  }

  /**
   * Get all keys synchronously
   */
  static getAllKeysSync(): string[] {
    try {
      return Storage.getAllKeysSync();
    } catch (error) {
      console.error('Failed to get all keys synchronously:', error);
      return [];
    }
  }

  /**
   * Clear all data
   */
  static async clear(): Promise<void> {
    try {
      await Storage.clear();
    } catch (error) {
      console.error('Failed to clear storage:', error);
      throw error;
    }
  }

  /**
   * Clear all data synchronously
   */
  static clearSync(): void {
    try {
      Storage.clearSync();
    } catch (error) {
      console.error('Failed to clear storage synchronously:', error);
      throw error;
    }
  }

  /**
   * Multi-get operation
   */
  static async multiGet(keys: string[]): Promise<[string, any][]> {
    try {
      const results = await Storage.multiGet(keys);
      return results.map(([key, value]) => {
        if (value === null) return [key, null];
        try {
          return [key, JSON.parse(value)];
        } catch {
          return [key, value];
        }
      });
    } catch (error) {
      console.error('Failed to multi-get:', error);
      return [];
    }
  }

  /**
   * Multi-set operation
   */
  static async multiSet(keyValuePairs: [string, any][]): Promise<void> {
    try {
      const serializedPairs: [string, string][] = keyValuePairs.map(([key, value]) => [
        key,
        typeof value === 'string' ? value : JSON.stringify(value),
      ]);
      await Storage.multiSet(serializedPairs);
    } catch (error) {
      console.error('Failed to multi-set:', error);
      throw error;
    }
  }

  /**
   * Multi-remove operation
   */
  static async multiRemove(keys: string[]): Promise<void> {
    try {
      await Storage.multiRemove(keys);
    } catch (error) {
      console.error('Failed to multi-remove:', error);
      throw error;
    }
  }

  /**
   * Check if a key exists
   */
  static async hasKey(key: string): Promise<boolean> {
    try {
      const value = await Storage.getItem(key);
      return value !== null;
    } catch (error) {
      console.error(`Failed to check if key ${key} exists:`, error);
      return false;
    }
  }

  /**
   * Check if a key exists synchronously
   */
  static hasKeySync(key: string): boolean {
    try {
      const value = Storage.getItemSync(key);
      return value !== null;
    } catch (error) {
      console.error(`Failed to check if key ${key} exists synchronously:`, error);
      return false;
    }
  }

  /**
   * Get storage size information
   */
  static async getStorageSize(): Promise<{ used: number; total: number }> {
    try {
      const keys = await this.getAllKeys();
      let totalSize = 0;

      for (const key of keys) {
        const value = await Storage.getItem(key);
        if (value) {
          totalSize += key.length + value.length;
        }
      }

      return {
        used: totalSize,
        total: 50 * 1024 * 1024, // 50MB typical limit
      };
    } catch (error) {
      console.error('Failed to get storage size:', error);
      return { used: 0, total: 0 };
    }
  }

  /**
   * Batch operations for better performance
   */
  static async batch(
    operations: { type: 'get' | 'set' | 'remove'; key: string; value?: any }[]
  ): Promise<any[]> {
    try {
      const results = [];

      for (const operation of operations) {
        switch (operation.type) {
          case 'get':
            results.push(await this.getItem(operation.key));
            break;
          case 'set':
            await this.setItem(operation.key, operation.value);
            results.push(true);
            break;
          case 'remove':
            await this.removeItem(operation.key);
            results.push(true);
            break;
        }
      }

      return results;
    } catch (error) {
      console.error('Failed to execute batch operations:', error);
      throw error;
    }
  }
}

// Export the original Storage for direct access when needed
export { Storage };

// Default export for convenience
export default KVStorage;
