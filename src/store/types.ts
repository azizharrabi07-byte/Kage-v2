export interface Exercise {
  id: string;
  name: string;
  target: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
  kanji: string;
  category: 'push' | 'pull' | 'legs' | 'core' | 'cardio' | 'full';
}

export interface WorkoutSet {
  id: string;
  setNumber: number;
  reps: number;
  weight: number;
  completed: boolean;
  completedAt?: number;
}

export interface WorkoutExercise {
  exercise: Exercise;
  sets: WorkoutSet[];
  completed: boolean;
  startedAt?: number;
  completedAt?: number;
}

export interface WorkoutSession {
  id: string;
  name: string;
  kanji: string;
  startedAt: number;
  completedAt?: number;
  exercises: WorkoutExercise[];
  totalXP: number;
  xpBreakdown: {
    strength: number;
    discipline: number;
    endurance: number;
    focus: number;
  };
}

export interface WorkoutTemplate {
  id: string;
  name: string;
  kanji: string;
  description: string;
  exercises: Exercise[];
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'warrior';
  zeroEquipment?: boolean;
}

export type WorkoutPhase = 'idle' | 'active' | 'rest' | 'complete';