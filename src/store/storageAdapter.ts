/**
 * Storage adapter for offline-first data layer.
 * Currently uses AsyncStorage.
 * Swap to expo-sqlite when native modules are available.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StorageAdapter {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  clear: () => Promise<void>;
  getAllKeys: () => Promise<readonly string[]>;
  multiGet: (keys: string[]) => Promise<readonly [string, string | null][]>;
}

export const storage: StorageAdapter = {
  getItem: AsyncStorage.getItem.bind(AsyncStorage),
  setItem: AsyncStorage.setItem.bind(AsyncStorage),
  removeItem: AsyncStorage.removeItem.bind(AsyncStorage),
  clear: AsyncStorage.clear.bind(AsyncStorage),
  getAllKeys: AsyncStorage.getAllKeys.bind(AsyncStorage),
  multiGet: AsyncStorage.multiGet.bind(AsyncStorage),
};

/**
 * Migration target: expo-sqlite adapter
 *
 * import * as SQLite from 'expo-sqlite';
 *
 * const db = SQLite.openDatabaseSync('kage.db');
 *
 * export const sqliteStorage: StorageAdapter = {
 *   getItem: async (key) => {
 *     const row = db.getFirstSync<{ value: string }>('SELECT value FROM storage WHERE key = ?', key);
 *     return row?.value ?? null;
 *   },
 *   setItem: async (key, value) => {
 *     db.runSync('INSERT OR REPLACE INTO storage (key, value) VALUES (?, ?)', key, value);
 *   },
 *   removeItem: async (key) => {
 *     db.runSync('DELETE FROM storage WHERE key = ?', key);
 *   },
 *   clear: async () => {
 *     db.runSync('DELETE FROM storage');
 *   },
 *   getAllKeys: async () => {
 *     const rows = db.getAllSync<{ key: string }>('SELECT key FROM storage');
 *     return rows.map((r) => r.key);
 *   },
 *   multiGet: async (keys) => {
 *     const placeholders = keys.map(() => '?').join(',');
 *     const rows = db.getAllSync<{ key: string; value: string }>(
 *       `SELECT key, value FROM storage WHERE key IN (${placeholders})`,
 *       ...keys,
 *     );
 *     const map = new Map(rows.map((r) => [r.key, r.value]));
 *     return keys.map((k): [string, string | null] => [k, map.get(k) ?? null]);
 *   },
 * };
 */
