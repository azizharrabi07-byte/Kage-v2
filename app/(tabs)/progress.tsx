import React, { useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useFocusEffect, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KageText } from '@/components/ui/KageText';
import { KageButton } from '@/components/ui/KageButton';
import { PremiumCard } from '@/components/premium/PremiumCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ParticleBackground } from '@/components/cinematic/ParticleBackground';
import { RankBadge } from '@/components/progression/RankBadge';
import { HexChart } from '@/components/progression/HexChart';
import { SeasonTrack } from '@/components/progression/SeasonTrack';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { RecoveryHeatmap, RecoveryStats } from '@/components/recovery/RecoveryHeatmap';
import { useColors, spacing } from '@/theme';
import { getProgression, getRankByIndex, RANKS } from '@/store/progressionStore';
import { getWorkoutHistory } from '@/store/workoutStore';
import type { PlayerProgression } from '@/components/progression/types';
import type { WorkoutSession } from '@/store/types';

const achievements = [
  { icon: '🎯', label: 'First Strike', unlocked: true },
  { icon: '🔥', label: 'Week Warrior', unlocked: true },
  { icon: '🛡️', label: 'Iron Will', unlocked: true },
  { icon: '⚡', label: 'Pact Sealed', unlocked: false },
  { icon: '🧘', label: 'Zen Master', unlocked: false },
  { icon: '💎', label: 'Onyx Shield', unlocked: false },
];

