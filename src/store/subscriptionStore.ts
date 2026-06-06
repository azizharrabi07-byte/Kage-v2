import AsyncStorage from '@react-native-async-storage/async-storage';

const SUB_KEY = '@kage_subscription';

export type SubscriptionTier = 'free' | 'annual' | 'lifetime';

interface SubscriptionState {
  tier: SubscriptionTier;
  expiresAt: string | null;
  purchasedAt: string | null;
}

const DEFAULT: SubscriptionState = {
  tier: 'free',
  expiresAt: null,
  purchasedAt: null,
};

const FEATURES: Record<SubscriptionTier, string[]> = {
  free: ['Basic workouts', '1 Warrior Pact', '3 ranks (Ronin → Crimson Samurai)', 'Basic Sensei quotes'],
  annual: ['All workouts', '5 Warrior Pacts', 'All 5 ranks (→ Ascended Shogun)', 'Sensei AI chat', 'All diet plans', 'Battle Cry priority', '$29.99/year'],
  lifetime: ['Everything forever', 'Onyx shield prestige', 'Founder badge', 'Early access features', '$79.99 one-time'],
};

async function getState(): Promise<SubscriptionState> {
  try {
    const raw = await AsyncStorage.getItem(SUB_KEY);
    return raw ? JSON.parse(raw) : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

async function setState(s: SubscriptionState): Promise<void> {
  await AsyncStorage.setItem(SUB_KEY, JSON.stringify(s));
}

export function hasFeature(tier: SubscriptionTier, feature: string): boolean {
  const features = FEATURES[tier];
  return features.some((f) => feature.toLowerCase().includes(f.toLowerCase()));
}

export function isTierAtLeast(current: SubscriptionTier, minimum: SubscriptionTier): boolean {
  const order: SubscriptionTier[] = ['free', 'annual', 'lifetime'];
  return order.indexOf(current) >= order.indexOf(minimum);
}

export async function getSubscription(): Promise<{ tier: SubscriptionTier; features: string[] }> {
  const state = await getState();
  if (state.tier === 'annual' && state.expiresAt && new Date(state.expiresAt) < new Date()) {
    state.tier = 'free';
    await setState(state);
  }
  return { tier: state.tier, features: FEATURES[state.tier] };
}

export async function purchaseTier(tier: 'annual' | 'lifetime'): Promise<void> {
  const expiresAt = tier === 'annual'
    ? new Date(Date.now() + 365 * 86400000).toISOString()
    : null;
  await setState({
    tier,
    expiresAt,
    purchasedAt: new Date().toISOString(),
  });
}

export async function restorePurchases(): Promise<void> {
  const state = await getState();
  if (state.tier !== 'free' && state.expiresAt && new Date(state.expiresAt) > new Date()) {
    return;
  }
  await setState(DEFAULT);
}

export { FEATURES };
