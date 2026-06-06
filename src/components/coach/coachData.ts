export type CoachContext = 'greeting' | 'workout_start' | 'workout_complete' | 'set_complete' | 'lock_in' | 'lock_in_complete' | 'streak' | 'motivation' | 'recovery' | 'idle';

interface CoachMessage {
  text: string;
  context: CoachContext;
  weight?: number;
}

export const coachMessages: CoachMessage[] = [
  // Greetings
  { text: 'Another day, another step toward awakening.', context: 'greeting' },
  { text: 'The dojo awaits. Discipline shapes the warrior.', context: 'greeting' },
  { text: 'Your journey continues. The shadow grows stronger.', context: 'greeting' },
  { text: 'The path of the warrior begins with a single step.', context: 'greeting' },

  // Workout start
  { text: 'The body achieves what the mind believes.', context: 'workout_start' },
  { text: 'There is no growth in the comfort zone.', context: 'workout_start' },
  { text: 'Today\'s pain is tomorrow\'s power.', context: 'workout_start' },
  { text: 'Steel yourself. The trial begins.', context: 'workout_start' },

  // Workout complete
  { text: 'Discipline is the bridge between goals and accomplishment.', context: 'workout_complete' },
  { text: 'The pain you feel today is the strength you feel tomorrow.', context: 'workout_complete' },
  { text: 'You have sharpened your blade. Rest well, warrior.', context: 'workout_complete' },
  { text: 'Another step on the path. Your evolution continues.', context: 'workout_complete' },

  // Set complete
  { text: 'Focus. Breath. Control.', context: 'set_complete' },
  { text: 'The spirit grows stronger with each rep.', context: 'set_complete' },
  { text: 'Your consistency sharpens your evolution.', context: 'set_complete' },
  { text: 'One rep closer to your awakening.', context: 'set_complete' },

  // Lock-in
  { text: 'Clear your mind. Find your center.', context: 'lock_in' },
  { text: 'In silence, the warrior finds strength.', context: 'lock_in' },
  { text: 'Focus is the weapon of the disciplined.', context: 'lock_in' },
  { text: 'The mind must be as sharp as the blade.', context: 'lock_in' },

  // Lock-in complete
  { text: 'A focused mind is a powerful weapon.', context: 'lock_in_complete' },
  { text: 'Your discipline grows with every session.', context: 'lock_in_complete' },
  { text: 'The shadow deepens. Your focus sharpens.', context: 'lock_in_complete' },

  // Streak
  { text: 'Consistency is the mark of a true warrior.', context: 'streak' },
  { text: 'Your streak is your discipline made visible.', context: 'streak' },
  { text: 'The path is long. Your dedication honors it.', context: 'streak' },

  // Motivation
  { text: 'Fall down seven times, stand up eight.', context: 'motivation' },
  { text: 'Your only limit is the one you place on yourself.', context: 'motivation' },
  { text: 'The warrior\'s spirit cannot be broken.', context: 'motivation' },
  { text: 'What lies behind us is nothing compared to what lies ahead.', context: 'motivation' },

  // Recovery
  { text: 'Fatigue detected. Recovery is necessary for growth.', context: 'recovery' },
  { text: 'Rest is part of the training. The body rebuilds.', context: 'recovery' },
  { text: 'A wise warrior knows when to rest.', context: 'recovery' },
  { text: 'Recovery is not weakness. It is preparation.', context: 'recovery' },
];

export function getCoachMessage(context: CoachContext, streak?: number): string {
  const messages = coachMessages.filter((m) => m.context === context);
  if (messages.length === 0) {
    const fallback = coachMessages.filter((m) => m.context === 'motivation');
    return fallback[Math.floor(Math.random() * fallback.length)].text;
  }
  return messages[Math.floor(Math.random() * messages.length)].text;
}

export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Morning training sharpens the spirit.';
  if (hour < 17) return 'The sun is high. So is your discipline.';
  return 'Evening falls. The shadow grows. Train on.';
}