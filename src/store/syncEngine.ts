import AsyncStorage from '@react-native-async-storage/async-storage';

const SYNC_QUEUE_KEY = '@kage_sync_queue';
const LAST_SYNC_KEY = '@kage_last_sync';

export interface SyncOperation {
  id: string;
  type: 'workout' | 'progression' | 'pact' | 'battleCry' | 'measurement' | 'nutrition';
  action: 'create' | 'update' | 'delete';
  entityId: string;
  data: any;
  createdAt: string;
  retries: number;
}

class SyncEngine {
  private processing = false;

  async getQueue(): Promise<SyncOperation[]> {
    try {
      const raw = await AsyncStorage.getItem(SYNC_QUEUE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  async enqueue(op: Omit<SyncOperation, 'id' | 'createdAt' | 'retries'>): Promise<void> {
    const queue = await this.getQueue();
    queue.push({
      ...op,
      id: `sync_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      createdAt: new Date().toISOString(),
      retries: 0,
    });
    await AsyncStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
  }

  async getLastSync(): Promise<Date | null> {
    try {
      const raw = await AsyncStorage.getItem(LAST_SYNC_KEY);
      return raw ? new Date(raw) : null;
    } catch {
      return null;
    }
  }

  async processQueue(isOnline: () => boolean): Promise<{ synced: number; failed: number }> {
    if (this.processing || !isOnline()) return { synced: 0, failed: 0 };
    this.processing = true;

    const queue = await this.getQueue();
    let synced = 0;
    let failed = 0;
    const remaining: SyncOperation[] = [];

    for (const op of queue) {
      try {
        await this.executeOp(op);
        synced++;
      } catch {
        op.retries++;
        if (op.retries < 5) {
          remaining.push(op);
        } else {
          failed++;
        }
      }
    }

    await AsyncStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(remaining));
    if (synced > 0) {
      await AsyncStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());
    }

    this.processing = false;
    return { synced, failed };
  }

  private async executeOp(op: SyncOperation): Promise<void> {
    const apiBase = 'http://localhost:8000/api';

    const endpoints: Record<string, string> = {
      workout: `${apiBase}/workout-sessions`,
      progression: `${apiBase}/progression`,
      measurement: `${apiBase}/body-measurements`,
    };

    const endpoint = endpoints[op.type];
    if (!endpoint) return;

    switch (op.action) {
      case 'create':
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${await AsyncStorage.getItem('@kage_token') || ''}` },
          body: JSON.stringify(op.data),
        });
        break;
      case 'update':
        await fetch(`${endpoint}/${op.entityId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${await AsyncStorage.getItem('@kage_token') || ''}` },
          body: JSON.stringify(op.data),
        });
        break;
      case 'delete':
        await fetch(`${endpoint}/${op.entityId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${await AsyncStorage.getItem('@kage_token') || ''}` },
        });
        break;
    }
  }

  async clearQueue(): Promise<void> {
    await AsyncStorage.removeItem(SYNC_QUEUE_KEY);
  }
}

export const syncEngine = new SyncEngine();
