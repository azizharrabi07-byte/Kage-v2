import AsyncStorage from '@react-native-async-storage/async-storage';

const WATER_KEY = '@kage_water';
const MEALS_KEY = '@kage_meals';

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface DayNutrition {
  date: string;
  waterGlasses: number;
  meals: Meal[];
}

const MEAL_PLANS: Record<string, { label: string; meals: Omit<Meal, 'id' | 'time'>[]; macros: { calories: number; protein: number; carbs: number; fat: number } }> = {
  shred: {
    label: 'SHRED',
    macros: { calories: 2000, protein: 160, carbs: 180, fat: 60 },
    meals: [
      { name: 'Warrior Sunrise', calories: 400, protein: 30, carbs: 40, fat: 12, type: 'breakfast' },
      { name: 'Samurai Bowl', calories: 550, protein: 45, carbs: 50, fat: 18, type: 'lunch' },
      { name: 'Shadow Feast', calories: 600, protein: 50, carbs: 55, fat: 20, type: 'dinner' },
      { name: 'Ninja Bites', calories: 200, protein: 15, carbs: 20, fat: 6, type: 'snack' },
      { name: 'Recovery Shake', calories: 250, protein: 20, carbs: 15, fat: 4, type: 'snack' },
    ],
  },
  bulk: {
    label: 'BULK',
    macros: { calories: 3000, protein: 200, carbs: 350, fat: 80 },
    meals: [
      { name: 'Dawn Feast', calories: 650, protein: 45, carbs: 75, fat: 15, type: 'breakfast' },
      { name: 'Ronin Plate', calories: 800, protein: 55, carbs: 90, fat: 22, type: 'lunch' },
      { name: 'Emperor\'s Dinner', calories: 900, protein: 65, carbs: 100, fat: 28, type: 'dinner' },
      { name: 'Power Cubes', calories: 350, protein: 20, carbs: 45, fat: 8, type: 'snack' },
      { name: 'Muscle Brew', calories: 300, protein: 15, carbs: 40, fat: 7, type: 'snack' },
    ],
  },
  maintain: {
    label: 'MAINTAIN',
    macros: { calories: 2400, protein: 180, carbs: 250, fat: 65 },
    meals: [
      { name: 'Rise & Shine', calories: 500, protein: 35, carbs: 55, fat: 14, type: 'breakfast' },
      { name: 'Dojo Plate', calories: 650, protein: 50, carbs: 65, fat: 18, type: 'lunch' },
      { name: 'Twilight Meal', calories: 750, protein: 55, carbs: 75, fat: 20, type: 'dinner' },
      { name: 'Shadow Snack', calories: 250, protein: 20, carbs: 25, fat: 7, type: 'snack' },
      { name: 'Evening Tea', calories: 250, protein: 20, carbs: 30, fat: 6, type: 'snack' },
    ],
  },
};

async function getTodayData(): Promise<DayNutrition> {
  const today = new Date().toISOString().split('T')[0];
  try {
    const raw = await AsyncStorage.getItem(`${MEALS_KEY}_${today}`);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { date: today, waterGlasses: 0, meals: [] };
}

export async function getWater(): Promise<number> {
  const data = await getTodayData();
  return data.waterGlasses;
}

export async function setWater(glasses: number): Promise<void> {
  const data = await getTodayData();
  data.waterGlasses = Math.max(0, Math.min(glasses, 12));
  await AsyncStorage.setItem(`${MEALS_KEY}_${data.date}`, JSON.stringify(data));
}

export async function getMeals(): Promise<Meal[]> {
  const data = await getTodayData();
  return data.meals;
}

export async function addMeal(meal: Omit<Meal, 'id'>): Promise<void> {
  const data = await getTodayData();
  data.meals.push({ ...meal, id: `meal_${Date.now()}` });
  await AsyncStorage.setItem(`${MEALS_KEY}_${data.date}`, JSON.stringify(data));
}

export async function removeMeal(id: string): Promise<void> {
  const data = await getTodayData();
  data.meals = data.meals.filter((m) => m.id !== id);
  await AsyncStorage.setItem(`${MEALS_KEY}_${data.date}`, JSON.stringify(data));
}

export function getMacroTotals(meals: Meal[]) {
  return meals.reduce(
    (acc, m) => ({
      calories: acc.calories + m.calories,
      protein: acc.protein + m.protein,
      carbs: acc.carbs + m.carbs,
      fat: acc.fat + m.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );
}

export function getMealPlan(key: string) {
  return MEAL_PLANS[key] || MEAL_PLANS.maintain;
}

export async function applyMealPlan(key: string): Promise<void> {
  const plan = getMealPlan(key);
  const data = await getTodayData();
  const hours = new Date().getHours();
  const timeSlots = ['06:00', '12:00', '18:00', '15:00', '20:00'];

  data.meals = plan.meals.map((m, i) => ({
    ...m,
    id: `plan_${Date.now()}_${i}`,
    time: timeSlots[i] || `${9 + i * 3}:00`,
  }));
  await AsyncStorage.setItem(`${MEALS_KEY}_${data.date}`, JSON.stringify(data));
}

export { MEAL_PLANS };
