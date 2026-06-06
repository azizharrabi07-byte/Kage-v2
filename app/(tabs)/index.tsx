import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  withSequence,
  withRepeat,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { KageText } from '@/components/ui/KageText';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ParticleBackground } from '@/components/cinematic/ParticleBackground';
import { PremiumCard } from '@/components/premium/PremiumCard';
import { TiltCard3D } from '@/components/premium/TiltCard3D';
import { ShadowPath } from '@/components/premium/ShadowPath';
import { useColors, useTheme, IMAGES } from '@/theme';
import { getProgression } from '@/store/progressionStore';
import { useWarriorPactStore } from '@/store/warriorPactStore';
import { playSound } from '@/utils/sound';
import type { PlayerProgression } from '@/components/progression/types';

const { width } = Dimensions.get('window');

const senseiProverbs = [
  "Choose the heavy path, warrior. Sleep is sweet, but triumph lasts ages.",
  "Steel is forged on the anvil of raw fatigue. Respect the sweat.",
  "A warrior looks in the glass and sees only an unfinished sword. Stay humble.",
  "Water wears down raw diamond by sheer repetitious impacts. Repeat the training!",
];

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const [prog, setProg] = useState<PlayerProgression | null>(null);
  const [loading, setLoading] = useState(true);
  const { mode, toggleTheme } = useTheme();
  const [streak, setStreak] = useState(15);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [achievementPercent, setAchievementPercent] = useState(42);
  const { activeBattleCry, loadPacts } = useWarriorPactStore();

  useEffect(() => {
    getProgression().then((p) => { setProg(p); setLoading(false); });
    loadPacts();
  }, []);

  const isParchment = mode === 'light';

  // Entry animations
  const headerOpacity = useSharedValue(0);
  const logotypeScale = useSharedValue(0.8);
  const contentOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(30);

  useEffect(() => {
    headerOpacity.value = withDelay(400, withTiming(1, { duration: 600 }));
    logotypeScale.value = withDelay(600, withTiming(1, { duration: 800, easing: Easing.out(Easing.back) }));
    contentOpacity.value = withDelay(1000, withTiming(1, { duration: 500 }));
    contentTranslateY.value = withDelay(1000, withTiming(0, { duration: 500, easing: Easing.out(Easing.ease) }));
  }, []);

  const animatedHeader = useAnimatedStyle(() => ({ opacity: headerOpacity.value }));
  const animatedLogo = useAnimatedStyle(() => ({ transform: [{ scale: logotypeScale.value }] }));
  const animatedContent = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: contentTranslateY.value }],
  }));

  // Flame animation
  const flameBounce = useSharedValue(0);
  useEffect(() => {
    flameBounce.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 600, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 600, easing: Easing.inOut(Easing.ease) }),
      ),
      -1, true,
    );
  }, []);

  const flameStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: flameBounce.value }],
  }));

  if (loading) return <ScreenContainer><LoadingSpinner message="Awakening..." /></ScreenContainer>;

  const bgColor = isParchment ? colors.kage.parchment : colors.kage.void;

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <ParticleBackground count={12} color={colors.accent.primary} maxOpacity={0.06} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Header Status */}
          <Animated.View style={[styles.header, animatedHeader]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View style={[styles.statusDot, { backgroundColor: colors.accent.primary }]} />
              <KageText
                variant="mono"
                style={{ fontSize: 9, color: '#8E9EAF', letterSpacing: 2 }}
              >
                DOJO_STATUS: ONLINE
              </KageText>
            </View>
          </Animated.View>

          {/* Hero Image Background */}
          <View style={styles.heroContainer}>
            <Image
              source={isParchment ? IMAGES.bgSamuraiLight : IMAGES.bgSamurai}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={[styles.heroOverlay, { backgroundColor: isParchment ? 'rgba(234,228,215,0.5)' : 'rgba(11,11,16,0.6)' }]} />
          </View>

          {/* Theme Pill Toggle */}
          <View style={styles.pillRow}>
            <View
              style={[
                styles.pillContainer,
                {
                  backgroundColor: isParchment ? 'rgba(0,0,0,0.06)' : 'rgba(26,26,36,0.8)',
                  borderColor: isParchment ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.05)',
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => { playSound('click'); if (mode !== 'dark') toggleTheme(); }}
                style={[
                  styles.pill,
                  mode === 'dark' && {
                    backgroundColor: 'rgba(227,30,36,0.4)',
                    borderColor: colors.accent.primary,
                  },
                ]}
              >
                <View style={[styles.pillDot, { backgroundColor: colors.accent.primary }]} />
                <KageText
                  variant="mono"
                  style={{
                    fontSize: 8,
                    fontWeight: '700',
                    color: mode === 'dark' ? colors.text.primary : colors.text.muted,
                    letterSpacing: 1,
                  }}
                >
                  影 RED SUN
                </KageText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => { playSound('click'); if (mode !== 'light') toggleTheme(); }}
                style={[
                  styles.pill,
                  mode === 'light' && {
                    backgroundColor: 'rgba(120,100,80,0.4)',
                    borderColor: '#8B7355',
                  },
                ]}
              >
                <View style={[styles.pillDot, { backgroundColor: '#A09080' }]} />
                <KageText
                  variant="mono"
                  style={{
                    fontSize: 8,
                    fontWeight: '700',
                    color: mode === 'light' ? colors.text.primary : colors.text.muted,
                    letterSpacing: 1,
                  }}
                >
                  墨 PARCHMENT
                </KageText>
              </TouchableOpacity>
            </View>
          </View>

          {/* KAGE Logotype */}
          <Animated.View style={[styles.logoRow, animatedLogo]}>
            <View
              style={[
                styles.logoBadge,
                {
                  backgroundColor: isParchment ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.6)',
                  borderColor: isParchment ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.1)',
                },
              ]}
            >
              <KageText
                variant="kanji"
                style={{
                  fontSize: 10,
                  color: isParchment ? '#B91C1C' : colors.accent.primary,
                  letterSpacing: 2,
                }}
              >
                家庭
              </KageText>
              <View style={[styles.logoDot, { backgroundColor: isParchment ? '#B91C1C' : colors.accent.primary }]} />
              <KageText
                variant="mono"
                style={{ fontSize: 8, color: 'rgba(255,255,255,0.6)', letterSpacing: 2 }}
              >
                V2 PREMIUM DOJO
              </KageText>
            </View>
          </Animated.View>

          {/* Main Content */}
          <Animated.View style={[styles.content, animatedContent]}>
            {/* Streak Flame Banner with 3D Tilt */}
            <TiltCard3D tiltAmount={4}>
            <PremiumCard
              isLight={isParchment}
              glowColor="rgba(232,122,93,0.3)"
              style={[
                styles.streakCard,
                isParchment
                  ? { backgroundColor: colors.kage.parchmentCard, borderColor: '#C2B7A0' }
                  : { backgroundColor: colors.kage.sumi },
              ]}
              onPress={() => { playSound('clash'); setStreak((s) => s + 1); }}
            >
              <View style={styles.streakInner}>
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <KageText
                      variant="mono"
                      style={{
                        fontSize: 9,
                        color: isParchment ? colors.text.accent : colors.accent.primary,
                        letterSpacing: 2,
                      }}
                    >
                      WARRIOR'S FIRE
                    </KageText>
                    <View
                      style={[
                        styles.activeBadge,
                        {
                          backgroundColor: isParchment ? 'rgba(185,28,28,0.1)' : 'rgba(255,107,107,0.1)',
                          borderColor: isParchment ? 'rgba(185,28,28,0.2)' : 'rgba(255,107,107,0.2)',
                        },
                      ]}
                    >
                      <KageText
                        variant="mono"
                        style={{
                          fontSize: 7,
                          color: isParchment ? colors.text.accent : colors.accent.primary,
                        }}
                      >
                        ACTIVE STATE
                      </KageText>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
                    <KageText
                      variant="display"
                      style={{
                        fontSize: 36,
                        fontWeight: '800',
                        color: isParchment ? colors.text.primary : colors.accent.primary,
                      }}
                    >
                      {streak}
                    </KageText>
                    <KageText
                      variant="kanji"
                      style={{
                        fontSize: 12,
                        color: isParchment ? '#6B5B4E' : '#8E9EAF',
                      }}
                    >
                      DAYS
                    </KageText>
                  </View>
                  <KageText
                    variant="body"
                    style={{
                      fontSize: 10,
                      color: isParchment ? '#6B5B4E' : '#8E9EAF',
                      marginTop: 4,
                    }}
                  >
                    Tap the card to feed your inner furnace.
                  </KageText>
                </View>

                <Animated.View style={[styles.flameContainer, flameStyle]}>
                  <View
                    style={[
                      styles.flameGlow,
                      {
                        backgroundColor: isParchment ? 'rgba(185,28,28,0.1)' : 'rgba(227,30,36,0.15)',
                      },
                    ]}
                  />
                  <KageText style={{ fontSize: 36 }}>🔥</KageText>
                </Animated.View>
              </View>
            </PremiumCard>
            </TiltCard3D>

            {/* BEGIN TRAINING Button */}
            <View style={styles.beginContainer}>
              <TouchableOpacity
                onPress={() => { playSound('zen'); router.push('/workout'); }}
                style={[
                  styles.beginButton,
                  isParchment
                    ? { backgroundColor: '#1A1A2E', borderColor: '#2A2A3E' }
                    : {
                        backgroundColor: colors.accent.primary,
                        borderColor: 'rgba(227,30,36,0.3)',
                        shadowColor: 'rgba(227,30,36,0.6)',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.5,
                        shadowRadius: 16,
                        elevation: 10,
                      },
                ]}
              >
                <KageText
                  variant="mono"
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: '#FFFFFF',
                    letterSpacing: 4,
                  }}
                >
                  BEGIN TRAINING
                </KageText>
              </TouchableOpacity>
              <KageText
                variant="mono"
                style={{
                  fontSize: 8,
                  color: isParchment ? '#8B7355' : '#8E9EAF',
                  textAlign: 'center',
                  marginTop: 8,
                  letterSpacing: 2,
                }}
              >
                TODAY'S ORDER: 鉄体 IRON PHYSICAL (45 MIN)
              </KageText>
            </View>

            {/* Warrior Pact + Battle Cry Row */}
            <View style={styles.gridRow}>
              <PremiumCard
                isLight={isParchment}
                glowColor="rgba(45,156,110,0.2)"
                style={[
                  styles.gridHalf,
                  isParchment
                    ? { backgroundColor: colors.kage.parchmentCard }
                    : { backgroundColor: colors.kage.sumi },
                ]}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <KageText
                    variant="mono"
                    style={{ fontSize: 8, color: isParchment ? '#6B5B4E' : '#8E9EAF', letterSpacing: 2 }}
                  >
                    BLOOD PACT
                  </KageText>
                  <KageText style={{ fontSize: 14 }}>🛡️</KageText>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 }}>
                  <KageText style={{ fontSize: 20 }}>🧬</KageText>
                  <View>
                    <KageText
                      variant="bodyBold"
                      style={{
                        fontSize: 11,
                        color: colors.text.primary,
                      }}
                    >
                      Kazuma #8821
                    </KageText>
                    <KageText
                      variant="mono"
                      style={{
                        fontSize: 9,
                        color: isParchment ? '#065F46' : '#22D3EE',
                      }}
                    >
                      Streak: 15d
                    </KageText>
                  </View>
                </View>
              </PremiumCard>

              <TouchableOpacity
                onPress={() => router.push('/battle-cry')}
                style={[
                  styles.battleCryCard,
                  isParchment
                    ? { backgroundColor: colors.kage.parchmentCard, borderColor: '#B91C1C' }
                    : { backgroundColor: colors.kage.sumi, borderColor: colors.accent.primary },
                ]}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <KageText
                    variant="mono"
                    style={{
                      fontSize: 8,
                      color: isParchment ? colors.text.accent : colors.accent.primary,
                      letterSpacing: 2,
                    }}
                  >
                    ALERT NETWORK
                  </KageText>
                  <View style={[styles.battleCryDot, { backgroundColor: colors.accent.primary }]} />
                </View>
                <KageText
                  variant="bodyBold"
                  style={{
                    fontSize: 11,
                    color: colors.text.primary,
                    marginTop: 8,
                  }}
                >
                  ⚡ BATTLE CRY!
                </KageText>
                <KageText
                  variant="body"
                  style={{
                    fontSize: 8,
                    color: isParchment ? '#6B5B4E' : '#8E9EAF',
                    marginTop: 4,
                    numberOfLines: 1,
                  }}
                  numberOfLines={1}
                >
                  CRUSH THE MIDWEEK WEAKNESS
                </KageText>
              </TouchableOpacity>
            </View>

            {/* Sensei Widget */}
            <TouchableOpacity
              onPress={() => setCurrentTipIndex((i) => (i + 1) % senseiProverbs.length)}
              style={[
                styles.senseiWidget,
                isParchment
                  ? { backgroundColor: colors.kage.parchmentCard, borderColor: 'rgba(185,28,28,0.2)' }
                  : {
                      backgroundColor: colors.kage.sumi,
                      borderColor: 'rgba(34,211,238,0.15)',
                    },
              ]}
            >
              <View style={styles.senseiAvatar}>
                <View
                  style={[
                    styles.senseiGlow,
                    {
                      backgroundColor: isParchment ? 'rgba(185,28,28,0.1)' : 'rgba(34,211,238,0.1)',
                    },
                  ]}
                />
                <KageText style={{ fontSize: 28 }}>🧘</KageText>
                <View
                  style={[
                    styles.senseiOnlineDot,
                    {
                      backgroundColor: isParchment ? '#B91C1C' : '#22D3EE',
                    },
                  ]}
                />
              </View>
              <View style={{ flex: 1 }}>
                <KageText
                  variant="mono"
                  style={{
                    fontSize: 8,
                    color: isParchment ? '#B91C1C' : '#22D3EE',
                    letterSpacing: 2,
                  }}
                >
                  SENSEI ANCIENT COUNSEL
                </KageText>
                <KageText
                  variant="body"
                  style={{
                    fontSize: 10,
                    fontStyle: 'italic',
                    color: isParchment ? '#3A2E25' : '#D1D5DB',
                    marginTop: 4,
                    lineHeight: 16,
                  }}
                >
                  "{senseiProverbs[currentTipIndex]}"
                </KageText>
              </View>
            </TouchableOpacity>

            {/* Achievements Milestone */}
            <View style={styles.achievementSection}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <KageText
                  variant="mono"
                  style={{ fontSize: 9, color: '#8E9EAF', letterSpacing: 2 }}
                >
                  NEXT MILESTONE
                </KageText>
                <KageText
                  variant="mono"
                  style={{ fontSize: 9, color: colors.accent.gold }}
                >
                  {achievementPercent}% OVERALL
                </KageText>
              </View>
              <PremiumCard
                isLight={isParchment}
                style={[
                  isParchment
                    ? { backgroundColor: colors.kage.parchmentCard }
                    : { backgroundColor: colors.kage.sumi },
                ]}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <KageText style={{ fontSize: 20 }}>🛡️</KageText>
                    <View>
                      <KageText
                        variant="bodyBold"
                        style={{
                          fontSize: 11,
                          color: colors.text.primary,
                        }}
                      >
                        Golden Pact Seal
                      </KageText>
                      <KageText
                        variant="body"
                        style={{
                          fontSize: 9,
                          color: isParchment ? '#6B5B4E' : '#8E9EAF',
                        }}
                      >
                        Shared joint days count: 22 / 30 workouts
                      </KageText>
                    </View>
                  </View>
                  <KageText
                    variant="mono"
                    style={{ fontSize: 9, color: '#8E9EAF' }}
                  >
                    STAGE 4
                  </KageText>
                </View>
                <View
                  style={[
                    styles.progressBar,
                    { backgroundColor: isParchment ? 'rgba(0,0,0,0.1)' : '#0B0B10' },
                  ]}
                >
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: '73%',
                        backgroundColor: colors.accent.primary,
                      },
                    ]}
                  />
                </View>
              </PremiumCard>
            </View>

            {/* Shadow Path */}
            <ShadowPath />
          </Animated.View>

          <View style={{ height: 100 }} />
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 20 },
  safeArea: { flex: 1, paddingHorizontal: 16 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  pillRow: { alignItems: 'center', marginTop: 8 },
  pillContainer: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 100,
    borderWidth: 1,
    gap: 4,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  pillDot: { width: 6, height: 6, borderRadius: 3 },
  logoRow: { alignItems: 'center', marginTop: 16, marginBottom: 8 },
  logoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    borderWidth: 1,
  },
  logoDot: { width: 4, height: 4, borderRadius: 2 },
  content: { gap: 16 },
  streakCard: { padding: 16 },
  streakInner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  activeBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, borderWidth: 1 },
  flameContainer: { width: 60, height: 60, alignItems: 'center', justifyContent: 'center' },
  flameGlow: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  beginContainer: { marginTop: 4 },
  beginButton: {
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  gridRow: { flexDirection: 'row', gap: 12 },
  gridHalf: { flex: 1, padding: 12 },
  battleCryCard: {
    flex: 1,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  battleCryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  senseiWidget: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  senseiAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  senseiGlow: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  senseiOnlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#0B0B10',
  },
  achievementSection: { marginTop: 8 },
  progressBar: { height: 6, borderRadius: 100, overflow: 'hidden', marginTop: 12 },
  progressFill: { height: '100%', borderRadius: 100 },
  heroContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
});
