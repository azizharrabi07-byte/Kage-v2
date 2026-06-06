import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PACTS_KEY = '@kage_warrior_pacts';
const BATTLE_CRY_KEY = '@kage_active_battle_cry';
const CRY_HISTORY_KEY = '@kage_battle_cry_history';

export interface WarriorPact {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerAvatar?: string;
  streak: number;
  combinedStreak: number;
  shieldLevel: 'bronze' | 'silver' | 'gold' | 'onyx';
  shieldProgress: number;
  lastWorkoutDate: string;
  partnerLastWorkoutDate: string;
  status: 'safe' | 'warning' | 'danger' | 'breaking';
  createdAt: string;
  inviteCode?: string;
}

export interface BattleCry {
  id: string;
  pactId: string;
  triggeredAt: string;
  respondedAt?: string;
  myResponse?: { text: string; photoUrl?: string };
  partnerResponse?: { text: string; photoUrl?: string };
  status: 'pending' | 'responded' | 'expired';
}

export interface LeaderboardEntry {
  rank: number;
  pactId: string;
  partnerName: string;
  combinedStreak: number;
  shieldLevel: string;
}

interface WarriorPactState {
  pacts: WarriorPact[];
  activeBattleCry: BattleCry | null;
  battleCryHistory: BattleCry[];
  leaderboard: LeaderboardEntry[];
  loading: boolean;

  loadPacts: () => Promise<void>;
  addPact: (pact: WarriorPact) => void;
  removePact: (id: string) => void;
  updatePact: (id: string, updates: Partial<WarriorPact>) => void;
  setActiveBattleCry: (cry: BattleCry | null) => void;
  respondToBattleCry: (cryId: string, response: { text: string; photoUrl?: string }) => void;
  loadLeaderboard: () => Promise<void>;
}

