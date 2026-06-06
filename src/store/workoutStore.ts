import AsyncStorage from '@react-native-async-storage/async-storage';
import { WorkoutSession, WorkoutTemplate, WorkoutExercise, WorkoutSet } from './types';

const STORAGE_KEY = '@kage_workouts';
const TEMPLATE_KEY = '@kage_templates';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export async function saveWorkoutSession(session: WorkoutSession): Promise<void> {
  const existing = await getWorkoutHistory();
  existing.unshift(session);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 50)));
}

export async function getWorkoutHistory(): Promise<WorkoutSession[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function getLatestSession(): Promise<WorkoutSession | null> {
  const history = await getWorkoutHistory();
  return history[0] || null;
}

export function createWorkoutSession(template: WorkoutTemplate): WorkoutSession {
  const exercises: WorkoutExercise[] = template.exercises.map((ex) => ({
    exercise: ex,
    sets: Array.from({ length: ex.sets }, (_, i) => ({
      id: generateId(),
      setNumber: i + 1,
      reps: ex.reps,
      weight: ex.weight || 0,
      completed: false,
    })),
    completed: false,
  }));

  return {
    id: generateId(),
    name: template.name,
    kanji: template.kanji,
    startedAt: Date.now(),
    exercises,
    totalXP: 0,
    xpBreakdown: { strength: 0, discipline: 0, endurance: 0, focus: 0 },
  };
}

export function calculateWorkoutXP(session: WorkoutSession): number {
  const totalSets = session.exercises.reduce((a, e) => a + e.sets.length, 0);
  const completedSets = session.exercises.reduce(
    (a, e) => a + e.sets.filter((s) => s.completed).length,
    0
  );
  const ratio = completedSets / totalSets;
  return Math.round(ratio * 100 * 2.45);
}