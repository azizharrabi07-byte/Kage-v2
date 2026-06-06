import { useState, useEffect, useCallback } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const sub = AppState.addEventListener('change', setAppState);
    return () => sub.remove();
  }, []);

  const checkConnection = useCallback(async (): Promise<boolean> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const res = await fetch('http://localhost:8000/api/health', {
        method: 'HEAD',
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return res.ok;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    checkConnection().then(setIsOnline);
    const interval = setInterval(() => checkConnection().then(setIsOnline), 30000);
    return () => clearInterval(interval);
  }, [checkConnection, appState]);

  return { isOnline, checkConnection };
}