const defaultPacts: WarriorPact[] = [
  {
    id: '1',
    partnerId: 'p1',
    partnerName: 'Sarah',
    streak: 12,
    combinedStreak: 12,
    shieldLevel: 'silver',
    shieldProgress: 0.4,
    lastWorkoutDate: new Date().toISOString(),
    partnerLastWorkoutDate: new Date().toISOString(),
    status: 'safe',
    createdAt: new Date(Date.now() - 12 * 86400000).toISOString(),
  },
  {
    id: '2',
    partnerId: 'p2',
    partnerName: 'Mike',
    streak: 3,
    combinedStreak: 3,
    shieldLevel: 'bronze',
    shieldProgress: 0.15,
    lastWorkoutDate: new Date(Date.now() - 86400000).toISOString(),
    partnerLastWorkoutDate: new Date(Date.now() - 2 * 86400000).toISOString(),
    status: 'warning',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
];

const defaultBattleCry: BattleCry = {
  id: 'bc1',
  pactId: '1',
  triggeredAt: new Date().toISOString(),
  status: 'pending',
};

const defaultHistory: BattleCry[] = [
  {
    id: 'bc_old1',
    pactId: '1',
    triggeredAt: new Date(Date.now() - 86400000).toISOString(),
    respondedAt: new Date(Date.now() - 86400000 + 300000).toISOString(),
    myResponse: { text: "Let's go! 💪", photoUrl: undefined },
    partnerResponse: { text: 'Right behind you! 🔥', photoUrl: undefined },
    status: 'responded',
  },
  {
    id: 'bc_old2',
    pactId: '1',
    triggeredAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    respondedAt: new Date(Date.now() - 3 * 86400000 + 120000).toISOString(),
    myResponse: { text: 'Another day, another battle', photoUrl: undefined },
    partnerResponse: { text: 'Always.', photoUrl: undefined },
    status: 'responded',
  },
];

const defaultLeaderboard: LeaderboardEntry[] = [
  { rank: 1, pactId: 'lb1', partnerName: 'Ronin+Sarah', combinedStreak: 89, shieldLevel: 'gold' },
  { rank: 2, pactId: '1', partnerName: 'You+Sarah', combinedStreak: 12, shieldLevel: 'silver' },
  { rank: 3, pactId: 'lb3', partnerName: 'Kenji+Akira', combinedStreak: 34, shieldLevel: 'silver' },
  { rank: 4, pactId: 'lb4', partnerName: 'Shadow+Leo', combinedStreak: 28, shieldLevel: 'bronze' },
  { rank: 5, pactId: 'lb5', partnerName: 'Storm+Ray', combinedStreak: 21, shieldLevel: 'bronze' },
];

async function savePacts(pacts: WarriorPact[]): Promise<void> {
  await AsyncStorage.setItem(PACTS_KEY, JSON.stringify(pacts));
}

async function saveActiveBattleCry(cry: BattleCry | null): Promise<void> {
  if (cry) {
    await AsyncStorage.setItem(BATTLE_CRY_KEY, JSON.stringify(cry));
  } else {
    await AsyncStorage.removeItem(BATTLE_CRY_KEY);
  }
}

async function saveBattleCryHistory(history: BattleCry[]): Promise<void> {
  await AsyncStorage.setItem(CRY_HISTORY_KEY, JSON.stringify(history));
}

export const useWarriorPactStore = create<WarriorPactState>((set, get) => ({
  pacts: [],
  activeBattleCry: null,
  battleCryHistory: [],
  leaderboard: [],
  loading: true,

  loadPacts: async () => {
    try {
      const [pactsData, cryData, historyData] = await Promise.all([
        AsyncStorage.getItem(PACTS_KEY),
        AsyncStorage.getItem(BATTLE_CRY_KEY),
        AsyncStorage.getItem(CRY_HISTORY_KEY),
      ]);

      set({
        pacts: pactsData ? JSON.parse(pactsData) : defaultPacts,
        activeBattleCry: cryData ? JSON.parse(cryData) : defaultBattleCry,
        battleCryHistory: historyData ? JSON.parse(historyData) : defaultHistory,
        loading: false,
      });
    } catch {
      set({
        pacts: defaultPacts,
        activeBattleCry: defaultBattleCry,
        battleCryHistory: defaultHistory,
        loading: false,
      });
    }
  },

  addPact: (pact: WarriorPact) => {
    const pacts = [...get().pacts, pact];
    set({ pacts });
    savePacts(pacts);
  },

  removePact: (id: string) => {
    const pacts = get().pacts.filter((p) => p.id !== id);
    set({ pacts });
    savePacts(pacts);
  },

  updatePact: (id: string, updates: Partial<WarriorPact>) => {
    const pacts = get().pacts.map((p) =>
      p.id === id ? { ...p, ...updates } : p
    );
    set({ pacts });
    savePacts(pacts);
  },

  setActiveBattleCry: (cry: BattleCry | null) => {
    set({ activeBattleCry: cry });
    saveActiveBattleCry(cry);

    if (cry) {
      const history = get().battleCryHistory;
      const idx = history.findIndex((h) => h.id === cry.id);
      if (idx >= 0) {
        history[idx] = cry;
        set({ battleCryHistory: [...history] });
        saveBattleCryHistory(history);
      }
    }
  },

  respondToBattleCry: (cryId: string, response: { text: string; photoUrl?: string }) => {
    const active = get().activeBattleCry;
    if (active && active.id === cryId) {
      const updated: BattleCry = {
        ...active,
        myResponse: response,
        respondedAt: new Date().toISOString(),
        status: 'responded',
      };
      set({ activeBattleCry: updated });
      saveActiveBattleCry(updated);

      const history = [updated, ...get().battleCryHistory];
      set({ battleCryHistory: history });
      saveBattleCryHistory(history);
    } else {
      const history = get().battleCryHistory.map((h) =>
        h.id === cryId
          ? { ...h, myResponse: response, respondedAt: new Date().toISOString(), status: 'responded' as const }
          : h
      );
      set({ battleCryHistory: history });
      saveBattleCryHistory(history);
    }
  },

  loadLeaderboard: async () => {
    set({ leaderboard: defaultLeaderboard });
  },
}));
