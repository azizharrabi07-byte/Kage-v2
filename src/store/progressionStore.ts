import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  type PlayerProgression,
  type XPMap,
  type XPCategory,
  RANKS,
  RankTier,
} from '../components/progression/types';

export { RANKS };

const PROGRESSION_KEY = '@kage_progression';

const DEFAULT_PROGRESSION: PlayerProgression = {
  totalXP: 0,
  xpMap: { strength: 0, discipline: 0, endurance: 0, focus: 0, recovery: 0 },
  rank: RANKS[0].id,
  rankIndex: 0,
  level: 1,
  workoutsCompleted: 0,
  lockInSessions: 0,
  streak: 0,
};

export async function getProgression(): Promise<PlayerProgression> {
  const data = await AsyncStorage.getItem(PROGRESSION_KEY);
  return data ? JSON.parse(data) : DEFAULT_PROGRESSION;
}

export async function addXP(category: XPCategory, amount: number): Promise<{ progression: PlayerProgression; leveledUp: boolean }> {
  const prog = await getProgression();
  prog.xpMap[category] += amount;
  prog.totalXP += amount;

  let leveledUp = false;
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (prog.totalXP >= RANKS[i].xpRequired) {
      if (i > prog.rankIndex) {
        prog.rank = RANKS[i].id;
        prog.rankIndex = i;
        leveledUp = true;
      }
      break;
    }
  }

  prog.level = Math.floor(prog.totalXP / 500) + 1;
  await AsyncStorage.setItem(PROGRESSION_KEY, JSON.stringify(prog));
  return { progression: prog, leveledUp };
}

export async function incrementWorkouts(): Promise<PlayerProgression> {
  const prog = await getProgression();
  prog.workoutsCompleted += 1;

  const today = new Date().toDateString();
  const lastDate = prog.lastWorkoutDate ? new Date(prog.lastWorkoutDate).toDateString() : null;
  if (lastDate === today) {
  } else if (lastDate === new Date(Date.now() - 86400000).toDateString()) {
    prog.streak += 1;
  } else {
    prog.streak = 1;
  }
  prog.lastWorkoutDate = Date.now();

  await AsyncStorage.setItem(PROGRESSION_KEY, JSON.stringify(prog));
  return prog;
}

export async function incrementLockIn(): Promise<PlayerProgression> {
  const prog = await getProgression();
  prog.lockInSessions += 1;
  await AsyncStorage.setItem(PROGRESSION_KEY, JSON.stringify(prog));
  return prog;
}

export function getRankByIndex(index: number) {
  return RANKS[Math.min(index, RANKS.length - 1)];
}

export function getCurrentRank(totalXP: number) {
  let rankIndex = 0;
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (totalXP >= RANKS[i].xpRequired) {
      rankIndex = i;
      break;
    }
  }
  return RANKS[rankIndex];
}

export function getNextRank(totalXP: number): RankInfo {
  let nextRankIndex = 0;
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (totalXP >= RANKS[i].xpRequired) {
      nextRankIndex = Math.min(i + 1, RANKS.length - 1);
      break;
    }
  }
  return {
    current: RANKS[Math.max(0, nextRankIndex - 1)],
    next: RANKS[nextRankIndex],
    progress: nextRankIndex < RANKS.length
      ? (totalXP - RANKS[Math.max(0, nextRankIndex - 1)].xpRequired) /
        (RANKS[nextRankIndex].xpRequired - RANKS[Math.max(0, nextRankIndex - 1)].xpRequired)
      : 1,
  };
}

interface RankInfo {
  current: RankTier;
  next: RankTier;
  progress: number;
}