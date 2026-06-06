export interface WorkoutDay {
  day: number;
  name: string;
  kanji: string;
  description: string;
  focus: string;
  exercises: ProgramExercise[];
  durationMin: number;
  intensity: 'low' | 'medium' | 'high';
}

export interface ProgramExercise {
  exerciseId: string;
  sets: number;
  reps: string;
  restSeconds: number;
  notes?: string;
}

export interface WeekProgram {
  week: number;
  name: string;
  theme: string;
  days: WorkoutDay[];
}

export interface MonthProgram {
  month: number;
  name: string;
  kanji: string;
  subtitle: string;
  theme: string;
  focus: string;
  goal: string;
  whatYouGain: string[];
  weeks: WeekProgram[];
}

export interface YearProgram {
  year: number;
  name: string;
  description: string;
  months: MonthProgram[];
}

const year: YearProgram = {
  year: 1,
  name: 'SHADOW RISING — Year One',
  description: 'A complete 12-month warrior transformation program. Each month builds upon the last, taking you from foundation to mastery.',
  months: [
    {
      month: 1, name: 'Foundation', kanji: '基礎', subtitle: 'Building the Base',
      theme: 'Establish fundamental movement patterns, build work capacity, and create the habit',
      focus: 'Full body compound movements, form mastery',
      goal: 'Complete 20 workouts with perfect form, establish morning training habit',
      whatYouGain: [
        'Solid squat, push-up, and row form',
        '20-workout streak discipline',
        'Understanding of progressive overload',
        'Morning routine habit established',
      ],
      weeks: [
        {
          week: 1, name: 'Awakening', theme: 'Learn the basic movements',
          days: [
            { day: 1, name: 'Full Body Foundation A', kanji: '基A', description: 'Core strength movements', focus: 'Squat + Push + Pull', durationMin: 35, intensity: 'low', exercises: [
              { exerciseId: 'goblet-squat', sets: 3, reps: '10-12', restSeconds: 60 },
              { exerciseId: 'push-up', sets: 3, reps: '8-12', restSeconds: 60 },
              { exerciseId: 'dumbbell-row', sets: 3, reps: '10-12', restSeconds: 60 },
              { exerciseId: 'plank', sets: 3, reps: '20-30 sec', restSeconds: 30 },
              { exerciseId: 'jumping-jacks', sets: 2, reps: '30', restSeconds: 30 },
            ]},
            { day: 2, name: 'Rest & Recovery', kanji: '休', description: 'Active recovery', focus: 'Mobility', durationMin: 15, intensity: 'low', exercises: [
              { exerciseId: 'cat-cow', sets: 2, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 2, reps: '30 sec', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '60 sec', restSeconds: 0 },
            ]},
            { day: 3, name: 'Full Body Foundation B', kanji: '基B', description: 'Strength and stability', focus: 'Hinge + Press + Core', durationMin: 35, intensity: 'low', exercises: [
              { exerciseId: 'romanian-deadlift', sets: 3, reps: '10-12', restSeconds: 60 },
              { exerciseId: 'dumbbell-curl', sets: 3, reps: '10-12', restSeconds: 45 },
              { exerciseId: 'lateral-raise', sets: 3, reps: '10-12', restSeconds: 45 },
              { exerciseId: 'dead-bug', sets: 3, reps: '8-10 per side', restSeconds: 30 },
              { exerciseId: 'high-knees', sets: 2, reps: '20 sec', restSeconds: 30 },
            ]},
            { day: 4, name: 'Rest & Mobility', kanji: '休', description: 'Active recovery', focus: 'Flexibility', durationMin: 15, intensity: 'low', exercises: [
              { exerciseId: 'hip-opener', sets: 2, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 2, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 2, reps: '30 sec', restSeconds: 0 },
            ]},
            { day: 5, name: 'Full Body Foundation C', kanji: '基C', description: 'Cardio and conditioning', focus: 'Endurance + Full Body', durationMin: 30, intensity: 'medium', exercises: [
              { exerciseId: 'burpee', sets: 3, reps: '8-10', restSeconds: 60 },
              { exerciseId: 'mountain-climber', sets: 3, reps: '20 sec', restSeconds: 30 },
              { exerciseId: 'kettlebell-swing', sets: 3, reps: '12-15', restSeconds: 45 },
              { exerciseId: 'farmer-walk', sets: 3, reps: '30 sec', restSeconds: 45 },
            ]},
            { day: 6, name: 'Weekend Challenge', kanji: '挑', description: 'Optional bonus workout', focus: 'Fun movement', durationMin: 20, intensity: 'medium', exercises: [
              { exerciseId: 'box-jump', sets: 3, reps: '8-10', restSeconds: 45 },
              { exerciseId: 'diamond-pushup', sets: 3, reps: '8-10', restSeconds: 45 },
              { exerciseId: 'plank', sets: 3, reps: '30 sec', restSeconds: 20 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest and recovery', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 2, name: 'Expansion', theme: 'Increase volume gradually',
          days: [
            { day: 1, name: 'Full Body A2', kanji: '基A2', description: 'Core strength progression', focus: 'Squat + Push + Pull', durationMin: 40, intensity: 'medium', exercises: [
              { exerciseId: 'goblet-squat', sets: 3, reps: '12-15', restSeconds: 45 },
              { exerciseId: 'push-up', sets: 3, reps: '10-15', restSeconds: 45 },
              { exerciseId: 'dumbbell-row', sets: 3, reps: '12-15', restSeconds: 45 },
              { exerciseId: 'plank', sets: 3, reps: '30-45 sec', restSeconds: 30 },
              { exerciseId: 'jumping-jacks', sets: 2, reps: '40', restSeconds: 20 },
            ]},
            { day: 2, name: 'Mobility Day', kanji: '動', description: 'Flexibility focus', focus: 'Hip + Spine mobility', durationMin: 20, intensity: 'low', exercises: [
              { exerciseId: 'cat-cow', sets: 3, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 2, reps: '30 sec', restSeconds: 0 },
              { exerciseId: 'hip-opener', sets: 2, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '60 sec', restSeconds: 0 },
            ]},
            { day: 3, name: 'Full Body B2', kanji: '基B2', description: 'Strength progression', focus: 'Hinge + Pull + Core', durationMin: 40, intensity: 'medium', exercises: [
              { exerciseId: 'romanian-deadlift', sets: 3, reps: '12-15', restSeconds: 45 },
              { exerciseId: 'hammer-curl', sets: 3, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'lateral-raise', sets: 3, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'dead-bug', sets: 3, reps: '10-12 per side', restSeconds: 30 },
              { exerciseId: 'mountain-climber', sets: 2, reps: '25 sec', restSeconds: 20 },
            ]},
            { day: 4, name: 'Active Recovery', kanji: '動休', description: 'Light movement', focus: 'Blood flow', durationMin: 15, intensity: 'low', exercises: [
              { exerciseId: 'stair-climb', sets: 1, reps: '15 min', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 2, reps: '30 sec per side', restSeconds: 0 },
            ]},
            { day: 5, name: 'Full Body C2', kanji: '基C2', description: 'Conditioning', focus: 'Endurance', durationMin: 35, intensity: 'medium', exercises: [
              { exerciseId: 'burpee', sets: 3, reps: '10-12', restSeconds: 45 },
              { exerciseId: 'kettlebell-swing', sets: 3, reps: '15-20', restSeconds: 30 },
              { exerciseId: 'farmer-walk', sets: 3, reps: '45 sec', restSeconds: 30 },
              { exerciseId: 'jump-rope', sets: 3, reps: '30 sec', restSeconds: 30 },
            ]},
            { day: 6, name: 'Weekend Warrior', kanji: '戦', description: 'Optional challenge', focus: 'Strength', durationMin: 25, intensity: 'medium', exercises: [
              { exerciseId: 'box-jump', sets: 3, reps: '10-12', restSeconds: 30 },
              { exerciseId: 'diamond-pushup', sets: 3, reps: '10-12', restSeconds: 30 },
              { exerciseId: 'crunches', sets: 3, reps: '15-20', restSeconds: 20 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 3, name: 'Intensification', theme: 'Increase intensity',
          days: [
            { day: 1, name: 'Foundation Push', kanji: '基推', description: 'Push emphasis', focus: 'Chest + Shoulders + Triceps', durationMin: 40, intensity: 'medium', exercises: [
              { exerciseId: 'push-up', sets: 4, reps: '10-15', restSeconds: 45 },
              { exerciseId: 'dumbbell-fly', sets: 3, reps: '10-12', restSeconds: 45 },
              { exerciseId: 'overhead-press', sets: 3, reps: '8-10', restSeconds: 60 },
              { exerciseId: 'tricep-pushdown', sets: 3, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'lateral-raise', sets: 3, reps: '12-15', restSeconds: 30 },
            ]},
            { day: 2, name: 'Foundation Pull', kanji: '基拉', description: 'Pull emphasis', focus: 'Back + Biceps', durationMin: 40, intensity: 'medium', exercises: [
              { exerciseId: 'lat-pulldown', sets: 4, reps: '10-12', restSeconds: 45 },
              { exerciseId: 'seated-row', sets: 3, reps: '10-12', restSeconds: 45 },
              { exerciseId: 'dumbbell-curl', sets: 3, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'face-pull', sets: 3, reps: '15-20', restSeconds: 30 },
              { exerciseId: 'hammer-curl', sets: 3, reps: '10-12', restSeconds: 30 },
            ]},
            { day: 3, name: 'Rest', kanji: '休', description: 'Rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 4, name: 'Foundation Legs', kanji: '基脚', description: 'Leg emphasis', focus: 'Quads + Glutes + Hamstrings', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'goblet-squat', sets: 4, reps: '12-15', restSeconds: 45 },
              { exerciseId: 'lunges', sets: 3, reps: '10-12 per leg', restSeconds: 45 },
              { exerciseId: 'romanian-deadlift', sets: 3, reps: '12-15', restSeconds: 45 },
              { exerciseId: 'calf-raise', sets: 3, reps: '15-20', restSeconds: 30 },
              { exerciseId: 'hip-thrust', sets: 3, reps: '12-15', restSeconds: 45 },
            ]},
            { day: 5, name: 'Foundation Core', kanji: '基腹', description: 'Core emphasis', focus: 'Abs + Obliques', durationMin: 25, intensity: 'medium', exercises: [
              { exerciseId: 'cable-crunch', sets: 3, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'russian-twist', sets: 3, reps: '12-15 per side', restSeconds: 30 },
              { exerciseId: 'plank', sets: 3, reps: '45 sec', restSeconds: 20 },
              { exerciseId: 'pallof-press', sets: 3, reps: '10-12 per side', restSeconds: 30 },
            ]},
            { day: 6, name: 'Conditioning', kanji: '調', description: 'Cardio finisher', focus: 'Endurance', durationMin: 20, intensity: 'high', exercises: [
              { exerciseId: 'burpee', sets: 4, reps: '10-12', restSeconds: 30 },
              { exerciseId: 'jump-rope', sets: 4, reps: '30 sec', restSeconds: 20 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 4, name: 'Consolidation', theme: 'Solidify gains and assess',
          days: [
            { day: 1, name: 'Strength Test A', kanji: '力A', description: 'Max effort day', focus: 'Strength assessment', durationMin: 35, intensity: 'high', exercises: [
              { exerciseId: 'goblet-squat', sets: 3, reps: '8-10 heavy', restSeconds: 90 },
              { exerciseId: 'push-up', sets: 3, reps: 'max', restSeconds: 60 },
              { exerciseId: 'dumbbell-row', sets: 3, reps: '8-10 heavy', restSeconds: 60 },
              { exerciseId: 'plank', sets: 3, reps: 'max sec', restSeconds: 30 },
            ]},
            { day: 2, name: 'Recovery', kanji: '恢', description: 'Light mobility', focus: 'Active recovery', durationMin: 20, intensity: 'low', exercises: [
              { exerciseId: 'cat-cow', sets: 3, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 3, reps: '30 sec', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '60 sec', restSeconds: 0 },
              { exerciseId: 'hip-opener', sets: 2, reps: '30 sec per side', restSeconds: 0 },
            ]},
            { day: 3, name: 'Strength Test B', kanji: '力B', description: 'Max effort day', focus: 'Strength assessment', durationMin: 35, intensity: 'high', exercises: [
              { exerciseId: 'romanian-deadlift', sets: 3, reps: '8-10 heavy', restSeconds: 90 },
              { exerciseId: 'overhead-press', sets: 3, reps: '8-10 heavy', restSeconds: 60 },
              { exerciseId: 'dumbbell-curl', sets: 3, reps: '10-12 heavy', restSeconds: 45 },
              { exerciseId: 'dead-bug', sets: 3, reps: '10-12 per side', restSeconds: 30 },
            ]},
            { day: 4, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 5, name: 'Work Capacity Test', kanji: '力C', description: 'Conditioning challenge', focus: 'Endurance', durationMin: 20, intensity: 'high', exercises: [
              { exerciseId: 'burpee', sets: 3, reps: '10-12', restSeconds: 30 },
              { exerciseId: 'kettlebell-swing', sets: 3, reps: '15-20', restSeconds: 30 },
              { exerciseId: 'mountain-climber', sets: 3, reps: '30 sec', restSeconds: 20 },
            ]},
            { day: 6, name: 'Month Reflections', kanji: '省', description: 'Review progress', focus: 'Assessment', durationMin: 15, intensity: 'low', exercises: [
              { exerciseId: 'cat-cow', sets: 2, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '60 sec', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 2, reps: '30 sec per side', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
      ],
    },
    {
      month: 2, name: 'Strength', kanji: '力', subtitle: 'Building Raw Power',
      theme: 'Introduce barbell compounds, progress to heavier weights',
      focus: 'Barbell fundamentals, 5x5 strength protocol',
      goal: 'Master squat, bench press, and deadlift form with barbell',
      whatYouGain: [
        'Barbell squat, bench press, and deadlift competency',
        'Understanding of 5x5 strength programming',
        'Neural adaptation for heavier loads',
        'Confidence under the bar',
      ],
      weeks: [
        {
          week: 1, name: 'Barbell Introduction', theme: 'Learn barbell movements',
          days: [
            { day: 1, name: 'Strength A', kanji: '力A', description: 'Barbell compounds', focus: 'Squat + Bench', durationMin: 45, intensity: 'medium', exercises: [
              { exerciseId: 'squat', sets: 3, reps: '8-10', restSeconds: 90 },
              { exerciseId: 'bench-press', sets: 3, reps: '8-10', restSeconds: 90 },
              { exerciseId: 'bent-over-row', sets: 3, reps: '8-10', restSeconds: 60 },
              { exerciseId: 'plank', sets: 3, reps: '30-45 sec', restSeconds: 30 },
            ]},
            { day: 2, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 3, name: 'Strength B', kanji: '力B', description: 'Barbell compounds', focus: 'Deadlift + OHP', durationMin: 45, intensity: 'medium', exercises: [
              { exerciseId: 'deadlift', sets: 3, reps: '5-8', restSeconds: 120 },
              { exerciseId: 'overhead-press', sets: 3, reps: '8-10', restSeconds: 90 },
              { exerciseId: 'chin-up', sets: 3, reps: '5-8', restSeconds: 60 },
              { exerciseId: 'face-pull', sets: 3, reps: '15-20', restSeconds: 30 },
            ]},
            { day: 4, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 5, name: 'Strength C', kanji: '力C', description: 'Full body', focus: 'Strength + Accessories', durationMin: 40, intensity: 'medium', exercises: [
              { exerciseId: 'squat', sets: 3, reps: '8-10', restSeconds: 90 },
              { exerciseId: 'incline-bench', sets: 3, reps: '8-10', restSeconds: 90 },
              { exerciseId: 'dumbbell-row', sets: 3, reps: '8-10', restSeconds: 60 },
              { exerciseId: 'crunches', sets: 3, reps: '15-20', restSeconds: 20 },
            ]},
            { day: 6, name: 'Conditioning', kanji: '調', description: 'Cardio finisher', focus: 'Work capacity', durationMin: 20, intensity: 'medium', exercises: [
              { exerciseId: 'kettlebell-swing', sets: 4, reps: '15-20', restSeconds: 30 },
              { exerciseId: 'farmer-walk', sets: 3, reps: '45 sec', restSeconds: 30 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 2, name: 'Volume Accumulation', theme: 'Increase volume on compounds',
          days: [
            { day: 1, name: 'Strength A2', kanji: '力A2', description: 'Volume squat + bench', focus: 'Hypertrophy', durationMin: 50, intensity: 'high', exercises: [
              { exerciseId: 'squat', sets: 4, reps: '8-10', restSeconds: 90 },
              { exerciseId: 'bench-press', sets: 4, reps: '8-10', restSeconds: 90 },
              { exerciseId: 'bent-over-row', sets: 4, reps: '8-10', restSeconds: 60 },
              { exerciseId: 'dumbbell-fly', sets: 3, reps: '12-15', restSeconds: 45 },
              { exerciseId: 'plank', sets: 3, reps: '45 sec', restSeconds: 20 },
            ]},
            { day: 2, name: 'Recovery', kanji: '恢', description: 'Light mobility', focus: 'Active recovery', durationMin: 20, intensity: 'low', exercises: [
              { exerciseId: 'cat-cow', sets: 2, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'hip-opener', sets: 2, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 2, reps: '30 sec per side', restSeconds: 0 },
            ]},
            { day: 3, name: 'Strength B2', kanji: '力B2', description: 'Volume deadlift + press', focus: 'Strength endurance', durationMin: 50, intensity: 'high', exercises: [
              { exerciseId: 'deadlift', sets: 4, reps: '5-8', restSeconds: 120 },
              { exerciseId: 'overhead-press', sets: 4, reps: '8-10', restSeconds: 90 },
              { exerciseId: 'pull-up', sets: 3, reps: '5-8', restSeconds: 60 },
              { exerciseId: 'lateral-raise', sets: 3, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'face-pull', sets: 3, reps: '15-20', restSeconds: 30 },
            ]},
            { day: 4, name: 'Active Recovery', kanji: '動休', description: 'Light work', focus: 'Blood flow', durationMin: 20, intensity: 'low', exercises: [
              { exerciseId: 'stair-climb', sets: 1, reps: '20 min', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 2, reps: '30 sec', restSeconds: 0 },
            ]},
            { day: 5, name: 'Strength C2', kanji: '力C2', description: 'Full body volume', focus: 'Hypertrophy', durationMin: 50, intensity: 'high', exercises: [
              { exerciseId: 'squat', sets: 3, reps: '10-12', restSeconds: 60 },
              { exerciseId: 'incline-bench', sets: 4, reps: '10-12', restSeconds: 60 },
              { exerciseId: 'dumbbell-row', sets: 4, reps: '10-12', restSeconds: 60 },
              { exerciseId: 'barbell-curl', sets: 3, reps: '10-12', restSeconds: 30 },
              { exerciseId: 'tricep-pushdown', sets: 3, reps: '12-15', restSeconds: 30 },
            ]},
            { day: 6, name: 'Conditioning', kanji: '調', description: 'Cardio', focus: 'Work capacity', durationMin: 20, intensity: 'high', exercises: [
              { exerciseId: 'burpee', sets: 4, reps: '10-12', restSeconds: 30 },
              { exerciseId: 'jump-rope', sets: 4, reps: '30 sec', restSeconds: 20 },
              { exerciseId: 'mountain-climber', sets: 3, reps: '30 sec', restSeconds: 20 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 3, name: 'Heavy Loading', theme: 'Increase intensity on main lifts',
          days: [
            { day: 1, name: 'Heavy A', kanji: '重A', description: 'Heavy squat + bench', focus: 'Max strength', durationMin: 45, intensity: 'high', exercises: [
              { exerciseId: 'squat', sets: 5, reps: '5-6', restSeconds: 120 },
              { exerciseId: 'bench-press', sets: 5, reps: '5-6', restSeconds: 120 },
              { exerciseId: 'bent-over-row', sets: 4, reps: '6-8', restSeconds: 90 },
              { exerciseId: 'dumbbell-fly', sets: 3, reps: '10-12', restSeconds: 45 },
            ]},
            { day: 2, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 3, name: 'Heavy B', kanji: '重B', description: 'Heavy deadlift + press', focus: 'Max strength', durationMin: 45, intensity: 'high', exercises: [
              { exerciseId: 'deadlift', sets: 4, reps: '3-5', restSeconds: 150 },
              { exerciseId: 'overhead-press', sets: 5, reps: '5-6', restSeconds: 90 },
              { exerciseId: 'pull-up', sets: 4, reps: '5-6', restSeconds: 60 },
              { exerciseId: 'face-pull', sets: 3, reps: '15-20', restSeconds: 30 },
            ]},
            { day: 4, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 5, name: 'Heavy C', kanji: '重C', description: 'Heavy accessories', focus: 'Auxiliary strength', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'squat', sets: 4, reps: '5-6', restSeconds: 120 },
              { exerciseId: 'incline-bench', sets: 4, reps: '6-8', restSeconds: 90 },
              { exerciseId: 'dumbbell-row', sets: 4, reps: '6-8', restSeconds: 90 },
              { exerciseId: 'shrug', sets: 3, reps: '10-12', restSeconds: 45 },
            ]},
            { day: 6, name: 'Conditioning', kanji: '調', description: 'Light cardio', focus: 'Active recovery', durationMin: 15, intensity: 'low', exercises: [
              { exerciseId: 'row-machine', sets: 1, reps: '1000m', restSeconds: 0 },
              { exerciseId: 'stretching', sets: 1, reps: '5 min', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 4, name: 'Deload & Test', theme: 'Reduce volume, test 1RM',
          days: [
            { day: 1, name: 'Deload A', kanji: '軽A', description: 'Light squat + bench', focus: 'Technique', durationMin: 30, intensity: 'low', exercises: [
              { exerciseId: 'squat', sets: 3, reps: '5-8 (light)', restSeconds: 60 },
              { exerciseId: 'bench-press', sets: 3, reps: '5-8 (light)', restSeconds: 60 },
              { exerciseId: 'dumbbell-row', sets: 3, reps: '8-10 (light)', restSeconds: 45 },
            ]},
            { day: 2, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 3, name: '1RM Test', kanji: '最重', description: 'Test your maxes', focus: 'Max effort', durationMin: 45, intensity: 'high', exercises: [
              { exerciseId: 'squat', sets: 5, reps: '3-1 (build to max)', restSeconds: 120 },
              { exerciseId: 'bench-press', sets: 5, reps: '3-1 (build to max)', restSeconds: 120 },
              { exerciseId: 'deadlift', sets: 5, reps: '3-1 (build to max)', restSeconds: 150 },
            ]},
            { day: 4, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 5, name: 'Accessory Work', kanji: '補', description: 'Light accessories', focus: 'Pump', durationMin: 25, intensity: 'low', exercises: [
              { exerciseId: 'lateral-raise', sets: 3, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'hammer-curl', sets: 3, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'tricep-pushdown', sets: 3, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'crunches', sets: 3, reps: '15-20', restSeconds: 20 },
            ]},
            { day: 6, name: 'Mobility', kanji: '動', description: 'Full body stretch', focus: 'Flexibility', durationMin: 20, intensity: 'low', exercises: [
              { exerciseId: 'cat-cow', sets: 3, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 3, reps: '30 sec', restSeconds: 0 },
              { exerciseId: 'hip-opener', sets: 2, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 2, reps: '30 sec per side', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
      ],
    },
    {
      month: 3, name: 'Hypertrophy', kanji: '増大', subtitle: 'Muscle Mass Builder',
      theme: 'Moderate weight, higher volume, shorter rest for maximum muscle growth',
      focus: '8-12 rep range, 60-90 sec rest, pump-focused training',
      goal: 'Add 2-3kg lean mass, improve muscle definition',
      whatYouGain: [
        'Visible muscle growth and definition',
        'Improved mind-muscle connection',
        'Higher training volume tolerance',
        'Better muscle shape and symmetry',
      ],
      weeks: [
        {
          week: 1, name: 'Pump Phase 1', theme: 'High volume, moderate weight',
          days: [
            { day: 1, name: 'Chest & Triceps', kanji: '胸三', description: 'Push hypertrophy', focus: 'Chest mass + tricep detail', durationMin: 45, intensity: 'high', exercises: [
              { exerciseId: 'bench-press', sets: 4, reps: '10-12', restSeconds: 60 },
              { exerciseId: 'dumbbell-fly', sets: 3, reps: '12-15', restSeconds: 45 },
              { exerciseId: 'incline-bench', sets: 4, reps: '10-12', restSeconds: 60 },
              { exerciseId: 'tricep-pushdown', sets: 3, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'close-grip-press', sets: 3, reps: '10-12', restSeconds: 60 },
            ]},
            { day: 2, name: 'Back & Biceps', kanji: '背二', description: 'Pull hypertrophy', focus: 'Back width + bicep peak', durationMin: 45, intensity: 'high', exercises: [
              { exerciseId: 'lat-pulldown', sets: 4, reps: '10-12', restSeconds: 60 },
              { exerciseId: 'seated-row', sets: 4, reps: '10-12', restSeconds: 60 },
              { exerciseId: 'dumbbell-curl', sets: 4, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'hammer-curl', sets: 3, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'face-pull', sets: 3, reps: '15-20', restSeconds: 30 },
            ]},
            { day: 3, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 4, name: 'Shoulders & Abs', kanji: '肩腹', description: 'Delts + core', focus: 'Shoulder width + core definition', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'overhead-press', sets: 4, reps: '10-12', restSeconds: 60 },
              { exerciseId: 'lateral-raise', sets: 4, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'front-raise', sets: 3, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'rear-delt-fly', sets: 3, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'cable-crunch', sets: 4, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'russian-twist', sets: 3, reps: '12-15 per side', restSeconds: 30 },
            ]},
            { day: 5, name: 'Legs', kanji: '脚', description: 'Leg hypertrophy', focus: 'Quad + hamstring mass', durationMin: 50, intensity: 'high', exercises: [
              { exerciseId: 'squat', sets: 4, reps: '10-12', restSeconds: 90 },
              { exerciseId: 'leg-press', sets: 4, reps: '12-15', restSeconds: 60 },
              { exerciseId: 'romanian-deadlift', sets: 4, reps: '10-12', restSeconds: 60 },
              { exerciseId: 'leg-curl', sets: 3, reps: '12-15', restSeconds: 45 },
              { exerciseId: 'calf-raise', sets: 4, reps: '15-20', restSeconds: 30 },
            ]},
            { day: 6, name: 'Full Body Pump', kanji: '全増', description: 'Metabolic finisher', focus: 'Total body conditioning', durationMin: 25, intensity: 'high', exercises: [
              { exerciseId: 'kettlebell-swing', sets: 4, reps: '15-20', restSeconds: 30 },
              { exerciseId: 'push-up', sets: 3, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'dumbbell-row', sets: 3, reps: '12-15', restSeconds: 30 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 2, name: 'Pump Phase 2', theme: 'Increase volume further',
          days: [
            { day: 1, name: 'Chest & Triceps 2', kanji: '胸三2', description: 'Push volume', focus: 'Chest pump', durationMin: 50, intensity: 'high', exercises: [
              { exerciseId: 'bench-press', sets: 4, reps: '12-15', restSeconds: 45 },
              { exerciseId: 'dumbbell-fly', sets: 4, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'incline-bench', sets: 4, reps: '12-15', restSeconds: 45 },
              { exerciseId: 'push-up', sets: 3, reps: '15-20', restSeconds: 30 },
              { exerciseId: 'tricep-pushdown', sets: 4, reps: '12-15', restSeconds: 20 },
              { exerciseId: 'skull-crusher', sets: 3, reps: '10-12', restSeconds: 45 },
            ]},
            { day: 2, name: 'Back & Biceps 2', kanji: '背二2', description: 'Pull volume', focus: 'Back pump', durationMin: 50, intensity: 'high', exercises: [
              { exerciseId: 'lat-pulldown', sets: 4, reps: '12-15', restSeconds: 45 },
              { exerciseId: 'seated-row', sets: 4, reps: '12-15', restSeconds: 45 },
              { exerciseId: 'bent-over-row', sets: 4, reps: '12-15', restSeconds: 45 },
              { exerciseId: 'barbell-curl', sets: 4, reps: '12-15', restSeconds: 20 },
              { exerciseId: 'preacher-curl', sets: 3, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'concentration-curl', sets: 3, reps: '12-15', restSeconds: 20 },
            ]},
            { day: 3, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 4, name: 'Shoulders & Abs 2', kanji: '肩腹2', description: 'Delt volume', focus: 'Shoulder pump', durationMin: 45, intensity: 'high', exercises: [
              { exerciseId: 'arnold-press', sets: 4, reps: '10-12', restSeconds: 45 },
              { exerciseId: 'lateral-raise', sets: 5, reps: '15-20', restSeconds: 20 },
              { exerciseId: 'front-raise', sets: 4, reps: '12-15', restSeconds: 20 },
              { exerciseId: 'rear-delt-fly', sets: 4, reps: '12-15', restSeconds: 20 },
              { exerciseId: 'shrug', sets: 4, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'hanging-leg-raise', sets: 3, reps: '10-12', restSeconds: 30 },
            ]},
            { day: 5, name: 'Legs 2', kanji: '脚2', description: 'Leg volume', focus: 'Leg pump', durationMin: 55, intensity: 'high', exercises: [
              { exerciseId: 'leg-press', sets: 5, reps: '15-20', restSeconds: 45 },
              { exerciseId: 'lunges', sets: 4, reps: '12-15 per leg', restSeconds: 30 },
              { exerciseId: 'leg-extension', sets: 4, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'romanian-deadlift', sets: 4, reps: '12-15', restSeconds: 45 },
              { exerciseId: 'hip-thrust', sets: 4, reps: '12-15', restSeconds: 45 },
              { exerciseId: 'calf-raise', sets: 5, reps: '15-20', restSeconds: 20 },
            ]},
            { day: 6, name: 'Metabolic', kanji: '代', description: 'Full body finisher', focus: 'Fat burn', durationMin: 20, intensity: 'high', exercises: [
              { exerciseId: 'battle-ropes', sets: 5, reps: '30 sec', restSeconds: 20 },
              { exerciseId: 'box-jump', sets: 3, reps: '10-12', restSeconds: 30 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 3, name: 'Intensity Pump', theme: 'Supersets and dropsets',
          days: [
            { day: 1, name: 'Chest Superset', kanji: '胸超', description: 'Supersets for max pump', focus: 'Chest annihilation', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'bench-press', sets: 4, reps: '10-12', restSeconds: 45 },
              { exerciseId: 'dumbbell-fly', sets: 4, reps: '12-15', restSeconds: 0, notes: 'Superset with bench' },
              { exerciseId: 'push-up', sets: 3, reps: 'to failure', restSeconds: 30 },
              { exerciseId: 'dumbbell-pullover', sets: 3, reps: '10-12', restSeconds: 45 },
              { exerciseId: 'close-grip-press', sets: 3, reps: '10-12', restSeconds: 45 },
            ]},
            { day: 2, name: 'Back Superset', kanji: '背超', description: 'Back supersets', focus: 'Back annihilation', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'pull-up', sets: 4, reps: '8-12', restSeconds: 45 },
              { exerciseId: 'bent-over-row', sets: 4, reps: '10-12', restSeconds: 0, notes: 'Superset with pull-ups' },
              { exerciseId: 'seated-row', sets: 4, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'face-pull', sets: 4, reps: '15-20', restSeconds: 30 },
            ]},
            { day: 3, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 4, name: 'Arms Superset', kanji: '腕超', description: 'Arms direct work', focus: 'Arm pump', durationMin: 35, intensity: 'high', exercises: [
              { exerciseId: 'barbell-curl', sets: 4, reps: '10-12', restSeconds: 0, notes: 'Superset with skull crusher' },
              { exerciseId: 'skull-crusher', sets: 4, reps: '10-12', restSeconds: 30 },
              { exerciseId: 'hammer-curl', sets: 4, reps: '12-15', restSeconds: 0, notes: 'Superset with tricep pushdown' },
              { exerciseId: 'tricep-pushdown', sets: 4, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'concentration-curl', sets: 3, reps: '12-15', restSeconds: 20 },
            ]},
            { day: 5, name: 'Legs Superset', kanji: '脚超', description: 'Leg supersets', focus: 'Leg annihilation', durationMin: 45, intensity: 'high', exercises: [
              { exerciseId: 'leg-press', sets: 5, reps: '15-20', restSeconds: 0, notes: 'Superset with leg extension' },
              { exerciseId: 'leg-extension', sets: 5, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'romanian-deadlift', sets: 4, reps: '10-12', restSeconds: 0, notes: 'Superset with leg curl' },
              { exerciseId: 'leg-curl', sets: 4, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'calf-raise', sets: 5, reps: '15-20', restSeconds: 20 },
            ]},
            { day: 6, name: 'Core Finisher', kanji: '腹完', description: 'Ab circuit', focus: 'Core burn', durationMin: 15, intensity: 'medium', exercises: [
              { exerciseId: 'plank', sets: 3, reps: '45 sec', restSeconds: 15 },
              { exerciseId: 'russian-twist', sets: 3, reps: '15-20 per side', restSeconds: 15 },
              { exerciseId: 'hanging-leg-raise', sets: 3, reps: '10-12', restSeconds: 15 },
              { exerciseId: 'pallof-press', sets: 3, reps: '12-15 per side', restSeconds: 15 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 4, name: 'Peak Week', theme: 'Maximum pump, minimum rest',
          days: [
            { day: 1, name: 'Push Day', kanji: '推日', description: 'Chest + shoulders + triceps peak', focus: 'Upper body pump', durationMin: 45, intensity: 'high', exercises: [
              { exerciseId: 'incline-bench', sets: 4, reps: '10-12', restSeconds: 45 },
              { exerciseId: 'lateral-raise', sets: 5, reps: '15-20', restSeconds: 20 },
              { exerciseId: 'cable-crossover', sets: 4, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'tricep-pushdown', sets: 5, reps: '12-15', restSeconds: 20 },
              { exerciseId: 'dumbbell-fly', sets: 4, reps: '12-15', restSeconds: 30 },
            ]},
            { day: 2, name: 'Pull Day', kanji: '拉日', description: 'Back + biceps peak', focus: 'Back and biceps pump', durationMin: 45, intensity: 'high', exercises: [
              { exerciseId: 'lat-pulldown', sets: 5, reps: '10-12', restSeconds: 45 },
              { exerciseId: 'seated-row', sets: 4, reps: '12-15', restSeconds: 45 },
              { exerciseId: 'dumbbell-curl', sets: 5, reps: '12-15', restSeconds: 20 },
              { exerciseId: 'face-pull', sets: 4, reps: '15-20', restSeconds: 20 },
              { exerciseId: 'hammer-curl', sets: 4, reps: '12-15', restSeconds: 20 },
            ]},
            { day: 3, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 4, name: 'Leg Day Peak', kanji: '脚日', description: 'Legs peak', focus: 'Leg pump', durationMin: 45, intensity: 'high', exercises: [
              { exerciseId: 'squat', sets: 4, reps: '10-12', restSeconds: 45 },
              { exerciseId: 'lunges', sets: 4, reps: '12-15 per leg', restSeconds: 30 },
              { exerciseId: 'leg-extension', sets: 5, reps: '12-15', restSeconds: 20 },
              { exerciseId: 'leg-curl', sets: 5, reps: '12-15', restSeconds: 20 },
              { exerciseId: 'calf-raise', sets: 5, reps: '15-20', restSeconds: 20 },
            ]},
            { day: 5, name: 'Full Body Finisher', kanji: '全完', description: 'Metabolic circuit', focus: 'Fat burning', durationMin: 25, intensity: 'high', exercises: [
              { exerciseId: 'kettlebell-swing', sets: 5, reps: '15-20', restSeconds: 20 },
              { exerciseId: 'burpee', sets: 4, reps: '10-12', restSeconds: 20 },
              { exerciseId: 'mountain-climber', sets: 4, reps: '30 sec', restSeconds: 15 },
              { exerciseId: 'plank', sets: 3, reps: '45 sec', restSeconds: 15 },
            ]},
            { day: 6, name: 'Stretch & Reflect', kanji: '伸省', description: 'Full body mobility', focus: 'Recovery', durationMin: 20, intensity: 'low', exercises: [
              { exerciseId: 'cat-cow', sets: 3, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 3, reps: '30 sec', restSeconds: 0 },
              { exerciseId: 'hip-opener', sets: 3, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 3, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '90 sec', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
      ],
    },
    {
      month: 4, name: 'Power', kanji: '爆発', subtitle: 'Explosive Development',
      theme: 'Olympic lifts, plyometrics, speed work',
      focus: 'Explosive power, rate of force development',
      goal: 'Improve vertical jump, sprint speed, and explosive output',
      whatYouGain: [
        'Explosive power in all movements',
        'Faster sprint and jump ability',
        'Olympic lifting foundation',
        'Athletic performance boost',
      ],
      weeks: [
        {
          week: 1, name: 'Explosive Foundation', theme: 'Learn explosive movements safely',
          days: [
            { day: 1, name: 'Power A', kanji: '爆A', description: 'Explosive compounds', focus: 'Clean + jumps', durationMin: 45, intensity: 'high', exercises: [
              { exerciseId: 'clean-and-press', sets: 5, reps: '3-5', restSeconds: 90 },
              { exerciseId: 'box-jump', sets: 4, reps: '6-8', restSeconds: 60 },
              { exerciseId: 'squat', sets: 4, reps: '5-8', restSeconds: 90 },
              { exerciseId: 'push-up', sets: 3, reps: '15-20', restSeconds: 30, notes: 'Explosive push-up (clap)' },
            ]},
            { day: 2, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 3, name: 'Power B', kanji: '爆B', description: 'Explosive pulling', focus: 'Snatch + sprint', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'kettlebell-swing', sets: 5, reps: '15-20', restSeconds: 45 },
              { exerciseId: 'sprint', sets: 6, reps: '50m', restSeconds: 90 },
              { exerciseId: 'deadlift', sets: 4, reps: '5-8', restSeconds: 120 },
              { exerciseId: 'box-jump', sets: 4, reps: '6-8', restSeconds: 60 },
            ]},
            { day: 4, name: 'Active Recovery', kanji: '動休', description: 'Light mobility', focus: 'CNS recovery', durationMin: 20, intensity: 'low', exercises: [
              { exerciseId: 'row-machine', sets: 1, reps: '1000m', restSeconds: 0 },
              { exerciseId: 'cat-cow', sets: 2, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 2, reps: '30 sec', restSeconds: 0 },
            ]},
            { day: 5, name: 'Power C', kanji: '爆C', description: 'Full body power', focus: 'Explosive full body', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'clean-and-press', sets: 5, reps: '3-5', restSeconds: 90 },
              { exerciseId: 'sprint', sets: 6, reps: '50m', restSeconds: 60 },
              { exerciseId: 'squat', sets: 3, reps: '5-8', restSeconds: 90 },
              { exerciseId: 'burpee', sets: 3, reps: '10-12', restSeconds: 45 },
            ]},
            { day: 6, name: 'Recovery', kanji: '恢', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 2, name: 'Power Volume', theme: 'Increase explosive volume',
          days: [
            { day: 1, name: 'Power A2', kanji: '爆A2', description: 'Volume explosive', focus: 'Clean volume', durationMin: 50, intensity: 'high', exercises: [
              { exerciseId: 'clean-and-press', sets: 6, reps: '3-5', restSeconds: 60 },
              { exerciseId: 'box-jump', sets: 5, reps: '8-10', restSeconds: 45 },
              { exerciseId: 'squat', sets: 4, reps: '8-10', restSeconds: 90 },
              { exerciseId: 'explosive push-up', sets: 4, reps: '10-15', restSeconds: 30 },
            ]},
            { day: 2, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 3, name: 'Power B2', kanji: '爆B2', description: 'Volume explosive pulling', focus: 'Sprint volume', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'kettlebell-swing', sets: 6, reps: '15-20', restSeconds: 30 },
              { exerciseId: 'sprint', sets: 8, reps: '50m', restSeconds: 60 },
              { exerciseId: 'deadlift', sets: 4, reps: '8-10', restSeconds: 90 },
              { exerciseId: 'box-jump', sets: 5, reps: '8-10', restSeconds: 45 },
            ]},
            { day: 4, name: 'Active Recovery', kanji: '動休', description: 'Light work', focus: 'Recovery', durationMin: 15, intensity: 'low', exercises: [
              { exerciseId: 'stair-climb', sets: 1, reps: '15 min', restSeconds: 0 },
              { exerciseId: 'hip-opener', sets: 2, reps: '30 sec per side', restSeconds: 0 },
            ]},
            { day: 5, name: 'Power C2', kanji: '爆C2', description: 'Full body power', focus: 'Explosive endurance', durationMin: 35, intensity: 'high', exercises: [
              { exerciseId: 'clean-and-press', sets: 5, reps: '5-8', restSeconds: 60 },
              { exerciseId: 'burpee', sets: 5, reps: '10-12', restSeconds: 30 },
              { exerciseId: 'sprint', sets: 6, reps: '100m', restSeconds: 90 },
            ]},
            { day: 6, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 3, name: 'Peak Power', theme: 'Maximum intensity explosive',
          days: [
            { day: 1, name: 'Power Peak A', kanji: '頂A', description: 'Max power output', focus: 'Peak force', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'clean-and-press', sets: 8, reps: '1-3 (explosive)', restSeconds: 90 },
              { exerciseId: 'box-jump', sets: 6, reps: '5-6 (max height)', restSeconds: 60 },
              { exerciseId: 'squat', sets: 3, reps: '3-5 (heavy)', restSeconds: 120 },
              { exerciseId: 'sprint', sets: 4, reps: '30m (max)', restSeconds: 120 },
            ]},
            { day: 2, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 3, name: 'Power Peak B', kanji: '頂B', description: 'Max power', focus: 'Peak explosion', durationMin: 35, intensity: 'high', exercises: [
              { exerciseId: 'kettlebell-swing', sets: 5, reps: '10-15 (heavy)', restSeconds: 60 },
              { exerciseId: 'burpee', sets: 5, reps: '8-10 (explosive)', restSeconds: 45 },
              { exerciseId: 'deadlift', sets: 3, reps: '3-5 (heavy)', restSeconds: 120 },
              { exerciseId: 'box-jump', sets: 6, reps: '5-6', restSeconds: 45 },
            ]},
            { day: 4, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 5, name: 'Power Test', kanji: '爆試', description: 'Test explosive capacity', focus: 'Assessment', durationMin: 30, intensity: 'high', exercises: [
              { exerciseId: 'box-jump', sets: 3, reps: 'max height', restSeconds: 60 },
              { exerciseId: 'sprint', sets: 3, reps: '50m (timed)', restSeconds: 90 },
              { exerciseId: 'clean-and-press', sets: 3, reps: 'max reps at 60%', restSeconds: 60 },
              { exerciseId: 'burpee', sets: 1, reps: 'max in 2 min', restSeconds: 0 },
            ]},
            { day: 6, name: 'Recovery', kanji: '恢', description: 'Light mobility', focus: 'CNS recovery', durationMin: 20, intensity: 'low', exercises: [
              { exerciseId: 'cat-cow', sets: 3, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 3, reps: '30 sec', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '90 sec', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 4, name: 'Integration', theme: 'Combine power with strength',
          days: [
            { day: 1, name: 'Integration A', kanji: '統A', description: 'Power + strength combo', focus: 'Hybrid performance', durationMin: 45, intensity: 'high', exercises: [
              { exerciseId: 'clean-and-press', sets: 4, reps: '5-8', restSeconds: 60 },
              { exerciseId: 'squat', sets: 4, reps: '8-10', restSeconds: 90 },
              { exerciseId: 'box-jump', sets: 4, reps: '8-10', restSeconds: 30 },
              { exerciseId: 'bench-press', sets: 4, reps: '8-10', restSeconds: 90 },
              { exerciseId: 'sprint', sets: 4, reps: '50m', restSeconds: 60 },
            ]},
            { day: 2, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 3, name: 'Integration B', kanji: '統B', description: 'Power endurance', focus: 'Work capacity', durationMin: 35, intensity: 'high', exercises: [
              { exerciseId: 'kettlebell-swing', sets: 5, reps: '20-25', restSeconds: 30 },
              { exerciseId: 'burpee', sets: 5, reps: '10-12', restSeconds: 30 },
              { exerciseId: 'deadlift', sets: 3, reps: '8-10', restSeconds: 90 },
              { exerciseId: 'box-jump', sets: 4, reps: '8-10', restSeconds: 30 },
              { exerciseId: 'plank', sets: 3, reps: '45 sec', restSeconds: 20 },
            ]},
            { day: 4, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 5, name: 'Integration C', kanji: '統C', description: 'Full capacity', focus: 'Overall performance', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'sprint', sets: 4, reps: '100m', restSeconds: 60 },
              { exerciseId: 'clean-and-press', sets: 4, reps: '5-8', restSeconds: 60 },
              { exerciseId: 'squat', sets: 4, reps: '8-10', restSeconds: 60 },
              { exerciseId: 'push-up', sets: 3, reps: '15-20', restSeconds: 20 },
              { exerciseId: 'plank', sets: 3, reps: '60 sec', restSeconds: 15 },
            ]},
            { day: 6, name: 'Mobility', kanji: '動', description: 'Full body stretch', focus: 'Flexibility', durationMin: 25, intensity: 'low', exercises: [
              { exerciseId: 'cat-cow', sets: 3, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 3, reps: '30 sec', restSeconds: 0 },
              { exerciseId: 'hip-opener', sets: 3, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 3, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '90 sec', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
      ],
    },
    {
      month: 5, name: 'Endurance', kanji: '持久', subtitle: 'Work Capacity Builder',
      theme: 'Build cardiovascular and muscular endurance through higher volume, shorter rest',
      focus: 'Muscular endurance, cardio conditioning, work capacity',
      goal: 'Complete a 30-min continuous workout without stopping',
      whatYouGain: [
        '30-minute continuous workout capability',
        'Improved cardiovascular endurance',
        'Higher training volume tolerance',
        'Mental toughness for longer sessions',
      ],
      weeks: [
        {
          week: 1, name: 'Foundation', theme: 'Build endurance base with steady-state work',
          days: [
            { day: 1, name: 'Endurance A', kanji: '耐A', description: 'Full body endurance', focus: 'Continuous movement', durationMin: 30, intensity: 'medium', exercises: [
              { exerciseId: 'kettlebell-swing', sets: 4, reps: '20', restSeconds: 30 },
              { exerciseId: 'push-up', sets: 4, reps: '15', restSeconds: 30 },
              { exerciseId: 'dumbbell-row', sets: 4, reps: '15', restSeconds: 30 },
              { exerciseId: 'plank', sets: 3, reps: '45 sec', restSeconds: 15 },
              { exerciseId: 'jump-rope', sets: 3, reps: '60 sec', restSeconds: 20 },
            ]},
            { day: 2, name: 'Active Recovery', kanji: '動休', description: 'Light cardio and mobility', focus: 'Blood flow', durationMin: 20, intensity: 'low', exercises: [
              { exerciseId: 'row-machine', sets: 1, reps: '1000m', restSeconds: 0 },
              { exerciseId: 'cat-cow', sets: 2, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 2, reps: '30 sec', restSeconds: 0 },
            ]},
            { day: 3, name: 'Endurance B', kanji: '耐B', description: 'Cardio and core endurance', focus: 'Aerobic capacity', durationMin: 30, intensity: 'medium', exercises: [
              { exerciseId: 'mountain-climber', sets: 4, reps: '30 sec', restSeconds: 20 },
              { exerciseId: 'burpee', sets: 4, reps: '10-12', restSeconds: 30 },
              { exerciseId: 'kettlebell-swing', sets: 4, reps: '20', restSeconds: 20 },
              { exerciseId: 'crunches', sets: 4, reps: '20', restSeconds: 15 },
              { exerciseId: 'high-knees', sets: 3, reps: '30 sec', restSeconds: 20 },
            ]},
            { day: 4, name: 'Rest & Stretch', kanji: '休伸', description: 'Active recovery', focus: 'Flexibility', durationMin: 15, intensity: 'low', exercises: [
              { exerciseId: 'hip-opener', sets: 2, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 2, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '60 sec', restSeconds: 0 },
            ]},
            { day: 5, name: 'Endurance C', kanji: '耐C', description: 'Full body circuit', focus: 'Work capacity', durationMin: 35, intensity: 'medium', exercises: [
              { exerciseId: 'clean-and-press', sets: 3, reps: '8-10', restSeconds: 45 },
              { exerciseId: 'box-jump', sets: 4, reps: '10', restSeconds: 30 },
              { exerciseId: 'dumbbell-row', sets: 4, reps: '15', restSeconds: 30 },
              { exerciseId: 'russian-twist', sets: 3, reps: '15 per side', restSeconds: 15 },
              { exerciseId: 'farmer-walk', sets: 3, reps: '45 sec', restSeconds: 30 },
            ]},
            { day: 6, name: 'Endurance Challenge', kanji: '耐挑', description: 'Steady state test', focus: 'Continuous output', durationMin: 20, intensity: 'high', exercises: [
              { exerciseId: 'jump-rope', sets: 5, reps: '60 sec', restSeconds: 15 },
              { exerciseId: 'burpee', sets: 5, reps: '10', restSeconds: 15 },
              { exerciseId: 'plank', sets: 3, reps: '45 sec', restSeconds: 10 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest and recovery', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 2, name: 'Volume', theme: 'Increase total workout volume',
          days: [
            { day: 1, name: 'Endurance A2', kanji: '耐A2', description: 'Volume endurance', focus: 'Higher reps', durationMin: 35, intensity: 'medium', exercises: [
              { exerciseId: 'kettlebell-swing', sets: 5, reps: '25', restSeconds: 20 },
              { exerciseId: 'push-up', sets: 5, reps: '15-20', restSeconds: 20 },
              { exerciseId: 'dumbbell-row', sets: 5, reps: '15-20', restSeconds: 20 },
              { exerciseId: 'dead-bug', sets: 3, reps: '12 per side', restSeconds: 15 },
              { exerciseId: 'jump-rope', sets: 4, reps: '60 sec', restSeconds: 15 },
            ]},
            { day: 2, name: 'Recovery Cardio', kanji: '恢心', description: 'Light endurance', focus: 'Active recovery', durationMin: 25, intensity: 'low', exercises: [
              { exerciseId: 'row-machine', sets: 1, reps: '1500m', restSeconds: 0 },
              { exerciseId: 'cat-cow', sets: 2, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 2, reps: '30 sec', restSeconds: 0 },
            ]},
            { day: 3, name: 'Endurance B2', kanji: '耐B2', description: 'Cardio volume', focus: 'Aerobic endurance', durationMin: 35, intensity: 'medium', exercises: [
              { exerciseId: 'mountain-climber', sets: 5, reps: '30 sec', restSeconds: 15 },
              { exerciseId: 'burpee', sets: 4, reps: '12-15', restSeconds: 20 },
              { exerciseId: 'kettlebell-swing', sets: 5, reps: '25', restSeconds: 15 },
              { exerciseId: 'crunches', sets: 4, reps: '25', restSeconds: 10 },
              { exerciseId: 'high-knees', sets: 4, reps: '30 sec', restSeconds: 15 },
            ]},
            { day: 4, name: 'Mobility', kanji: '動', description: 'Full body flexibility', focus: 'Recovery', durationMin: 20, intensity: 'low', exercises: [
              { exerciseId: 'hip-opener', sets: 3, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 3, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '60 sec', restSeconds: 0 },
              { exerciseId: 'cat-cow', sets: 3, reps: '10 cycles', restSeconds: 0 },
            ]},
            { day: 5, name: 'Endurance C2', kanji: '耐C2', description: 'Full body volume', focus: 'Total work capacity', durationMin: 40, intensity: 'medium', exercises: [
              { exerciseId: 'clean-and-press', sets: 4, reps: '10-12', restSeconds: 30 },
              { exerciseId: 'box-jump', sets: 5, reps: '10-12', restSeconds: 20 },
              { exerciseId: 'dumbbell-row', sets: 5, reps: '15-20', restSeconds: 20 },
              { exerciseId: 'russian-twist', sets: 4, reps: '15 per side', restSeconds: 10 },
              { exerciseId: 'farmer-walk', sets: 4, reps: '45 sec', restSeconds: 20 },
            ]},
            { day: 6, name: 'Endurance Challenge', kanji: '耐挑2', description: 'Extended challenge', focus: 'Mental toughness', durationMin: 25, intensity: 'high', exercises: [
              { exerciseId: 'battle-ropes', sets: 4, reps: '30 sec', restSeconds: 15 },
              { exerciseId: 'burpee', sets: 5, reps: '12', restSeconds: 15 },
              { exerciseId: 'mountain-climber', sets: 4, reps: '30 sec', restSeconds: 10 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 3, name: 'Intensity', theme: 'Shorten rest, increase density',
          days: [
            { day: 1, name: 'Endurance A3', kanji: '耐A3', description: 'Density endurance', focus: 'Shorter rest', durationMin: 30, intensity: 'high', exercises: [
              { exerciseId: 'kettlebell-swing', sets: 6, reps: '20', restSeconds: 15 },
              { exerciseId: 'push-up', sets: 6, reps: '15', restSeconds: 15, notes: 'Drop set to knees as needed' },
              { exerciseId: 'dumbbell-row', sets: 6, reps: '15', restSeconds: 15 },
              { exerciseId: 'plank', sets: 4, reps: '45 sec', restSeconds: 10 },
              { exerciseId: 'jump-rope', sets: 4, reps: '45 sec', restSeconds: 10 },
            ]},
            { day: 2, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 3, name: 'Endurance B3', kanji: '耐B3', description: 'High density cardio', focus: 'Max work in minimal time', durationMin: 25, intensity: 'high', exercises: [
              { exerciseId: 'burpee', sets: 6, reps: '10', restSeconds: 10 },
              { exerciseId: 'mountain-climber', sets: 6, reps: '30 sec', restSeconds: 10 },
              { exerciseId: 'kettlebell-swing', sets: 6, reps: '20', restSeconds: 10 },
              { exerciseId: 'crunches', sets: 5, reps: '20', restSeconds: 5 },
            ]},
            { day: 4, name: 'Active Recovery', kanji: '動休', description: 'Light movement', focus: 'Blood flow', durationMin: 15, intensity: 'low', exercises: [
              { exerciseId: 'stair-climb', sets: 1, reps: '15 min', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 2, reps: '30 sec per side', restSeconds: 0 },
            ]},
            { day: 5, name: 'Endurance C3', kanji: '耐C3', description: 'Full body density', focus: 'Work capacity peak', durationMin: 30, intensity: 'high', exercises: [
              { exerciseId: 'clean-and-press', sets: 5, reps: '8-10', restSeconds: 20 },
              { exerciseId: 'box-jump', sets: 5, reps: '8-10', restSeconds: 15 },
              { exerciseId: 'dumbbell-row', sets: 5, reps: '15', restSeconds: 15 },
              { exerciseId: 'russian-twist', sets: 5, reps: '12 per side', restSeconds: 10 },
              { exerciseId: 'farmer-walk', sets: 4, reps: '30 sec', restSeconds: 15 },
            ]},
            { day: 6, name: 'Sweat Challenge', kanji: '汗挑', description: 'Maximum sweat', focus: 'Mental grit', durationMin: 20, intensity: 'high', exercises: [
              { exerciseId: 'battle-ropes', sets: 5, reps: '30 sec', restSeconds: 10 },
              { exerciseId: 'jump-rope', sets: 5, reps: '45 sec', restSeconds: 10 },
              { exerciseId: 'burpee', sets: 5, reps: '8-10', restSeconds: 0, notes: 'No rest — circuit style' },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 4, name: 'Peak', theme: 'Test your 30-min continuous workout',
          days: [
            { day: 1, name: 'Endurance A4', kanji: '耐A4', description: 'Pre-test endurance', focus: 'Final preparation', durationMin: 30, intensity: 'medium', exercises: [
              { exerciseId: 'kettlebell-swing', sets: 4, reps: '20', restSeconds: 20 },
              { exerciseId: 'push-up', sets: 4, reps: '15-20', restSeconds: 20 },
              { exerciseId: 'dumbbell-row', sets: 4, reps: '15', restSeconds: 20 },
              { exerciseId: 'plank', sets: 3, reps: '60 sec', restSeconds: 15 },
              { exerciseId: 'jumping-jacks', sets: 3, reps: '40', restSeconds: 15 },
            ]},
            { day: 2, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 3, name: '30-Min Test', kanji: '30分試', description: 'Continuous 30-min workout', focus: 'Endurance test', durationMin: 30, intensity: 'high', exercises: [
              { exerciseId: 'burpee', sets: 2, reps: '15', restSeconds: 0, notes: 'AMRAP-style circuit — complete as many rounds as possible in 30 min' },
              { exerciseId: 'kettlebell-swing', sets: 2, reps: '25', restSeconds: 0 },
              { exerciseId: 'mountain-climber', sets: 2, reps: '30 sec', restSeconds: 0 },
              { exerciseId: 'box-jump', sets: 2, reps: '10', restSeconds: 0 },
              { exerciseId: 'row-machine', sets: 2, reps: '250m', restSeconds: 0, notes: 'Repeat circuit continuously — score total rounds' },
            ]},
            { day: 4, name: 'Recovery', kanji: '恢', description: 'Light mobility', focus: 'Active recovery', durationMin: 20, intensity: 'low', exercises: [
              { exerciseId: 'cat-cow', sets: 3, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 3, reps: '30 sec', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '90 sec', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 2, reps: '30 sec per side', restSeconds: 0 },
            ]},
            { day: 5, name: 'Endurance C4', kanji: '耐C4', description: 'Post-test flush', focus: 'Recovery and pump', durationMin: 20, intensity: 'low', exercises: [
              { exerciseId: 'jump-rope', sets: 3, reps: '60 sec', restSeconds: 20 },
              { exerciseId: 'push-up', sets: 3, reps: '12', restSeconds: 20 },
              { exerciseId: 'kettlebell-swing', sets: 3, reps: '15', restSeconds: 20 },
            ]},
            { day: 6, name: 'Month Reflection', kanji: '省', description: 'Review progress', focus: 'Assessment', durationMin: 15, intensity: 'low', exercises: [
              { exerciseId: 'cat-cow', sets: 2, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '60 sec', restSeconds: 0 },
              { exerciseId: 'hip-opener', sets: 2, reps: '30 sec per side', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
      ],
    },
    {
      month: 6, name: 'Sculpt', kanji: '彫琢', subtitle: 'Aesthetic Development',
      theme: 'Muscle definition, symmetry, detail work for aesthetic physique',
      focus: 'Muscle definition, symmetry, detail work',
      goal: 'Achieve visible ab definition and improved muscle separation',
      whatYouGain: [
        'Visible muscle definition and separation',
        'Improved symmetry and balance',
        'Better mind-muscle connection',
        'Leaner, more aesthetic physique',
      ],
      weeks: [
        {
          week: 1, name: 'Upper/Lower Split', theme: 'Establish upper/lower split for detail work',
          days: [
            { day: 1, name: 'Upper Definition', kanji: '上彫', description: 'Upper body detail', focus: 'Chest, shoulders, arms', durationMin: 45, intensity: 'medium', exercises: [
              { exerciseId: 'incline-bench', sets: 4, reps: '10-12', restSeconds: 45 },
              { exerciseId: 'lateral-raise', sets: 4, reps: '15-20', restSeconds: 20 },
              { exerciseId: 'dumbbell-curl', sets: 4, reps: '12-15', restSeconds: 20 },
              { exerciseId: 'tricep-pushdown', sets: 4, reps: '12-15', restSeconds: 20 },
              { exerciseId: 'face-pull', sets: 3, reps: '15-20', restSeconds: 20 },
            ]},
            { day: 2, name: 'Lower Definition', kanji: '下彫', description: 'Lower body detail', focus: 'Legs and glutes', durationMin: 45, intensity: 'medium', exercises: [
              { exerciseId: 'lunges', sets: 4, reps: '12-15 per leg', restSeconds: 30 },
              { exerciseId: 'romanian-deadlift', sets: 4, reps: '12-15', restSeconds: 45 },
              { exerciseId: 'leg-extension', sets: 4, reps: '15-20', restSeconds: 20 },
              { exerciseId: 'leg-curl', sets: 4, reps: '15-20', restSeconds: 20 },
              { exerciseId: 'calf-raise', sets: 5, reps: '20', restSeconds: 15 },
            ]},
            { day: 3, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 4, name: 'Upper Detail', kanji: '上細', description: 'Detail and shape', focus: 'Definition', durationMin: 40, intensity: 'medium', exercises: [
              { exerciseId: 'cable-crossover', sets: 4, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'arnold-press', sets: 4, reps: '10-12', restSeconds: 45 },
              { exerciseId: 'hammer-curl', sets: 4, reps: '12-15', restSeconds: 20 },
              { exerciseId: 'skull-crusher', sets: 3, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'rear-delt-fly', sets: 3, reps: '15-20', restSeconds: 20 },
            ]},
            { day: 5, name: 'Core Definition', kanji: '腹彫', description: 'Ab and oblique detail', focus: 'Visible abs', durationMin: 30, intensity: 'medium', exercises: [
              { exerciseId: 'cable-crunch', sets: 4, reps: '15-20', restSeconds: 20 },
              { exerciseId: 'russian-twist', sets: 4, reps: '15-20 per side', restSeconds: 15 },
              { exerciseId: 'hanging-leg-raise', sets: 3, reps: '10-12', restSeconds: 20 },
              { exerciseId: 'pallof-press', sets: 3, reps: '12-15 per side', restSeconds: 20 },
            ]},
            { day: 6, name: 'Finisher Circuit', kanji: '完回', description: 'Full body finisher', focus: 'Tone', durationMin: 20, intensity: 'high', exercises: [
              { exerciseId: 'kettlebell-swing', sets: 4, reps: '15-20', restSeconds: 20 },
              { exerciseId: 'push-up', sets: 4, reps: '12-15', restSeconds: 20 },
              { exerciseId: 'plank', sets: 3, reps: '45 sec', restSeconds: 10 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 2, name: 'Isolation Focus', theme: 'Target lagging areas with isolation',
          days: [
            { day: 1, name: 'Shoulder Detail', kanji: '肩細', description: 'Delt isolation', focus: 'Shoulder roundness', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'arnold-press', sets: 4, reps: '10-12', restSeconds: 45 },
              { exerciseId: 'lateral-raise', sets: 5, reps: '15-20', restSeconds: 15 },
              { exerciseId: 'front-raise', sets: 4, reps: '12-15', restSeconds: 15 },
              { exerciseId: 'rear-delt-fly', sets: 4, reps: '15-20', restSeconds: 15 },
              { exerciseId: 'shrug', sets: 4, reps: '12-15', restSeconds: 30 },
            ]},
            { day: 2, name: 'Arm Detail', kanji: '腕細', description: 'Bicep and tricep isolation', focus: 'Arm definition', durationMin: 35, intensity: 'high', exercises: [
              { exerciseId: 'preacher-curl', sets: 4, reps: '12-15', restSeconds: 20 },
              { exerciseId: 'concentration-curl', sets: 3, reps: '12-15', restSeconds: 15 },
              { exerciseId: 'tricep-pushdown', sets: 4, reps: '15-20', restSeconds: 15 },
              { exerciseId: 'close-grip-press', sets: 4, reps: '10-12', restSeconds: 45 },
            ]},
            { day: 3, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 4, name: 'Chest Detail', kanji: '胸細', description: 'Chest isolation and shape', focus: 'Chest definition', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'dumbbell-fly', sets: 4, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'cable-crossover', sets: 4, reps: '15-20', restSeconds: 20 },
              { exerciseId: 'dumbbell-pullover', sets: 3, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'push-up', sets: 4, reps: '15-20', restSeconds: 20 },
              { exerciseId: 'diamond-pushup', sets: 3, reps: '10-12', restSeconds: 30 },
            ]},
            { day: 5, name: 'Lower Detail', kanji: '下細', description: 'Leg shape and separation', focus: 'Leg definition', durationMin: 45, intensity: 'high', exercises: [
              { exerciseId: 'leg-extension', sets: 5, reps: '15-20', restSeconds: 20 },
              { exerciseId: 'leg-curl', sets: 5, reps: '15-20', restSeconds: 20 },
              { exerciseId: 'hip-thrust', sets: 4, reps: '15-20', restSeconds: 30 },
              { exerciseId: 'calf-raise', sets: 5, reps: '20-25', restSeconds: 15 },
              { exerciseId: 'lunges', sets: 4, reps: '12-15 per leg', restSeconds: 20 },
            ]},
            { day: 6, name: 'Ab Circuit', kanji: '腹回', description: 'Core definition circuit', focus: 'Visible abs', durationMin: 20, intensity: 'high', exercises: [
              { exerciseId: 'cable-crunch', sets: 4, reps: '15-20', restSeconds: 10 },
              { exerciseId: 'hanging-leg-raise', sets: 3, reps: '10-15', restSeconds: 10 },
              { exerciseId: 'russian-twist', sets: 4, reps: '20 per side', restSeconds: 10 },
              { exerciseId: 'plank', sets: 3, reps: '60 sec', restSeconds: 10 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 3, name: 'Drop Sets', theme: 'Drop sets and supersets for max pump',
          days: [
            { day: 1, name: 'Chest Drop', kanji: '胸落', description: 'Chest drop sets', focus: 'Maximum chest pump', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'bench-press', sets: 4, reps: '12-10-8-6', restSeconds: 30, notes: 'Drop 10% each set' },
              { exerciseId: 'dumbbell-fly', sets: 4, reps: '12-15', restSeconds: 15 },
              { exerciseId: 'push-up', sets: 3, reps: 'to failure', restSeconds: 20 },
              { exerciseId: 'cable-crossover', sets: 4, reps: '15-20', restSeconds: 10, notes: 'Burnout set — light weight' },
            ]},
            { day: 2, name: 'Back Drop', kanji: '背落', description: 'Back drop sets', focus: 'Maximum back pump', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'lat-pulldown', sets: 4, reps: '12-10-8-6', restSeconds: 30, notes: 'Drop 10% each set' },
              { exerciseId: 'seated-row', sets: 4, reps: '12-15', restSeconds: 20 },
              { exerciseId: 'dumbbell-row', sets: 4, reps: '12-15', restSeconds: 20 },
              { exerciseId: 'face-pull', sets: 4, reps: '20', restSeconds: 10, notes: 'Light weight burnout' },
            ]},
            { day: 3, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 4, name: 'Shoulder Drop', kanji: '肩落', description: 'Shoulder drop sets', focus: 'Maximum shoulder pump', durationMin: 35, intensity: 'high', exercises: [
              { exerciseId: 'arnold-press', sets: 4, reps: '10-8-6-6', restSeconds: 30, notes: 'Drop 10% each set' },
              { exerciseId: 'lateral-raise', sets: 5, reps: '15-20', restSeconds: 10, notes: 'Triple drop set — reduce weight twice' },
              { exerciseId: 'front-raise', sets: 4, reps: '12-15', restSeconds: 10 },
              { exerciseId: 'shrug', sets: 4, reps: '15-20', restSeconds: 20 },
            ]},
            { day: 5, name: 'Leg Drop', kanji: '脚落', description: 'Leg drop sets', focus: 'Maximum leg pump', durationMin: 45, intensity: 'high', exercises: [
              { exerciseId: 'leg-press', sets: 5, reps: '15-12-10-8-8', restSeconds: 30, notes: 'Drop 10% each set' },
              { exerciseId: 'leg-extension', sets: 4, reps: '15-20', restSeconds: 10, notes: 'Drop set — reduce weight at failure' },
              { exerciseId: 'leg-curl', sets: 4, reps: '15-20', restSeconds: 10, notes: 'Drop set — reduce weight at failure' },
              { exerciseId: 'calf-raise', sets: 5, reps: '20-25', restSeconds: 10 },
            ]},
            { day: 6, name: 'Pump Finisher', kanji: '膨完', description: 'Full body pump', focus: 'Vascularity', durationMin: 15, intensity: 'high', exercises: [
              { exerciseId: 'push-up', sets: 5, reps: '15', restSeconds: 10 },
              { exerciseId: 'dumbbell-curl', sets: 5, reps: '12', restSeconds: 5 },
              { exerciseId: 'lateral-raise', sets: 5, reps: '15', restSeconds: 5 },
              { exerciseId: 'crunches', sets: 5, reps: '20', restSeconds: 5 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 4, name: 'Peak Pump', theme: 'Maximum pump — minimum rest — peak aesthetics',
          days: [
            { day: 1, name: 'Peak Upper', kanji: '頂上', description: 'Upper body peak', focus: 'Ultimate upper pump', durationMin: 45, intensity: 'high', exercises: [
              { exerciseId: 'incline-bench', sets: 4, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'cable-crossover', sets: 4, reps: '15-20', restSeconds: 15 },
              { exerciseId: 'lateral-raise', sets: 5, reps: '20', restSeconds: 10 },
              { exerciseId: 'dumbbell-curl', sets: 5, reps: '12-15', restSeconds: 10 },
              { exerciseId: 'tricep-pushdown', sets: 5, reps: '15-20', restSeconds: 10 },
            ]},
            { day: 2, name: 'Peak Lower', kanji: '頂下', description: 'Lower body peak', focus: 'Ultimate leg pump', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'lunges', sets: 4, reps: '15 per leg', restSeconds: 20 },
              { exerciseId: 'romanian-deadlift', sets: 4, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'leg-extension', sets: 5, reps: '15-20', restSeconds: 10 },
              { exerciseId: 'leg-curl', sets: 5, reps: '15-20', restSeconds: 10 },
              { exerciseId: 'calf-raise', sets: 5, reps: '25', restSeconds: 10 },
            ]},
            { day: 3, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 4, name: 'Peak Core', kanji: '頂腹', description: 'Core peak', focus: 'Ultimate ab pump', durationMin: 25, intensity: 'high', exercises: [
              { exerciseId: 'cable-crunch', sets: 5, reps: '15-20', restSeconds: 15 },
              { exerciseId: 'hanging-leg-raise', sets: 4, reps: '12-15', restSeconds: 15 },
              { exerciseId: 'russian-twist', sets: 4, reps: '20 per side', restSeconds: 10 },
              { exerciseId: 'pallof-press', sets: 4, reps: '12-15 per side', restSeconds: 10 },
            ]},
            { day: 5, name: 'Full Body Sculpt', kanji: '全彫', description: 'Total body finisher', focus: 'Definition', durationMin: 30, intensity: 'high', exercises: [
              { exerciseId: 'kettlebell-swing', sets: 4, reps: '20', restSeconds: 15 },
              { exerciseId: 'push-up', sets: 4, reps: '15-20', restSeconds: 15 },
              { exerciseId: 'dumbbell-row', sets: 4, reps: '15', restSeconds: 15 },
              { exerciseId: 'plank', sets: 3, reps: '60 sec', restSeconds: 10 },
              { exerciseId: 'jump-rope', sets: 3, reps: '60 sec', restSeconds: 10 },
            ]},
            { day: 6, name: 'Stretch & Reflect', kanji: '伸省', description: 'Full body mobility', focus: 'Recovery', durationMin: 20, intensity: 'low', exercises: [
              { exerciseId: 'cat-cow', sets: 3, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 3, reps: '30 sec', restSeconds: 0 },
              { exerciseId: 'hip-opener', sets: 3, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 3, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '90 sec', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
      ],
    },
    {
      month: 7, name: 'Pure Strength', kanji: '剛力', subtitle: 'Peak Strength',
      theme: 'Maximum strength, neural adaptation, heavy compound lifts',
      focus: 'Maximum strength, neural adaptation, heavy compounds',
      goal: '1.5x bodyweight squat, 1x bench, 2x deadlift',
      whatYouGain: [
        'Heavy compound lift mastery',
        'Neural drive and strength adaptation',
        '1.5x squat, 1x bench, 2x deadlift',
        'Confidence under maximal loads',
      ],
      weeks: [
        {
          week: 1, name: 'Heavy Compounds', theme: 'Build strength base with heavy compounds',
          days: [
            { day: 1, name: 'Strength A', kanji: '剛A', description: 'Heavy squat + bench', focus: 'Max strength', durationMin: 50, intensity: 'high', exercises: [
              { exerciseId: 'squat', sets: 5, reps: '6-8', restSeconds: 120 },
              { exerciseId: 'bench-press', sets: 5, reps: '6-8', restSeconds: 120 },
              { exerciseId: 'bent-over-row', sets: 4, reps: '6-8', restSeconds: 90 },
              { exerciseId: 'dumbbell-fly', sets: 3, reps: '10-12', restSeconds: 45 },
            ]},
            { day: 2, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 3, name: 'Strength B', kanji: '剛B', description: 'Heavy deadlift + press', focus: 'Posterior chain', durationMin: 50, intensity: 'high', exercises: [
              { exerciseId: 'deadlift', sets: 5, reps: '5-6', restSeconds: 150 },
              { exerciseId: 'overhead-press', sets: 5, reps: '6-8', restSeconds: 90 },
              { exerciseId: 'chin-up', sets: 4, reps: '6-8', restSeconds: 60 },
              { exerciseId: 'face-pull', sets: 3, reps: '15-20', restSeconds: 30 },
            ]},
            { day: 4, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 5, name: 'Strength C', kanji: '剛C', description: 'Heavy accessories', focus: 'Supporting strength', durationMin: 45, intensity: 'high', exercises: [
              { exerciseId: 'squat', sets: 4, reps: '6-8', restSeconds: 120 },
              { exerciseId: 'incline-bench', sets: 4, reps: '8-10', restSeconds: 90 },
              { exerciseId: 'dumbbell-row', sets: 4, reps: '8-10', restSeconds: 60 },
              { exerciseId: 'shrug', sets: 3, reps: '10-12', restSeconds: 45 },
              { exerciseId: 'plank', sets: 3, reps: '45 sec', restSeconds: 30 },
            ]},
            { day: 6, name: 'Recovery', kanji: '恢', description: 'Light activity', focus: 'Active recovery', durationMin: 15, intensity: 'low', exercises: [
              { exerciseId: 'row-machine', sets: 1, reps: '500m', restSeconds: 0 },
              { exerciseId: 'cat-cow', sets: 2, reps: '10 cycles', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 2, name: '5x5', theme: '5x5 strength protocol for neural adaptation',
          days: [
            { day: 1, name: '5x5 A', kanji: '5x5A', description: '5x5 squat + bench', focus: 'Volume strength', durationMin: 50, intensity: 'high', exercises: [
              { exerciseId: 'squat', sets: 5, reps: '5', restSeconds: 120 },
              { exerciseId: 'bench-press', sets: 5, reps: '5', restSeconds: 120 },
              { exerciseId: 'bent-over-row', sets: 5, reps: '5', restSeconds: 90 },
              { exerciseId: 'diamond-pushup', sets: 3, reps: '10-12', restSeconds: 45 },
            ]},
            { day: 2, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 3, name: '5x5 B', kanji: '5x5B', description: '5x5 deadlift + press', focus: 'Posterior chain', durationMin: 50, intensity: 'high', exercises: [
              { exerciseId: 'deadlift', sets: 5, reps: '5', restSeconds: 150 },
              { exerciseId: 'overhead-press', sets: 5, reps: '5', restSeconds: 120 },
              { exerciseId: 'chin-up', sets: 5, reps: '5-6', restSeconds: 60 },
              { exerciseId: 'face-pull', sets: 3, reps: '15-20', restSeconds: 30 },
            ]},
            { day: 4, name: 'Active Recovery', kanji: '動休', description: 'Light mobility', focus: 'Blood flow', durationMin: 20, intensity: 'low', exercises: [
              { exerciseId: 'stair-climb', sets: 1, reps: '20 min', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 2, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 2, reps: '30 sec', restSeconds: 0 },
            ]},
            { day: 5, name: '5x5 C', kanji: '5x5C', description: '5x5 accessories', focus: 'Auxiliary strength', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'squat', sets: 4, reps: '5', restSeconds: 120 },
              { exerciseId: 'incline-bench', sets: 5, reps: '5', restSeconds: 90 },
              { exerciseId: 'dumbbell-row', sets: 5, reps: '5', restSeconds: 60 },
              { exerciseId: 'shrug', sets: 4, reps: '8-10', restSeconds: 45 },
              { exerciseId: 'barbell-curl', sets: 3, reps: '8-10', restSeconds: 30 },
            ]},
            { day: 6, name: 'Conditioning', kanji: '調', description: 'Light cardio', focus: 'Active recovery', durationMin: 15, intensity: 'low', exercises: [
              { exerciseId: 'farmer-walk', sets: 3, reps: '30 sec', restSeconds: 30 },
              { exerciseId: 'stretching', sets: 1, reps: '5 min', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 3, name: '3x3 Peak', theme: 'Heavy triples for peak neural drive',
          days: [
            { day: 1, name: 'Peak A', kanji: '極A', description: '3x3 squat + bench', focus: 'Max neural drive', durationMin: 45, intensity: 'high', exercises: [
              { exerciseId: 'squat', sets: 6, reps: '3', restSeconds: 150, notes: 'Work up to heavy triple' },
              { exerciseId: 'bench-press', sets: 6, reps: '3', restSeconds: 150, notes: 'Work up to heavy triple' },
              { exerciseId: 'bent-over-row', sets: 4, reps: '5', restSeconds: 90 },
              { exerciseId: 'dumbbell-fly', sets: 3, reps: '8-10', restSeconds: 60 },
            ]},
            { day: 2, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 3, name: 'Peak B', kanji: '極B', description: '3x3 deadlift + press', focus: 'Max posterior chain', durationMin: 45, intensity: 'high', exercises: [
              { exerciseId: 'deadlift', sets: 5, reps: '3', restSeconds: 180, notes: 'Work up to heavy triple' },
              { exerciseId: 'overhead-press', sets: 6, reps: '3', restSeconds: 120, notes: 'Work up to heavy triple' },
              { exerciseId: 'pull-up', sets: 4, reps: '5', restSeconds: 60 },
              { exerciseId: 'face-pull', sets: 3, reps: '15', restSeconds: 30 },
            ]},
            { day: 4, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 5, name: 'Peak C', kanji: '極C', description: 'Peak accessories', focus: 'Supporting strength', durationMin: 35, intensity: 'high', exercises: [
              { exerciseId: 'squat', sets: 4, reps: '3', restSeconds: 120 },
              { exerciseId: 'incline-bench', sets: 4, reps: '5', restSeconds: 90 },
              { exerciseId: 'barbell-curl', sets: 3, reps: '6-8', restSeconds: 30 },
              { exerciseId: 'tricep-pushdown', sets: 3, reps: '8-10', restSeconds: 30 },
            ]},
            { day: 6, name: 'Recovery', kanji: '恢', description: 'Light stretch', focus: 'CNS recovery', durationMin: 15, intensity: 'low', exercises: [
              { exerciseId: 'cat-cow', sets: 3, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '60 sec', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 2, reps: '30 sec', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 4, name: '1RM Test', theme: 'Test 1 rep max on all major lifts',
          days: [
            { day: 1, name: '1RM Prep', kanji: '準最', description: 'Light technique work', focus: 'Form refinement', durationMin: 25, intensity: 'low', exercises: [
              { exerciseId: 'squat', sets: 3, reps: '5 (light)', restSeconds: 60 },
              { exerciseId: 'bench-press', sets: 3, reps: '5 (light)', restSeconds: 60 },
              { exerciseId: 'deadlift', sets: 2, reps: '5 (light)', restSeconds: 90 },
            ]},
            { day: 2, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 3, name: '1RM Day', kanji: '最重日', description: 'Max effort testing', focus: '1 rep max', durationMin: 60, intensity: 'high', exercises: [
              { exerciseId: 'squat', sets: 6, reps: '5-3-2-1-1-1', restSeconds: 180, notes: 'Build to 1RM attempt' },
              { exerciseId: 'bench-press', sets: 6, reps: '5-3-2-1-1-1', restSeconds: 180, notes: 'Build to 1RM attempt' },
              { exerciseId: 'deadlift', sets: 5, reps: '3-2-1-1-1', restSeconds: 210, notes: 'Build to 1RM attempt' },
            ]},
            { day: 4, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 5, name: 'Accessory Flush', kanji: '補流', description: 'Light pump work', focus: 'Recovery', durationMin: 25, intensity: 'low', exercises: [
              { exerciseId: 'lateral-raise', sets: 3, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'hammer-curl', sets: 3, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'tricep-pushdown', sets: 3, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'crunches', sets: 3, reps: '15-20', restSeconds: 20 },
            ]},
            { day: 6, name: 'Mobility', kanji: '動', description: 'Full body stretch', focus: 'Flexibility', durationMin: 20, intensity: 'low', exercises: [
              { exerciseId: 'cat-cow', sets: 3, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 3, reps: '30 sec', restSeconds: 0 },
              { exerciseId: 'hip-opener', sets: 2, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 2, reps: '30 sec per side', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
      ],
    },
    {
      month: 8, name: 'Athletic', kanji: '運動', subtitle: 'Sports Performance',
      theme: 'Agility, coordination, reactive training for athletic dominance',
      focus: 'Agility, coordination, reactive training',
      goal: 'Improve 40-yard dash by 0.3s and agility drill times',
      whatYouGain: [
        'Faster 40-yard dash time',
        'Improved agility and change of direction',
        'Better hand-eye coordination',
        'Sports-specific athleticism',
      ],
      weeks: [
        {
          week: 1, name: 'Agility Foundation', theme: 'Build agility base with ladder drills',
          days: [
            { day: 1, name: 'Agility A', kanji: '敏A', description: 'Speed and agility', focus: 'Footwork', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'sprint', sets: 6, reps: '40yd', restSeconds: 60 },
              { exerciseId: 'box-jump', sets: 4, reps: '8-10', restSeconds: 45 },
              { exerciseId: 'lunges', sets: 3, reps: '10 per leg', restSeconds: 30 },
              { exerciseId: 'burpee', sets: 4, reps: '10', restSeconds: 20 },
              { exerciseId: 'kettlebell-swing', sets: 4, reps: '15-20', restSeconds: 30 },
            ]},
            { day: 2, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 3, name: 'Agility B', kanji: '敏B', description: 'Plyometric power', focus: 'Explosiveness', durationMin: 35, intensity: 'high', exercises: [
              { exerciseId: 'box-jump', sets: 5, reps: '6-8 (max height)', restSeconds: 60 },
              { exerciseId: 'sprint', sets: 6, reps: '100m', restSeconds: 90 },
              { exerciseId: 'clean-and-press', sets: 4, reps: '5-8', restSeconds: 90 },
              { exerciseId: 'mountain-climber', sets: 4, reps: '30 sec', restSeconds: 20 },
            ]},
            { day: 4, name: 'Active Recovery', kanji: '動休', description: 'Light mobility', focus: 'Recovery', durationMin: 20, intensity: 'low', exercises: [
              { exerciseId: 'row-machine', sets: 1, reps: '1000m', restSeconds: 0 },
              { exerciseId: 'cat-cow', sets: 2, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 2, reps: '30 sec', restSeconds: 0 },
            ]},
            { day: 5, name: 'Agility C', kanji: '敏C', description: 'Reactive training', focus: 'Coordination', durationMin: 35, intensity: 'high', exercises: [
              { exerciseId: 'sprint', sets: 8, reps: '20yd', restSeconds: 45 },
              { exerciseId: 'burpee', sets: 5, reps: '10-12', restSeconds: 15 },
              { exerciseId: 'box-jump', sets: 4, reps: '8-10', restSeconds: 30 },
              { exerciseId: 'high-knees', sets: 4, reps: '30 sec', restSeconds: 20 },
              { exerciseId: 'jump-rope', sets: 4, reps: '60 sec', restSeconds: 20 },
            ]},
            { day: 6, name: 'Challenge', kanji: '挑', description: 'Agility challenge', focus: 'Performance', durationMin: 20, intensity: 'high', exercises: [
              { exerciseId: 'sprint', sets: 4, reps: '40yd (timed)', restSeconds: 60 },
              { exerciseId: 'box-jump', sets: 4, reps: 'max height', restSeconds: 30 },
              { exerciseId: 'burpee', sets: 1, reps: 'max in 1 min', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 2, name: 'Speed Work', theme: 'Develop top-end speed and acceleration',
          days: [
            { day: 1, name: 'Speed A', kanji: '速A', description: 'Acceleration work', focus: 'Starting speed', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'sprint', sets: 8, reps: '20yd (explosive start)', restSeconds: 60 },
              { exerciseId: 'box-jump', sets: 5, reps: '8-10', restSeconds: 45 },
              { exerciseId: 'power clean (dumbbell)', sets: 4, reps: '5-8', restSeconds: 60, notes: 'Use clean-and-press motion' },
              { exerciseId: 'lunges', sets: 4, reps: '10 per leg', restSeconds: 20 },
            ]},
            { day: 2, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 3, name: 'Speed B', kanji: '速B', description: 'Top speed development', focus: 'Maximum velocity', durationMin: 35, intensity: 'high', exercises: [
              { exerciseId: 'sprint', sets: 6, reps: '60m (flying start)', restSeconds: 90 },
              { exerciseId: 'box-jump', sets: 5, reps: '6-8 (max height)', restSeconds: 45 },
              { exerciseId: 'kettlebell-swing', sets: 5, reps: '15-20', restSeconds: 20 },
              { exerciseId: 'mountain-climber', sets: 5, reps: '20 sec (fast)', restSeconds: 15 },
            ]},
            { day: 4, name: 'Recovery', kanji: '恢', description: 'Active recovery', focus: 'Blood flow', durationMin: 20, intensity: 'low', exercises: [
              { exerciseId: 'row-machine', sets: 1, reps: '1500m', restSeconds: 0 },
              { exerciseId: 'hip-opener', sets: 2, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 2, reps: '30 sec per side', restSeconds: 0 },
            ]},
            { day: 5, name: 'Speed C', kanji: '速C', description: 'Speed endurance', focus: 'Maintaining speed', durationMin: 35, intensity: 'high', exercises: [
              { exerciseId: 'sprint', sets: 4, reps: '150m', restSeconds: 120 },
              { exerciseId: 'clean-and-press', sets: 4, reps: '5-8', restSeconds: 60 },
              { exerciseId: 'burpee', sets: 5, reps: '10', restSeconds: 20 },
              { exerciseId: 'jump-rope', sets: 5, reps: '60 sec', restSeconds: 15 },
            ]},
            { day: 6, name: 'Agility Test', kanji: '敏試', description: 'Timed agility drills', focus: 'Assessment', durationMin: 15, intensity: 'high', exercises: [
              { exerciseId: 'sprint', sets: 3, reps: '40yd (timed)', restSeconds: 90 },
              { exerciseId: 'box-jump', sets: 3, reps: 'max height', restSeconds: 30 },
              { exerciseId: 'burpee', sets: 1, reps: 'max in 2 min', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 3, name: 'Reactive Training', theme: 'Reactive drills and coordination',
          days: [
            { day: 1, name: 'Reactive A', kanji: '反A', description: 'Reactive power', focus: 'Reaction time', durationMin: 35, intensity: 'high', exercises: [
              { exerciseId: 'box-jump', sets: 6, reps: '6-8', restSeconds: 30 },
              { exerciseId: 'kettlebell-swing', sets: 5, reps: '20', restSeconds: 15 },
              { exerciseId: 'sprint', sets: 6, reps: '30yd', restSeconds: 45 },
              { exerciseId: 'mountain-climber', sets: 5, reps: '30 sec', restSeconds: 10 },
            ]},
            { day: 2, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 3, name: 'Reactive B', kanji: '反B', description: 'Coordination and balance', focus: 'Body control', durationMin: 35, intensity: 'high', exercises: [
              { exerciseId: 'lunges', sets: 4, reps: '12 per leg', restSeconds: 20 },
              { exerciseId: 'burpee', sets: 6, reps: '8-10', restSeconds: 15 },
              { exerciseId: 'box-jump', sets: 5, reps: '8-10 (lateral)', restSeconds: 30 },
              { exerciseId: 'high-knees', sets: 5, reps: '30 sec', restSeconds: 15 },
              { exerciseId: 'jump-rope', sets: 5, reps: '30 sec (single leg)', restSeconds: 15 },
            ]},
            { day: 4, name: 'Active Recovery', kanji: '動休', description: 'Light movement', focus: 'Recovery', durationMin: 15, intensity: 'low', exercises: [
              { exerciseId: 'stair-climb', sets: 1, reps: '15 min', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 2, reps: '30 sec', restSeconds: 0 },
            ]},
            { day: 5, name: 'Reactive C', kanji: '反C', description: 'Full body reaction', focus: 'Explosive endurance', durationMin: 30, intensity: 'high', exercises: [
              { exerciseId: 'clean-and-press', sets: 5, reps: '5-8', restSeconds: 45 },
              { exerciseId: 'sprint', sets: 6, reps: '50m', restSeconds: 45 },
              { exerciseId: 'burpee', sets: 5, reps: '10', restSeconds: 15 },
              { exerciseId: 'plank', sets: 3, reps: '45 sec', restSeconds: 10 },
            ]},
            { day: 6, name: 'Reactive Test', kanji: '反試', description: 'Performance assessment', focus: 'Peak output', durationMin: 15, intensity: 'high', exercises: [
              { exerciseId: 'sprint', sets: 3, reps: '40yd (timed)', restSeconds: 60 },
              { exerciseId: 'box-jump', sets: 3, reps: 'max height', restSeconds: 30 },
              { exerciseId: 'burpee', sets: 1, reps: 'max in 1 min', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 4, name: 'Performance Test', theme: 'Test all athletic metrics',
          days: [
            { day: 1, name: 'Performance A', kanji: '成A', description: 'Speed and power', focus: 'Peak performance', durationMin: 35, intensity: 'high', exercises: [
              { exerciseId: 'sprint', sets: 4, reps: '40yd (max effort)', restSeconds: 90 },
              { exerciseId: 'box-jump', sets: 4, reps: 'max height', restSeconds: 45 },
              { exerciseId: 'clean-and-press', sets: 4, reps: '5-8 (explosive)', restSeconds: 60 },
              { exerciseId: 'kettlebell-swing', sets: 4, reps: '20', restSeconds: 20 },
            ]},
            { day: 2, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 3, name: 'Performance B', kanji: '成B', description: 'Endurance and agility', focus: 'Overall athleticism', durationMin: 30, intensity: 'high', exercises: [
              { exerciseId: 'burpee', sets: 6, reps: '10-12', restSeconds: 15 },
              { exerciseId: 'sprint', sets: 4, reps: '100m', restSeconds: 60 },
              { exerciseId: 'box-jump', sets: 4, reps: '8-10', restSeconds: 20 },
              { exerciseId: 'mountain-climber', sets: 5, reps: '30 sec', restSeconds: 10 },
            ]},
            { day: 4, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 5, name: 'Final Test', kanji: '最終試', description: 'Complete athletic assessment', focus: 'All metrics', durationMin: 25, intensity: 'high', exercises: [
              { exerciseId: 'sprint', sets: 2, reps: '40yd (timed — best effort)', restSeconds: 120 },
              { exerciseId: 'box-jump', sets: 3, reps: 'max height', restSeconds: 30 },
              { exerciseId: 'clean-and-press', sets: 3, reps: 'max reps at 50% bodyweight', restSeconds: 60 },
              { exerciseId: 'burpee', sets: 1, reps: 'max in 2 min', restSeconds: 0 },
            ]},
            { day: 6, name: 'Recovery', kanji: '恢', description: 'Full body stretch', focus: 'Recovery', durationMin: 20, intensity: 'low', exercises: [
              { exerciseId: 'cat-cow', sets: 3, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 3, reps: '30 sec', restSeconds: 0 },
              { exerciseId: 'hip-opener', sets: 2, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 3, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '60 sec', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
      ],
    },
    {
      month: 9, name: 'Intensity', kanji: '激烈', subtitle: 'Maximum Effort',
      theme: 'Metabolic conditioning, HIIT, mental fortitude challenges',
      focus: 'Metabolic conditioning, HIIT, mental fortitude',
      goal: 'Complete the 300 workout (300 reps of mixed exercises)',
      whatYouGain: [
        'Ability to complete the 300 workout',
        'Peak metabolic conditioning',
        'Unshakable mental fortitude',
        'Elite work capacity',
      ],
      weeks: [
        {
          week: 1, name: 'Metabolic Circuits', theme: 'Introduce high-intensity circuits',
          days: [
            { day: 1, name: 'MetCon A', kanji: '代A', description: 'Full body metabolic circuit', focus: 'Work capacity', durationMin: 30, intensity: 'high', exercises: [
              { exerciseId: 'kettlebell-swing', sets: 5, reps: '20', restSeconds: 15 },
              { exerciseId: 'burpee', sets: 5, reps: '10', restSeconds: 15 },
              { exerciseId: 'push-up', sets: 5, reps: '15', restSeconds: 15 },
              { exerciseId: 'mountain-climber', sets: 5, reps: '30 sec', restSeconds: 10 },
              { exerciseId: 'sprint', sets: 4, reps: '50m', restSeconds: 30 },
            ]},
            { day: 2, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 3, name: 'MetCon B', kanji: '代B', description: 'Strength endurance circuit', focus: 'Muscular endurance', durationMin: 30, intensity: 'high', exercises: [
              { exerciseId: 'clean-and-press', sets: 4, reps: '8-10', restSeconds: 20 },
              { exerciseId: 'dumbbell-row', sets: 4, reps: '15', restSeconds: 15 },
              { exerciseId: 'box-jump', sets: 4, reps: '10', restSeconds: 15 },
              { exerciseId: 'crunches', sets: 4, reps: '25', restSeconds: 10 },
              { exerciseId: 'jump-rope', sets: 4, reps: '45 sec', restSeconds: 10 },
            ]},
            { day: 4, name: 'Recovery', kanji: '恢', description: 'Light mobility', focus: 'Active recovery', durationMin: 15, intensity: 'low', exercises: [
              { exerciseId: 'cat-cow', sets: 2, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 2, reps: '30 sec', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '60 sec', restSeconds: 0 },
            ]},
            { day: 5, name: 'MetCon C', kanji: '代C', description: 'Tabata style circuit', focus: 'HIIT conditioning', durationMin: 25, intensity: 'high', exercises: [
              { exerciseId: 'burpee', sets: 8, reps: '20 sec on / 10 off', restSeconds: 0, notes: 'Tabata protocol — 4 min total' },
              { exerciseId: 'kettlebell-swing', sets: 8, reps: '20 sec on / 10 off', restSeconds: 0, notes: 'Tabata protocol' },
              { exerciseId: 'mountain-climber', sets: 8, reps: '20 sec on / 10 off', restSeconds: 0, notes: 'Tabata protocol' },
              { exerciseId: 'plank', sets: 4, reps: '30 sec', restSeconds: 10 },
            ]},
            { day: 6, name: 'MetCon Challenge', kanji: '代挑', description: 'AMRAP challenge', focus: 'Maximum output', durationMin: 15, intensity: 'high', exercises: [
              { exerciseId: 'kettlebell-swing', sets: 1, reps: 'AMRAP 15 min', restSeconds: 0, notes: 'As Many Rounds As Possible: 10 swings, 8 burpees, 10 push-ups, 200m sprint' },
              { exerciseId: 'burpee', sets: 1, reps: 'AMRAP 15 min', restSeconds: 0 },
              { exerciseId: 'push-up', sets: 1, reps: 'AMRAP 15 min', restSeconds: 0 },
              { exerciseId: 'sprint', sets: 1, reps: 'AMRAP 15 min', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 2, name: 'HIIT', theme: 'High Intensity Interval Training peak',
          days: [
            { day: 1, name: 'HIIT A', kanji: '高間A', description: 'Sprint intervals', focus: 'Max intensity', durationMin: 25, intensity: 'high', exercises: [
              { exerciseId: 'sprint', sets: 10, reps: '30 sec max / 60 sec rest', restSeconds: 0, notes: 'HIIT intervals' },
              { exerciseId: 'box-jump', sets: 5, reps: '10', restSeconds: 15 },
              { exerciseId: 'burpee', sets: 5, reps: '10', restSeconds: 10 },
              { exerciseId: 'jump-rope', sets: 5, reps: '45 sec', restSeconds: 10 },
            ]},
            { day: 2, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 3, name: 'HIIT B', kanji: '高間B', description: 'Bodyweight HIIT', focus: 'Metabolic burn', durationMin: 25, intensity: 'high', exercises: [
              { exerciseId: 'burpee', sets: 10, reps: '30 sec on / 30 off', restSeconds: 0, notes: 'HIIT intervals' },
              { exerciseId: 'mountain-climber', sets: 10, reps: '30 sec on / 30 off', restSeconds: 0, notes: 'HIIT intervals' },
              { exerciseId: 'high-knees', sets: 10, reps: '30 sec on / 30 off', restSeconds: 0, notes: 'HIIT intervals' },
              { exerciseId: 'crunches', sets: 5, reps: '20', restSeconds: 10 },
            ]},
            { day: 4, name: 'Active Recovery', kanji: '動休', description: 'Light recovery', focus: 'Blood flow', durationMin: 15, intensity: 'low', exercises: [
              { exerciseId: 'row-machine', sets: 1, reps: '1000m', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 2, reps: '30 sec per side', restSeconds: 0 },
            ]},
            { day: 5, name: 'HIIT C', kanji: '高間C', description: 'Full body HIIT', focus: 'Total conditioning', durationMin: 30, intensity: 'high', exercises: [
              { exerciseId: 'kettlebell-swing', sets: 8, reps: '20 sec on / 20 off', restSeconds: 0, notes: 'HIIT intervals' },
              { exerciseId: 'box-jump', sets: 6, reps: '8', restSeconds: 10 },
              { exerciseId: 'battle-ropes', sets: 6, reps: '20 sec on / 20 off', restSeconds: 0, notes: 'HIIT intervals' },
              { exerciseId: 'plank', sets: 4, reps: '30 sec', restSeconds: 10 },
            ]},
            { day: 6, name: 'HIIT Challenge', kanji: '高間挑', description: 'Death by burpees', focus: 'Mental toughness', durationMin: 10, intensity: 'high', exercises: [
              { exerciseId: 'burpee', sets: 1, reps: 'Every minute on the minute — start with 1, add 1 each minute', restSeconds: 0, notes: 'Continue until failure. Score = total minutes completed' },
              { exerciseId: 'jump-rope', sets: 3, reps: '60 sec', restSeconds: 15, notes: 'Cool-down after burpee challenge' },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 3, name: 'Challenge Workouts', theme: 'Famous benchmark workouts',
          days: [
            { day: 1, name: 'Murphy Prep', kanji: '準備', description: 'Preparation for benchmark', focus: 'Volume tolerance', durationMin: 35, intensity: 'high', exercises: [
              { exerciseId: 'push-up', sets: 10, reps: '10 (on the minute)', restSeconds: 0, notes: 'EMOM — 10 push-ups every minute for 10 min' },
              { exerciseId: 'sprint', sets: 5, reps: '200m', restSeconds: 60 },
              { exerciseId: 'dumbbell-row', sets: 4, reps: '15', restSeconds: 20 },
              { exerciseId: 'crunches', sets: 5, reps: '20', restSeconds: 10 },
            ]},
            { day: 2, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 3, name: 'Benchmark: Cindy', kanji: '基Cindy', description: 'Famous CrossFit benchmark', focus: 'AMRAP', durationMin: 20, intensity: 'high', exercises: [
              { exerciseId: 'pull-up', sets: 3, reps: '5', restSeconds: 0, notes: 'AMRAP 20 min: 5 pull-ups, 10 push-ups, 15 squats. Score total rounds' },
              { exerciseId: 'push-up', sets: 3, reps: '10', restSeconds: 0 },
              { exerciseId: 'squat', sets: 3, reps: '15', restSeconds: 0 },
            ]},
            { day: 4, name: 'Recovery', kanji: '恢', description: 'Light stretch', focus: 'Active recovery', durationMin: 20, intensity: 'low', exercises: [
              { exerciseId: 'cat-cow', sets: 3, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 3, reps: '30 sec', restSeconds: 0 },
              { exerciseId: 'hip-opener', sets: 2, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '60 sec', restSeconds: 0 },
            ]},
            { day: 5, name: 'Benchmark: Helen', kanji: '基Helen', description: 'Famous benchmark', focus: 'Speed endurance', durationMin: 15, intensity: 'high', exercises: [
              { exerciseId: 'kettlebell-swing', sets: 3, reps: '21', restSeconds: 0, notes: '3 rounds for time: 400m run, 21 KB swings, 12 pull-ups' },
              { exerciseId: 'pull-up', sets: 3, reps: '12', restSeconds: 0 },
              { exerciseId: 'sprint', sets: 3, reps: '400m', restSeconds: 0 },
            ]},
            { day: 6, name: 'Benchmark Prep', kanji: '準挑', description: 'Prepare for 300 test', focus: 'Volume accumulation', durationMin: 25, intensity: 'high', exercises: [
              { exerciseId: 'push-up', sets: 5, reps: '20', restSeconds: 15 },
              { exerciseId: 'kettlebell-swing', sets: 5, reps: '20', restSeconds: 15 },
              { exerciseId: 'dumbbell-row', sets: 5, reps: '15', restSeconds: 15 },
              { exerciseId: 'crunches', sets: 5, reps: '20', restSeconds: 10 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 4, name: 'The 300 Test', theme: 'Complete the legendary 300 workout',
          days: [
            { day: 1, name: '300 Prep Light', kanji: '300準', description: 'Light preparation', focus: 'Muscle readiness', durationMin: 20, intensity: 'low', exercises: [
              { exerciseId: 'push-up', sets: 3, reps: '10', restSeconds: 30 },
              { exerciseId: 'kettlebell-swing', sets: 3, reps: '15', restSeconds: 30 },
              { exerciseId: 'crunches', sets: 3, reps: '15', restSeconds: 30 },
            ]},
            { day: 2, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 3, name: 'The 300 Workout', kanji: '300戦', description: '300 reps for time', focus: 'Maximum effort', durationMin: 30, intensity: 'high', exercises: [
              { exerciseId: 'pull-up', sets: 1, reps: '25', restSeconds: 0, notes: 'Complete all 300 reps for time. 25 pull-ups, 50 deadlifts (135lbs), 50 push-ups, 50 box jumps, 50 kettlebell swings, 25 chin-ups, 50 squats. Rest as needed within.' },
              { exerciseId: 'deadlift', sets: 1, reps: '50', restSeconds: 0 },
              { exerciseId: 'push-up', sets: 1, reps: '50', restSeconds: 0 },
              { exerciseId: 'box-jump', sets: 1, reps: '50', restSeconds: 0 },
              { exerciseId: 'kettlebell-swing', sets: 1, reps: '50', restSeconds: 0 },
              { exerciseId: 'chin-up', sets: 1, reps: '25', restSeconds: 0 },
              { exerciseId: 'squat', sets: 1, reps: '50', restSeconds: 0 },
            ]},
            { day: 4, name: 'Rest', kanji: '休', description: 'Full rest and recovery', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 5, name: 'Post-300 Flush', kanji: '後流', description: 'Light recovery workout', focus: 'Blood flow', durationMin: 15, intensity: 'low', exercises: [
              { exerciseId: 'row-machine', sets: 1, reps: '1000m', restSeconds: 0 },
              { exerciseId: 'cat-cow', sets: 3, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 3, reps: '30 sec', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '90 sec', restSeconds: 0 },
            ]},
            { day: 6, name: 'Reflection', kanji: '省', description: 'Month review', focus: 'Assessment', durationMin: 15, intensity: 'low', exercises: [
              { exerciseId: 'cat-cow', sets: 2, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 2, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'hip-opener', sets: 2, reps: '30 sec per side', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
      ],
    },
    {
      month: 10, name: 'Balance', kanji: '調和', subtitle: 'Holistic Fitness',
      theme: 'Well-rounded fitness, mobility, stress management, overall health',
      focus: 'Well-rounded fitness, mobility, stress management',
      goal: 'Balanced scores across all 5 fitness attributes: strength, endurance, power, mobility, conditioning',
      whatYouGain: [
        'Balanced development across all fitness domains',
        'Improved mobility and flexibility',
        'Better stress management through movement',
        'Holistic understanding of your body',
      ],
      weeks: [
        {
          week: 1, name: 'Strength/Endurance Combo', theme: 'Mix strength and endurance training',
          days: [
            { day: 1, name: 'Strength + Cardio', kanji: '力心', description: 'Strength followed by cardio', focus: 'Hybrid fitness', durationMin: 45, intensity: 'medium', exercises: [
              { exerciseId: 'squat', sets: 3, reps: '10-12', restSeconds: 60 },
              { exerciseId: 'bench-press', sets: 3, reps: '10-12', restSeconds: 60 },
              { exerciseId: 'bent-over-row', sets: 3, reps: '10-12', restSeconds: 60 },
              { exerciseId: 'jump-rope', sets: 4, reps: '60 sec', restSeconds: 15 },
              { exerciseId: 'farmer-walk', sets: 3, reps: '30 sec', restSeconds: 20 },
            ]},
            { day: 2, name: 'Endurance Day', kanji: '耐日', description: 'Steady state cardio', focus: 'Aerobic base', durationMin: 30, intensity: 'low', exercises: [
              { exerciseId: 'row-machine', sets: 1, reps: '2000m', restSeconds: 0 },
              { exerciseId: 'cat-cow', sets: 2, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 2, reps: '30 sec', restSeconds: 0 },
            ]},
            { day: 3, name: 'Power + Agility', kanji: '爆敏', description: 'Explosive power with agility', focus: 'Athletic balance', durationMin: 35, intensity: 'high', exercises: [
              { exerciseId: 'clean-and-press', sets: 4, reps: '5-8', restSeconds: 60 },
              { exerciseId: 'box-jump', sets: 4, reps: '8-10', restSeconds: 30 },
              { exerciseId: 'sprint', sets: 6, reps: '40yd', restSeconds: 45 },
              { exerciseId: 'burpee', sets: 4, reps: '10', restSeconds: 15 },
            ]},
            { day: 4, name: 'Rest & Mobility', kanji: '休動', description: 'Full body mobility', focus: 'Flexibility', durationMin: 25, intensity: 'low', exercises: [
              { exerciseId: 'cat-cow', sets: 3, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 3, reps: '30 sec', restSeconds: 0 },
              { exerciseId: 'hip-opener', sets: 3, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 3, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '60 sec', restSeconds: 0 },
            ]},
            { day: 5, name: 'Full Body Balanced', kanji: '全調', description: 'Balanced full body workout', focus: 'Overall fitness', durationMin: 40, intensity: 'medium', exercises: [
              { exerciseId: 'deadlift', sets: 3, reps: '8-10', restSeconds: 90 },
              { exerciseId: 'overhead-press', sets: 3, reps: '8-10', restSeconds: 60 },
              { exerciseId: 'dumbbell-row', sets: 3, reps: '12', restSeconds: 45 },
              { exerciseId: 'lunges', sets: 3, reps: '10 per leg', restSeconds: 30 },
              { exerciseId: 'plank', sets: 3, reps: '45 sec', restSeconds: 20 },
            ]},
            { day: 6, name: 'Active Recovery', kanji: '動恢', description: 'Light fun movement', focus: 'Enjoyment', durationMin: 20, intensity: 'low', exercises: [
              { exerciseId: 'jump-rope', sets: 3, reps: '60 sec', restSeconds: 20 },
              { exerciseId: 'stretching', sets: 1, reps: '10 min', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '60 sec', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 2, name: 'Mobility Focus', theme: 'Dedicated mobility and flexibility work',
          days: [
            { day: 1, name: 'Strength + Mobility', kanji: '力動', description: 'Strength with mobility emphasis', focus: 'Functional strength', durationMin: 40, intensity: 'medium', exercises: [
              { exerciseId: 'goblet-squat', sets: 3, reps: '12-15', restSeconds: 45 },
              { exerciseId: 'push-up', sets: 3, reps: '15', restSeconds: 30 },
              { exerciseId: 'dumbbell-row', sets: 3, reps: '12', restSeconds: 45 },
              { exerciseId: 'dead-bug', sets: 3, reps: '10 per side', restSeconds: 15 },
              { exerciseId: 'cat-cow', sets: 3, reps: '10 cycles', restSeconds: 0, notes: 'Integrated mobility' },
            ]},
            { day: 2, name: 'Mobility Circuit', kanji: '動回', description: 'Full body mobility', focus: 'Range of motion', durationMin: 30, intensity: 'low', exercises: [
              { exerciseId: 'downward-dog', sets: 4, reps: '30 sec', restSeconds: 0 },
              { exerciseId: 'hip-opener', sets: 3, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 3, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 2, reps: '60 sec', restSeconds: 0 },
              { exerciseId: 'cat-cow', sets: 4, reps: '10 cycles', restSeconds: 0 },
            ]},
            { day: 3, name: 'Power + Flexibility', kanji: '爆柔', description: 'Power and stretch', focus: 'Explosive with mobility', durationMin: 35, intensity: 'medium', exercises: [
              { exerciseId: 'kettlebell-swing', sets: 4, reps: '15-20', restSeconds: 30 },
              { exerciseId: 'box-jump', sets: 4, reps: '8-10', restSeconds: 30 },
              { exerciseId: 'lunges', sets: 3, reps: '12 per leg', restSeconds: 20 },
              { exerciseId: 'hip-opener', sets: 2, reps: '30 sec per side', restSeconds: 0, notes: 'Flexibility finisher' },
              { exerciseId: 'hamstring-stretch', sets: 2, reps: '30 sec per side', restSeconds: 0 },
            ]},
            { day: 4, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 5, name: 'Balanced Circuit', kanji: '調回', description: 'All attributes circuit', focus: 'Overall balance', durationMin: 35, intensity: 'medium', exercises: [
              { exerciseId: 'clean-and-press', sets: 3, reps: '5-8', restSeconds: 45 },
              { exerciseId: 'burpee', sets: 4, reps: '10', restSeconds: 20 },
              { exerciseId: 'dumbbell-fly', sets: 3, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'leg-curl', sets: 3, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'russian-twist', sets: 3, reps: '15 per side', restSeconds: 15 },
            ]},
            { day: 6, name: 'Recovery & Stretch', kanji: '恢動', description: 'Deep stretch session', focus: 'Flexibility', durationMin: 25, intensity: 'low', exercises: [
              { exerciseId: 'cat-cow', sets: 4, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 4, reps: '30 sec', restSeconds: 0 },
              { exerciseId: 'hip-opener', sets: 3, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 3, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '90 sec', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 3, name: 'Circuit Training', theme: 'Full circuit training for all attributes',
          days: [
            { day: 1, name: 'Strength Circuit', kanji: '力回', description: 'Compound lift circuit', focus: 'Strength endurance', durationMin: 35, intensity: 'high', exercises: [
              { exerciseId: 'squat', sets: 4, reps: '8-10', restSeconds: 45 },
              { exerciseId: 'bench-press', sets: 4, reps: '8-10', restSeconds: 45 },
              { exerciseId: 'bent-over-row', sets: 4, reps: '8-10', restSeconds: 45 },
              { exerciseId: 'deadlift', sets: 3, reps: '8-10', restSeconds: 60 },
              { exerciseId: 'plank', sets: 3, reps: '45 sec', restSeconds: 15 },
            ]},
            { day: 2, name: 'Cardio Circuit', kanji: '心回', description: 'Aerobic circuit', focus: 'Cardiovascular health', durationMin: 30, intensity: 'medium', exercises: [
              { exerciseId: 'jump-rope', sets: 5, reps: '60 sec', restSeconds: 15 },
              { exerciseId: 'mountain-climber', sets: 4, reps: '30 sec', restSeconds: 10 },
              { exerciseId: 'high-knees', sets: 4, reps: '30 sec', restSeconds: 10 },
              { exerciseId: 'row-machine', sets: 1, reps: '500m', restSeconds: 0 },
            ]},
            { day: 3, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 4, name: 'Power Circuit', kanji: '爆回', description: 'Explosive circuit', focus: 'Power output', durationMin: 30, intensity: 'high', exercises: [
              { exerciseId: 'clean-and-press', sets: 4, reps: '5-8', restSeconds: 45 },
              { exerciseId: 'box-jump', sets: 4, reps: '8-10', restSeconds: 20 },
              { exerciseId: 'kettlebell-swing', sets: 4, reps: '20', restSeconds: 15 },
              { exerciseId: 'burpee', sets: 4, reps: '10', restSeconds: 15 },
            ]},
            { day: 5, name: 'Full Assessment', kanji: '全評', description: 'Test all attributes', focus: 'Balanced evaluation', durationMin: 30, intensity: 'medium', exercises: [
              { exerciseId: 'squat', sets: 3, reps: '8-10', restSeconds: 60 },
              { exerciseId: 'push-up', sets: 3, reps: 'max', restSeconds: 30 },
              { exerciseId: 'kettlebell-swing', sets: 3, reps: '20', restSeconds: 20 },
              { exerciseId: 'plank', sets: 1, reps: 'max time', restSeconds: 0 },
              { exerciseId: 'sprint', sets: 1, reps: '400m (timed)', restSeconds: 0 },
            ]},
            { day: 6, name: 'Active Recovery', kanji: '動恢', description: 'Light movement', focus: 'Stress relief', durationMin: 20, intensity: 'low', exercises: [
              { exerciseId: 'stair-climb', sets: 1, reps: '15 min', restSeconds: 0 },
              { exerciseId: 'cat-cow', sets: 3, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '60 sec', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 4, name: 'Full Assessment', theme: 'Comprehensive fitness assessment',
          days: [
            { day: 1, name: 'Strength Test', kanji: '力試', description: 'Strength assessment', focus: 'Max strength', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'squat', sets: 4, reps: '8-10 (heavy)', restSeconds: 120 },
              { exerciseId: 'bench-press', sets: 4, reps: '8-10 (heavy)', restSeconds: 90 },
              { exerciseId: 'deadlift', sets: 3, reps: '8-10 (heavy)', restSeconds: 120 },
              { exerciseId: 'overhead-press', sets: 3, reps: '8-10 (heavy)', restSeconds: 90 },
            ]},
            { day: 2, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 3, name: 'Endurance & Power', kanji: '耐爆', description: 'Cardio and power test', focus: 'Conditioning', durationMin: 25, intensity: 'high', exercises: [
              { exerciseId: 'sprint', sets: 1, reps: '1 mile (timed)', restSeconds: 0, notes: 'Run 1 mile at best pace' },
              { exerciseId: 'box-jump', sets: 5, reps: 'max height', restSeconds: 30 },
              { exerciseId: 'burpee', sets: 1, reps: 'max in 2 min', restSeconds: 0 },
              { exerciseId: 'plank', sets: 1, reps: 'max time', restSeconds: 0 },
            ]},
            { day: 4, name: 'Mobility Assessment', kanji: '動評', description: 'Full body mobility check', focus: 'Range of motion', durationMin: 20, intensity: 'low', exercises: [
              { exerciseId: 'cat-cow', sets: 3, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 3, reps: '30 sec', restSeconds: 0 },
              { exerciseId: 'hip-opener', sets: 3, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 3, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '60 sec', restSeconds: 0 },
            ]},
            { day: 5, name: 'Balanced Finisher', kanji: '調完', description: 'Final balanced workout', focus: 'All attributes', durationMin: 25, intensity: 'medium', exercises: [
              { exerciseId: 'clean-and-press', sets: 3, reps: '5-8', restSeconds: 45 },
              { exerciseId: 'kettlebell-swing', sets: 4, reps: '20', restSeconds: 20 },
              { exerciseId: 'push-up', sets: 3, reps: '15', restSeconds: 20 },
              { exerciseId: 'lunges', sets: 3, reps: '10 per leg', restSeconds: 20 },
              { exerciseId: 'crunches', sets: 3, reps: '20', restSeconds: 10 },
            ]},
            { day: 6, name: 'Reflection', kanji: '省', description: 'Month reflection', focus: 'Planning', durationMin: 15, intensity: 'low', exercises: [
              { exerciseId: 'cat-cow', sets: 2, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '60 sec', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 2, reps: '30 sec per side', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
      ],
    },
    {
      month: 11, name: 'Specialization', kanji: '専門', subtitle: 'Focus On Weaknesses',
      theme: 'Weak point training, targeted improvement, symmetry correction',
      focus: 'Weak point training, targeted improvement, symmetry correction',
      goal: 'Improve weakest fitness attribute by 20% across all metrics',
      whatYouGain: [
        '20% improvement in weakest attribute',
        'Corrected muscle imbalances',
        'Targeted weak point training skills',
        'Symmetry and proportion improvement',
      ],
      weeks: [
        {
          week: 1, name: 'Assessment', theme: 'Identify and measure weaknesses',
          days: [
            { day: 1, name: 'Strength Assessment', kanji: '力評', description: 'Measure current strength levels', focus: 'Baseline', durationMin: 40, intensity: 'medium', exercises: [
              { exerciseId: 'squat', sets: 4, reps: '8-10', restSeconds: 90 },
              { exerciseId: 'bench-press', sets: 4, reps: '8-10', restSeconds: 90 },
              { exerciseId: 'deadlift', sets: 3, reps: '8-10', restSeconds: 120 },
              { exerciseId: 'pull-up', sets: 3, reps: 'max', restSeconds: 60 },
              { exerciseId: 'overhead-press', sets: 3, reps: '8-10', restSeconds: 60 },
            ]},
            { day: 2, name: 'Endurance Assessment', kanji: '耐評', description: 'Cardio baseline', focus: 'Aerobic capacity', durationMin: 20, intensity: 'medium', exercises: [
              { exerciseId: 'sprint', sets: 1, reps: '1 mile (timed)', restSeconds: 0 },
              { exerciseId: 'burpee', sets: 1, reps: 'max in 1 min', restSeconds: 0 },
            ]},
            { day: 3, name: 'Power Assessment', kanji: '爆評', description: 'Explosive power baseline', focus: 'Power output', durationMin: 25, intensity: 'high', exercises: [
              { exerciseId: 'box-jump', sets: 5, reps: 'max height', restSeconds: 45 },
              { exerciseId: 'clean-and-press', sets: 4, reps: '5-8 (explosive)', restSeconds: 60 },
              { exerciseId: 'sprint', sets: 4, reps: '40yd (timed)', restSeconds: 60 },
              { exerciseId: 'kettlebell-swing', sets: 4, reps: '20', restSeconds: 20 },
            ]},
            { day: 4, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 5, name: 'Mobility & Core', kanji: '動腹評', description: 'Mobility and core baseline', focus: 'Flexibility + stability', durationMin: 25, intensity: 'low', exercises: [
              { exerciseId: 'plank', sets: 1, reps: 'max time', restSeconds: 0 },
              { exerciseId: 'cat-cow', sets: 3, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'hip-opener', sets: 3, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 3, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 3, reps: '30 sec', restSeconds: 0 },
            ]},
            { day: 6, name: 'Identify Weakness', kanji: '弱認', description: 'Analyze results', focus: 'Planning', durationMin: 10, intensity: 'low', exercises: [
              { exerciseId: 'childs-pose', sets: 1, reps: '60 sec', restSeconds: 0 },
              { exerciseId: 'stretching', sets: 1, reps: '5 min', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 2, name: 'Targeted Volume', theme: 'High volume on weak areas',
          days: [
            { day: 1, name: 'Weak Point A', kanji: '弱A', description: 'Targeted volume — push', focus: 'Weakness correction', durationMin: 45, intensity: 'high', exercises: [
              { exerciseId: 'bench-press', sets: 5, reps: '10-12', restSeconds: 45 },
              { exerciseId: 'incline-bench', sets: 4, reps: '10-12', restSeconds: 45 },
              { exerciseId: 'dumbbell-fly', sets: 4, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'push-up', sets: 4, reps: '15-20', restSeconds: 20 },
              { exerciseId: 'tricep-pushdown', sets: 4, reps: '12-15', restSeconds: 20 },
            ]},
            { day: 2, name: 'Weak Point B', kanji: '弱B', description: 'Targeted volume — pull', focus: 'Back + biceps', durationMin: 45, intensity: 'high', exercises: [
              { exerciseId: 'lat-pulldown', sets: 5, reps: '10-12', restSeconds: 45 },
              { exerciseId: 'seated-row', sets: 4, reps: '12-15', restSeconds: 45 },
              { exerciseId: 'dumbbell-row', sets: 4, reps: '12-15', restSeconds: 45 },
              { exerciseId: 'dumbbell-curl', sets: 5, reps: '12-15', restSeconds: 15 },
              { exerciseId: 'face-pull', sets: 4, reps: '15-20', restSeconds: 20 },
            ]},
            { day: 3, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 4, name: 'Weak Point C', kanji: '弱C', description: 'Targeted volume — legs', focus: 'Lower body', durationMin: 45, intensity: 'high', exercises: [
              { exerciseId: 'squat', sets: 5, reps: '10-12', restSeconds: 60 },
              { exerciseId: 'lunges', sets: 4, reps: '12-15 per leg', restSeconds: 30 },
              { exerciseId: 'leg-press', sets: 5, reps: '12-15', restSeconds: 45 },
              { exerciseId: 'calf-raise', sets: 5, reps: '20', restSeconds: 15 },
              { exerciseId: 'hip-thrust', sets: 4, reps: '12-15', restSeconds: 45 },
            ]},
            { day: 5, name: 'Weak Point D', kanji: '弱D', description: 'Targeted — shoulders + core', focus: 'Delts + abs', durationMin: 35, intensity: 'high', exercises: [
              { exerciseId: 'arnold-press', sets: 4, reps: '10-12', restSeconds: 45 },
              { exerciseId: 'lateral-raise', sets: 5, reps: '15-20', restSeconds: 15 },
              { exerciseId: 'rear-delt-fly', sets: 4, reps: '15-20', restSeconds: 15 },
              { exerciseId: 'cable-crunch', sets: 5, reps: '15-20', restSeconds: 15 },
              { exerciseId: 'hanging-leg-raise', sets: 4, reps: '10-12', restSeconds: 15 },
            ]},
            { day: 6, name: 'Weak Point Finisher', kanji: '弱完', description: 'Targeted burnout', focus: 'Maximum stimulus', durationMin: 15, intensity: 'high', exercises: [
              { exerciseId: 'push-up', sets: 4, reps: '15', restSeconds: 10 },
              { exerciseId: 'dumbbell-curl', sets: 4, reps: '12', restSeconds: 10 },
              { exerciseId: 'lateral-raise', sets: 4, reps: '15', restSeconds: 10 },
              { exerciseId: 'crunches', sets: 4, reps: '20', restSeconds: 10 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 3, name: 'Intensity', theme: 'Increase intensity on weak areas',
          days: [
            { day: 1, name: 'Weak Intensity A', kanji: '弱強A', description: 'Intense push focus', focus: 'Weak point overload', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'bench-press', sets: 5, reps: '8-10 (heavy)', restSeconds: 90 },
              { exerciseId: 'incline-bench', sets: 4, reps: '8-10 (heavy)', restSeconds: 90 },
              { exerciseId: 'dumbbell-fly', sets: 4, reps: '10-12', restSeconds: 30 },
              { exerciseId: 'diamond-pushup', sets: 3, reps: '10-12', restSeconds: 30 },
              { exerciseId: 'close-grip-press', sets: 3, reps: '8-10', restSeconds: 60 },
            ]},
            { day: 2, name: 'Weak Intensity B', kanji: '弱強B', description: 'Intense pull focus', focus: 'Back overload', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'deadlift', sets: 4, reps: '5-8 (heavy)', restSeconds: 150 },
              { exerciseId: 'bent-over-row', sets: 5, reps: '8-10 (heavy)', restSeconds: 60 },
              { exerciseId: 'chin-up', sets: 4, reps: '8-10', restSeconds: 45 },
              { exerciseId: 'preacher-curl', sets: 4, reps: '8-10', restSeconds: 20 },
              { exerciseId: 'hammer-curl', sets: 4, reps: '10-12', restSeconds: 20 },
            ]},
            { day: 3, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 4, name: 'Weak Intensity C', kanji: '弱強C', description: 'Intense legs focus', focus: 'Leg overload', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'squat', sets: 5, reps: '8-10 (heavy)', restSeconds: 90 },
              { exerciseId: 'romanian-deadlift', sets: 4, reps: '8-10 (heavy)', restSeconds: 60 },
              { exerciseId: 'leg-press', sets: 5, reps: '12-15', restSeconds: 45 },
              { exerciseId: 'leg-extension', sets: 4, reps: '12-15', restSeconds: 20 },
              { exerciseId: 'leg-curl', sets: 4, reps: '12-15', restSeconds: 20 },
            ]},
            { day: 5, name: 'Weak Intensity D', kanji: '弱強D', description: 'Intense shoulders + core', focus: 'Delt overload', durationMin: 30, intensity: 'high', exercises: [
              { exerciseId: 'overhead-press', sets: 5, reps: '8-10 (heavy)', restSeconds: 90 },
              { exerciseId: 'lateral-raise', sets: 5, reps: '15-20', restSeconds: 10, notes: 'Drop sets — burnout' },
              { exerciseId: 'shrug', sets: 4, reps: '10-12', restSeconds: 30 },
              { exerciseId: 'russian-twist', sets: 5, reps: '20 per side', restSeconds: 10 },
              { exerciseId: 'plank', sets: 4, reps: '45 sec', restSeconds: 10 },
            ]},
            { day: 6, name: 'Weak Point Challenge', kanji: '弱挑', description: 'Final weak point test', focus: 'Improvement check', durationMin: 15, intensity: 'high', exercises: [
              { exerciseId: 'push-up', sets: 3, reps: 'max', restSeconds: 30 },
              { exerciseId: 'pull-up', sets: 3, reps: 'max', restSeconds: 30 },
              { exerciseId: 'squat', sets: 3, reps: 'max reps (light weight)', restSeconds: 30 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 4, name: 'Retest', theme: 'Measure improvement on weaknesses',
          days: [
            { day: 1, name: 'Pre-Retest', kanji: '前再', description: 'Light preparation', focus: 'Freshness', durationMin: 20, intensity: 'low', exercises: [
              { exerciseId: 'push-up', sets: 3, reps: '10', restSeconds: 30 },
              { exerciseId: 'dumbbell-row', sets: 3, reps: '10', restSeconds: 30 },
              { exerciseId: 'squat', sets: 3, reps: '10 (light)', restSeconds: 45 },
            ]},
            { day: 2, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 3, name: 'Retest Day', kanji: '再試日', description: 'Complete retest', focus: 'Measure progress', durationMin: 45, intensity: 'high', exercises: [
              { exerciseId: 'squat', sets: 4, reps: '8-10 (compare to week 1)', restSeconds: 90 },
              { exerciseId: 'bench-press', sets: 4, reps: '8-10 (compare to week 1)', restSeconds: 90 },
              { exerciseId: 'deadlift', sets: 3, reps: '8-10 (compare to week 1)', restSeconds: 120 },
              { exerciseId: 'pull-up', sets: 3, reps: 'max (compare to week 1)', restSeconds: 60 },
              { exerciseId: 'sprint', sets: 1, reps: '1 mile (timed)', restSeconds: 0, notes: 'Compare to week 1 time' },
            ]},
            { day: 4, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 5, name: 'Celebration Circuit', kanji: '祝回', description: 'Celebrate improvements', focus: 'Enjoyment', durationMin: 25, intensity: 'medium', exercises: [
              { exerciseId: 'clean-and-press', sets: 3, reps: '5-8', restSeconds: 45 },
              { exerciseId: 'box-jump', sets: 4, reps: '8-10', restSeconds: 20 },
              { exerciseId: 'kettlebell-swing', sets: 4, reps: '20', restSeconds: 15 },
              { exerciseId: 'farmer-walk', sets: 3, reps: '30 sec', restSeconds: 20 },
            ]},
            { day: 6, name: 'Reflection', kanji: '省', description: 'Review progress', focus: 'Assessment', durationMin: 15, intensity: 'low', exercises: [
              { exerciseId: 'cat-cow', sets: 2, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '60 sec', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 2, reps: '30 sec per side', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
      ],
    },
    {
      month: 12, name: 'Ascension', kanji: '昇華', subtitle: 'Peak & Test',
      theme: 'Peak performance, max testing, celebration, and year 2 planning',
      focus: 'Peak performance, testing, celebration, planning',
      goal: 'Personal records across all major lifts and final fitness assessment',
      whatYouGain: [
        'Personal records on all major lifts',
        'Complete year 1 fitness assessment',
        'Celebration of 12 months of transformation',
        'Clear roadmap for year 2',
      ],
      weeks: [
        {
          week: 1, name: 'Peak Week', theme: 'Peak performance — heavy but fresh',
          days: [
            { day: 1, name: 'Peak A', kanji: '絶A', description: 'Peak squat + bench', focus: 'Strength peak', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'squat', sets: 4, reps: '5 (heavy)', restSeconds: 150 },
              { exerciseId: 'bench-press', sets: 4, reps: '5 (heavy)', restSeconds: 120 },
              { exerciseId: 'bent-over-row', sets: 4, reps: '5 (heavy)', restSeconds: 90 },
              { exerciseId: 'plank', sets: 3, reps: '45 sec', restSeconds: 20 },
            ]},
            { day: 2, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 3, name: 'Peak B', kanji: '絶B', description: 'Peak deadlift + press', focus: 'Posterior chain peak', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'deadlift', sets: 3, reps: '5 (heavy)', restSeconds: 180 },
              { exerciseId: 'overhead-press', sets: 4, reps: '5 (heavy)', restSeconds: 120 },
              { exerciseId: 'chin-up', sets: 4, reps: '5-8', restSeconds: 60 },
              { exerciseId: 'face-pull', sets: 3, reps: '15', restSeconds: 20 },
            ]},
            { day: 4, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 5, name: 'Peak C', kanji: '絶C', description: 'Peak accessories', focus: 'Supporting lifts', durationMin: 30, intensity: 'medium', exercises: [
              { exerciseId: 'incline-bench', sets: 3, reps: '8-10', restSeconds: 60 },
              { exerciseId: 'dumbbell-row', sets: 3, reps: '8-10', restSeconds: 60 },
              { exerciseId: 'hammer-curl', sets: 3, reps: '10-12', restSeconds: 20 },
              { exerciseId: 'tricep-pushdown', sets: 3, reps: '10-12', restSeconds: 20 },
            ]},
            { day: 6, name: 'Light Movement', kanji: '軽動', description: 'Active recovery', focus: 'Freshness for test week', durationMin: 15, intensity: 'low', exercises: [
              { exerciseId: 'cat-cow', sets: 2, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 2, reps: '30 sec', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '60 sec', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 2, name: 'Max Testing', theme: 'Test 1RM and benchmark workouts',
          days: [
            { day: 1, name: '1RM Squat & Bench', kanji: '最蹲臥', description: 'Max squat and bench', focus: '1 rep max', durationMin: 50, intensity: 'high', exercises: [
              { exerciseId: 'squat', sets: 6, reps: '5-3-2-1-1-1', restSeconds: 180, notes: 'Build to 1RM attempt. Record your max!' },
              { exerciseId: 'bench-press', sets: 6, reps: '5-3-2-1-1-1', restSeconds: 180, notes: 'Build to 1RM attempt. Record your max!' },
              { exerciseId: 'bent-over-row', sets: 3, reps: '8-10', restSeconds: 60 },
            ]},
            { day: 2, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 3, name: '1RM Deadlift & Press', kanji: '最地肩', description: 'Max deadlift and press', focus: '1 rep max', durationMin: 50, intensity: 'high', exercises: [
              { exerciseId: 'deadlift', sets: 5, reps: '3-2-1-1-1', restSeconds: 210, notes: 'Build to 1RM attempt. Record your max!' },
              { exerciseId: 'overhead-press', sets: 6, reps: '5-3-2-1-1-1', restSeconds: 180, notes: 'Build to 1RM attempt. Record your max!' },
              { exerciseId: 'pull-up', sets: 3, reps: 'max', restSeconds: 60 },
            ]},
            { day: 4, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'CNS recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 5, name: 'Benchmark Test', kanji: '基試', description: 'Year 1 benchmark', focus: 'Final assessment', durationMin: 25, intensity: 'high', exercises: [
              { exerciseId: 'sprint', sets: 1, reps: '1 mile (timed)', restSeconds: 0 },
              { exerciseId: 'burpee', sets: 1, reps: 'max in 2 min', restSeconds: 0 },
              { exerciseId: 'plank', sets: 1, reps: 'max time', restSeconds: 0 },
              { exerciseId: 'push-up', sets: 1, reps: 'max reps', restSeconds: 0 },
            ]},
            { day: 6, name: 'Recovery', kanji: '恢', description: 'Light flush', focus: 'Active recovery', durationMin: 15, intensity: 'low', exercises: [
              { exerciseId: 'row-machine', sets: 1, reps: '1000m', restSeconds: 0 },
              { exerciseId: 'cat-cow', sets: 3, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '60 sec', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 3, name: 'Victory Lap', theme: 'Celebrate achievements with favorite workouts',
          days: [
            { day: 1, name: 'Favorite Push', kanji: '好推', description: 'Your best push workout', focus: 'Celebration', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'bench-press', sets: 5, reps: '10-12', restSeconds: 60 },
              { exerciseId: 'incline-bench', sets: 4, reps: '10-12', restSeconds: 60 },
              { exerciseId: 'lateral-raise', sets: 5, reps: '15-20', restSeconds: 15 },
              { exerciseId: 'dumbbell-fly', sets: 4, reps: '12-15', restSeconds: 30 },
              { exerciseId: 'tricep-pushdown', sets: 5, reps: '12-15', restSeconds: 15, notes: 'Burnout — light weight, high reps' },
            ]},
            { day: 2, name: 'Favorite Pull', kanji: '好拉', description: 'Your best pull workout', focus: 'Celebration', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'deadlift', sets: 4, reps: '8-10', restSeconds: 90 },
              { exerciseId: 'lat-pulldown', sets: 5, reps: '10-12', restSeconds: 45 },
              { exerciseId: 'seated-row', sets: 4, reps: '12-15', restSeconds: 45 },
              { exerciseId: 'dumbbell-curl', sets: 5, reps: '12-15', restSeconds: 15 },
              { exerciseId: 'face-pull', sets: 4, reps: '15-20', restSeconds: 15 },
            ]},
            { day: 3, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 4, name: 'Favorite Legs', kanji: '好脚', description: 'Your best leg workout', focus: 'Celebration', durationMin: 40, intensity: 'high', exercises: [
              { exerciseId: 'squat', sets: 5, reps: '10-12', restSeconds: 60 },
              { exerciseId: 'lunges', sets: 4, reps: '12-15 per leg', restSeconds: 20 },
              { exerciseId: 'romanian-deadlift', sets: 4, reps: '12-15', restSeconds: 45 },
              { exerciseId: 'calf-raise', sets: 5, reps: '20-25', restSeconds: 10 },
              { exerciseId: 'hip-thrust', sets: 4, reps: '12-15', restSeconds: 30 },
            ]},
            { day: 5, name: 'Full Body Victory', kanji: '全勝', description: 'Full body celebration', focus: 'Total body pump', durationMin: 30, intensity: 'high', exercises: [
              { exerciseId: 'clean-and-press', sets: 4, reps: '5-8', restSeconds: 45 },
              { exerciseId: 'kettlebell-swing', sets: 5, reps: '20', restSeconds: 15 },
              { exerciseId: 'box-jump', sets: 4, reps: '10', restSeconds: 20 },
              { exerciseId: 'push-up', sets: 4, reps: '20', restSeconds: 15 },
              { exerciseId: 'plank', sets: 3, reps: '60 sec', restSeconds: 10 },
            ]},
            { day: 6, name: 'Fun Movement', kanji: '楽動', description: 'Enjoyable active day', focus: 'Joy of movement', durationMin: 20, intensity: 'low', exercises: [
              { exerciseId: 'jump-rope', sets: 5, reps: '60 sec', restSeconds: 15 },
              { exerciseId: 'farmer-walk', sets: 3, reps: '30 sec', restSeconds: 15 },
              { exerciseId: 'stretching', sets: 1, reps: '5 min', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Complete rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
        {
          week: 4, name: 'Reflection & Year 2 Plan', theme: 'Review year 1, plan year 2',
          days: [
            { day: 1, name: 'Final Strength', kanji: '最終力', description: 'Last strength workout', focus: 'Final reps', durationMin: 40, intensity: 'medium', exercises: [
              { exerciseId: 'squat', sets: 4, reps: '10-12', restSeconds: 60 },
              { exerciseId: 'bench-press', sets: 4, reps: '10-12', restSeconds: 60 },
              { exerciseId: 'deadlift', sets: 3, reps: '10-12', restSeconds: 90 },
              { exerciseId: 'dumbbell-row', sets: 3, reps: '12', restSeconds: 45 },
              { exerciseId: 'plank', sets: 3, reps: '60 sec', restSeconds: 15 },
            ]},
            { day: 2, name: 'Final Cardio', kanji: '最終心', description: 'Last cardio session', focus: 'Final effort', durationMin: 20, intensity: 'medium', exercises: [
              { exerciseId: 'row-machine', sets: 1, reps: '2000m (best effort)', restSeconds: 0 },
              { exerciseId: 'cat-cow', sets: 2, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'downward-dog', sets: 2, reps: '30 sec', restSeconds: 0 },
            ]},
            { day: 3, name: 'Rest', kanji: '休', description: 'Full rest', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
            { day: 4, name: 'Final Mobility', kanji: '最終動', description: 'Last mobility session', focus: 'Gratitude', durationMin: 25, intensity: 'low', exercises: [
              { exerciseId: 'cat-cow', sets: 4, reps: '10 cycles', restSeconds: 0, notes: 'Celebrate how far your mobility has come' },
              { exerciseId: 'downward-dog', sets: 4, reps: '30 sec', restSeconds: 0 },
              { exerciseId: 'hip-opener', sets: 3, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 3, reps: '30 sec per side', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 2, reps: '60 sec', restSeconds: 0 },
            ]},
            { day: 5, name: 'Year 1 Finale', kanji: '一年完', description: 'Final workout of year 1', focus: 'Full body celebration', durationMin: 25, intensity: 'medium', exercises: [
              { exerciseId: 'kettlebell-swing', sets: 4, reps: '20', restSeconds: 20 },
              { exerciseId: 'burpee', sets: 4, reps: '10', restSeconds: 20 },
              { exerciseId: 'clean-and-press', sets: 3, reps: '5-8', restSeconds: 45 },
              { exerciseId: 'push-up', sets: 3, reps: '20', restSeconds: 15 },
              { exerciseId: 'plank', sets: 2, reps: '60 sec', restSeconds: 0, notes: 'Hold the final plank — you earned it' },
            ]},
            { day: 6, name: 'Year 1 Reflections', kanji: '一年省', description: 'Complete reflection', focus: 'Gratitude and planning', durationMin: 15, intensity: 'low', exercises: [
              { exerciseId: 'cat-cow', sets: 3, reps: '10 cycles', restSeconds: 0 },
              { exerciseId: 'childs-pose', sets: 1, reps: '90 sec', restSeconds: 0 },
              { exerciseId: 'hamstring-stretch', sets: 3, reps: '30 sec per side', restSeconds: 0 },
            ]},
            { day: 7, name: 'Full Rest', kanji: '全休', description: 'Year 1 complete — rest and celebrate', focus: 'Recovery', durationMin: 0, intensity: 'low', exercises: []},
          ],
        },
      ],
    },
  ],
};

export const yearProgram = year;

export function getMonthProgram(month: number): MonthProgram | undefined {
  return year.months.find((m) => m.month === month);
}

export function getAllMonths(): MonthProgram[] {
  return year.months;
}

export function getWeekProgram(month: number, week: number): WeekProgram | undefined {
  const m = getMonthProgram(month);
  return m?.weeks.find((w) => w.week === week);
}
