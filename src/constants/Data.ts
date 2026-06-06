export const mockPrograms = [
  { id: 'p1', nameKanji: '剣術', nameEnglish: 'Blade Master', type: 'Equipment', difficulty: 4, durationMin: 45, workoutCount: 15, backgroundImage: '', description: 'Master the ancient art of the blade with intense focus and precision.' },
  { id: 'p2', nameKanji: '柔術', nameEnglish: 'Bodyweight Flow', type: 'Zero-Equipment', difficulty: 3, durationMin: 30, workoutCount: 10, backgroundImage: '', description: 'Improve flexibility, strength, and control using only your body weight.' },
  { id: 'p3', nameKanji: '冥想', nameEnglish: 'Mind Forge', type: 'Zero-Equipment', difficulty: 1, durationMin: 20, workoutCount: 7, backgroundImage: '', description: 'Cultivate mental clarity and unwavering focus through guided meditation.' },
  { id: 'p4', nameKanji: '剛力', nameEnglish: 'Iron Warrior', type: 'Equipment', difficulty: 5, durationMin: 60, workoutCount: 20, backgroundImage: '', description: 'Forge an unbreakable physique with heavy lifts and functional strength.' },
];

export const mockMeals = [
  { id: 'm1', name: 'Warrior Bowl', image: '', macros: { protein: 40, carbs: 50, fat: 15 }, description: 'Grilled chicken, brown rice, and steamed vegetables.' },
  { id: 'm2', name: 'Zen Smoothie', image: '', macros: { protein: 25, carbs: 30, fat: 10 }, description: 'Spinach, banana, protein powder, and almond milk.' },
  { id: 'm3', name: 'Samurai Steak', image: '', macros: { protein: 50, carbs: 30, fat: 25 }, description: 'Lean steak with roasted sweet potatoes and asparagus.' },
];

export type ProgramType = typeof mockPrograms[0];
export type MealType = typeof mockMeals[0];

export const mockPactPartner = { id: 'partner1', name: 'Kenshin', avatar: '', sharedShieldProgress: 75, currentStreak: 25 };

export const mockPactHistory = [
  { date: '2023-10-26', workoutName: 'Blade Master (Day 7)', duration: '45 min' },
  { date: '2023-10-25', workoutName: 'Bodyweight Flow (Day 5)', duration: '30 min' },
  { date: '2023-10-24', workoutName: 'Mind Forge (Day 3)', duration: '20 min' },
];

export const mockLeaderboard = [
  { rank: 1, avatar: '', name: 'ShadowSensei', level: 10, streak: 50, honorPoints: 1250 },
  { rank: 2, avatar: '', name: 'IronFist', level: 9, streak: 45, honorPoints: 1100 },
  { rank: 3, avatar: '', name: 'CrimsonBlade', level: 9, streak: 40, honorPoints: 1050 },
  { rank: 4, avatar: '', name: 'ZenWarrior', level: 8, streak: 38, honorPoints: 980 },
  { rank: 5, avatar: '', name: 'SilentKiller', level: 8, streak: 35, honorPoints: 900 },
  { rank: 6, avatar: '', name: 'GhostWalker', level: 7, streak: 30, honorPoints: 850 },
  { rank: 7, avatar: '', name: 'ThunderFoot', level: 7, streak: 28, honorPoints: 800 },
  { rank: 8, avatar: '', name: 'NightFury', level: 6, streak: 25, honorPoints: 750 },
  { rank: 9, avatar: '', name: 'DragonHeart', level: 6, streak: 22, honorPoints: 700 },
  { rank: 10, avatar: '', name: 'CrimsonNinja', level: 5, streak: 20, honorPoints: 650 },
];

export const currentUserRank = 8;

export const mockStats = { strength: 80, speed: 70, spirit: 90, focus: 85, endurance: 75 };

export const mockSeason = { name: 'Autumn of Fury', progress: 60, remainingDays: 45, checkpoints: [25, 50, 75] };

export const mockEarnedMedals = [
  { id: 'm1', name: 'First Kill', earned: true, description: 'Completed your first training session.' },
  { id: 'm2', name: '7-Day Streak', earned: true, description: 'Maintained a training streak for 7 days.' },
  { id: 'm3', name: 'Iron Will', earned: true, description: 'Completed an Iron Warrior program.' },
  { id: 'm4', name: 'Zen Master', earned: false, description: 'Achieved 50 mindful meditation sessions.' },
  { id: 'm5', name: 'Hydration Lord', earned: false, description: 'Tracked 30 days of consistent 8-glass water intake.' },
  { id: 'm6', name: 'Apex Predator', earned: false, description: 'Reached max level in all stats.' },
  { id: 'm7', name: 'Unbreakable', earned: true, description: 'Completed 100 workouts without missing a day.' },
  { id: 'm8', name: 'Shadow Steps', earned: false, description: 'Achieved mastery in speed-focused programs.' },
  { id: 'm9', name: 'Battle Forged', earned: true, description: 'Completed 5 warrior pacts with different partners.' },
  { id: 'm10', name: 'Enlightened', earned: false, description: 'Spent 100 hours in Sensei chat.' },
  { id: 'm11', name: 'Eternal Flame', earned: false, description: 'Maintained a 365-day streak.' },
  { id: 'm12', name: 'Legendary Warrior', earned: false, description: 'Achieved all other achievements.' },
];

export const mockProgressStats = { workoutsCompleted: 120, totalHours: 75, currentStreak: 25 };

export const mockUserProfile = { avatar: '', username: 'NightFury', rank: 'Iron Fist', joinDate: 'Joined Oct 2022' };

export const mockLifetimeStats = { lifetimeWorkouts: 250, honorPoints: 1200, personalRecords: 15, totalHours: 150 };

export const mockPersonalRecords = [
  { exercise: 'Push-ups', record: '100 reps (max)', date: '2023-09-15' },
  { exercise: 'Pull-ups', record: '20 reps (max)', date: '2023-10-01' },
  { exercise: 'Squat', record: '120kg (1RM)', date: '2023-08-20' },
  { exercise: 'Running', record: '5km in 22:30', date: '2023-07-10' },
];

export const mockActiveProgram = { name: 'Blade Master', progress: 70, daysRemaining: 7 };

export const senseiQuotes = [
  "Mastery begins with discipline.",
  "The path of the warrior is endless.",
  "True strength lies within.",
  "Patience is your greatest weapon.",
  "Observe, adapt, overcome.",
];