export default function ProgressScreen() {
  const router = useRouter();
  const colors = useColors();
  const [prog, setProg] = useState<PlayerProgression | null>(null);
  const [history, setHistory] = useState<WorkoutSession[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(useCallback(() => { loadData(); }, []));

  async function loadData() {
    setProg(await getProgression());
    setHistory(await getWorkoutHistory());
    setLoading(false);
  }

  if (loading) return <SafeAreaView style={{ flex: 1, backgroundColor: colors.kage.void }}><LoadingSpinner message="Loading evolution..." /></SafeAreaView>;
  if (!prog) return null;
  const currentRank = getRankByIndex(prog.rankIndex);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.kage.void }]}>
      <ParticleBackground count={8} color={colors.accent.primary} maxOpacity={0.04} />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View entering={FadeInDown.delay(80).duration(600)} style={styles.header}>
          <KageText variant="mono" style={{ fontSize: 8, color: colors.accent.gold, letterSpacing: 3 }}>
            THE WARRIOR'S PATH
          </KageText>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
            <KageText variant="kanji" style={{ fontSize: 40, color: colors.accent.primary }}>昇</KageText>
            <KageText variant="h2" letterSpacing={4} style={{ color: '#FFFFFF' }}>EVOLUTION</KageText>
          </View>
        </Animated.View>

        {/* Rank Badge */}
        <Animated.View entering={FadeInDown.delay(160).duration(600)} style={{ alignItems: 'center', marginBottom: 16 }}>
          <RankBadge totalXP={prog.totalXP} size="md" />
        </Animated.View>

        {/* Season Track */}
        <Animated.View entering={FadeInDown.delay(220).duration(600)} style={{ paddingHorizontal: 16, marginBottom: 12 }}>
          <SeasonTrack
            currentXP={prog.totalXP}
            seasonStartXP={Math.max(0, (RANKS[Math.max(0, prog.rankIndex - 1)]?.xpRequired ?? 0))}
            seasonTargetXP={RANKS[Math.min(prog.rankIndex + 1, RANKS.length - 1)]?.xpRequired ?? 10000}
            seasonNumber={Math.floor(prog.level / 5) + 1}
            seasonName="Path of the Warrior"
          />
        </Animated.View>

        {/* Stats Grid */}
        <Animated.View entering={FadeInDown.delay(280).duration(600)} style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <GlassContainer accentTop accentColor={colors.accent.primary} padding={spacing.lg} style={{ borderRadius: 14 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              {[
                { label: 'XP', value: prog.totalXP, color: colors.accent.gold },
                { label: 'Level', value: prog.level, color: colors.status.recovery },
                { label: 'Workouts', value: prog.workoutsCompleted, color: colors.accent.primary },
                { label: 'Streak', value: prog.streak, color: colors.status.ready },
              ].map((s, i) => (
                <React.Fragment key={s.label}>
                  {i > 0 && <View style={{ width: 1, height: 30, backgroundColor: colors.kage.kachi }} />}
                  <View style={{ alignItems: 'center', gap: 2 }}>
                    <KageText variant="mono" style={{ fontSize: 20, color: s.color }}>{s.value}</KageText>
                    <KageText variant="mono" style={{ fontSize: 7, letterSpacing: 1, color: '#8E9EAF' }}>{s.label}</KageText>
                  </View>
                </React.Fragment>
              ))}
            </View>
          </GlassContainer>
        </Animated.View>

        {/* Hex Chart */}
        <Animated.View entering={FadeInDown.delay(340).duration(600)} style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <PremiumCard isLight={false} glowColor="rgba(201,168,76,0.1)" style={{ backgroundColor: colors.kage.sumi, padding: 16 }}>
            <KageText variant="mono" style={{ fontSize: 8, color: colors.accent.gold, letterSpacing: 2, marginBottom: 12 }}>
              WARRIOR ATTRIBUTES
            </KageText>
            <HexChart values={prog.xpMap || { strength: 0, discipline: 0, endurance: 0, focus: 0, recovery: 0 }} maxValue={Math.max(...Object.values(prog.xpMap || {}), 100)} />
          </PremiumCard>
        </Animated.View>

        {/* Achievements Grid */}
        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <PremiumCard isLight={false} glowColor="rgba(255,255,255,0.05)" style={{ backgroundColor: colors.kage.sumi, padding: 16 }}>
            <KageText variant="mono" style={{ fontSize: 8, color: colors.accent.gold, letterSpacing: 2, marginBottom: 12 }}>
              ACHIEVEMENTS
            </KageText>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {achievements.map((ach) => (
                <View
                  key={ach.label}
                  style={[
                    styles.achievementItem,
                    {
                      backgroundColor: ach.unlocked ? 'rgba(0,204,136,0.1)' : 'rgba(255,255,255,0.03)',
                      borderColor: ach.unlocked ? 'rgba(0,204,136,0.2)' : colors.kage.kachi,
                    },
                  ]}
                >
                  <KageText style={{ fontSize: 20, opacity: ach.unlocked ? 1 : 0.3 }}>{ach.icon}</KageText>
                  <KageText
                    variant="mono"
                    style={{
                      fontSize: 7,
                      color: ach.unlocked ? colors.status.ready : '#8E9EAF',
                      letterSpacing: 1,
                      marginTop: 4,
                    }}
                  >
                    {ach.label}
                  </KageText>
                </View>
              ))}
            </View>
          </PremiumCard>
        </Animated.View>

        {/* Recovery */}
        <Animated.View entering={FadeInDown.delay(460).duration(600)} style={{ paddingHorizontal: 16, marginBottom: 12 }}>
          <GlassContainer accentTop accentColor={colors.accent.gold} padding={spacing.lg} style={{ borderRadius: 14 }}>
            <KageText variant="mono" style={{ fontSize: 8, color: colors.accent.gold, letterSpacing: 2, marginBottom: 12 }}>
              RECOVERY HEATMAP
            </KageText>
            <RecoveryHeatmap />
          </GlassContainer>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(520).duration(600)} style={{ paddingHorizontal: 16, marginBottom: 12 }}>
          <RecoveryStats />
        </Animated.View>

        {/* Rank Progression */}
        <Animated.View entering={FadeInDown.delay(580).duration(600)} style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <PremiumCard isLight={false} glowColor="rgba(255,255,255,0.05)" style={{ backgroundColor: colors.kage.sumi, padding: 16 }}>
            <KageText variant="mono" style={{ fontSize: 8, color: colors.accent.gold, letterSpacing: 2, marginBottom: 12 }}>
              RANK PROGRESSION
            </KageText>
            {RANKS.map((rank) => {
              const unlocked = prog.totalXP >= rank.xpRequired;
              const isCurrent = currentRank.id === rank.id;
              return (
                <View key={rank.id} style={[
                  styles.rankRow,
                  {
                    backgroundColor: isCurrent ? 'rgba(200,16,46,0.08)' : 'transparent',
                    borderColor: isCurrent ? colors.accent.primary : 'transparent',
                  },
                ]}>
                  <View style={[styles.rankDot, { backgroundColor: unlocked ? rank.color : colors.kage.kachi }]} />
                  <View style={{ flex: 1 }}>
                    <KageText variant="bodyBold" style={{ fontSize: 11, color: unlocked ? '#FFFFFF' : '#8E9EAF' }}>{rank.name}</KageText>
                    <KageText variant="mono" style={{ fontSize: 8, color: '#8E9EAF' }}>{rank.kanji} · {rank.xpRequired.toLocaleString()} XP</KageText>
                  </View>
                  {unlocked && (
                    <KageText variant="mono" style={{ fontSize: 8, color: colors.status.ready, letterSpacing: 1 }}>
                      MASTERED
                    </KageText>
                  )}
                </View>
              );
            })}
          </PremiumCard>
        </Animated.View>

        {/* Navigation */}
        <Animated.View entering={FadeInDown.delay(640).duration(600)} style={{ paddingHorizontal: 16, marginBottom: 12, gap: 8 }}>
          <KageButton title="VIEW PERSONAL RECORDS" variant="gold" size="sm" fullWidth onPress={() => router.push('/prs')} />
          <KageButton title="VIEW FULL HISTORY" variant="outline" size="sm" fullWidth onPress={() => router.push('/history')} />
          <KageButton title="LOG BODY MEASUREMENTS" variant="outline" size="sm" fullWidth onPress={() => router.push('/measurements')} />
        </Animated.View>

        {/* Recent Workouts */}
        {history.length > 0 && (
          <Animated.View entering={FadeInDown.delay(700).duration(600)} style={{ paddingHorizontal: 16, marginBottom: 24 }}>
            <PremiumCard isLight={false} glowColor="rgba(255,255,255,0.05)" style={{ backgroundColor: colors.kage.sumi, padding: 16 }}>
              <KageText variant="mono" style={{ fontSize: 8, color: colors.accent.gold, letterSpacing: 2, marginBottom: 12 }}>
                RECENT WORKOUTS
              </KageText>
              {history.slice(0, 5).map((w) => (
                <View key={w.id} style={styles.historyRow}>
                  <KageText variant="kanji" style={{ fontSize: 16, color: colors.accent.primary, width: 28 }}>{w.kanji}</KageText>
                  <View style={{ flex: 1 }}>
                    <KageText variant="bodyBold" style={{ fontSize: 11, color: '#FFFFFF' }}>{w.name}</KageText>
                    <KageText variant="mono" style={{ fontSize: 8, color: '#8E9EAF' }}>{new Date(w.startedAt).toLocaleDateString()}</KageText>
                  </View>
                  <KageText variant="mono" style={{ fontSize: 12, color: colors.accent.gold }}>+{w.totalXP}</KageText>
                </View>
              ))}
            </PremiumCard>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { alignItems: 'center', paddingVertical: 24 },
  achievementItem: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  rankRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 6, paddingHorizontal: 8, borderRadius: 8,
    borderWidth: 1, borderColor: 'transparent',
    marginBottom: 2,
  },
  rankDot: { width: 8, height: 8, borderRadius: 4 },
  historyRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 6,
    borderBottomWidth: 1, borderBottomColor: colors?.kage?.kachi || 'rgba(255,255,255,0.05)',
  },
});
