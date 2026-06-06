import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useFocusEffect, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KageText } from '@/components/ui/KageText';
import { PremiumCard } from '@/components/premium/PremiumCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Sensei } from '@/components/coach/Sensei';
import { ParticleBackground } from '@/components/cinematic/ParticleBackground';
import { useColors, useTheme } from '@/theme';
import { playSound } from '@/utils/sound';
import { getProgression } from '@/store/progressionStore';
import { getWorkoutHistory } from '@/store/workoutStore';
import type { PlayerProgression } from '@/components/progression/types';
import type { WorkoutSession } from '@/store/types';

export default function ProfileScreen() {
  const colors = useColors();
  const { mode, toggleTheme } = useTheme();
  const router = useRouter();
  const [prog, setProg] = useState<PlayerProgression | null>(null);
  const [history, setHistory] = useState<WorkoutSession[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(useCallback(() => { loadData(); }, []));

  async function loadData() {
    setProg(await getProgression());
    setHistory(await getWorkoutHistory());
    setLoading(false);
  }

  if (loading) return <SafeAreaView style={{ flex: 1, backgroundColor: colors.kage.void }}><LoadingSpinner message="Loading your story..." /></SafeAreaView>;

  const stats = [
    { label: 'Total XP', value: prog?.totalXP ?? 0, color: colors.accent.gold },
    { label: 'Level', value: prog?.level ?? 1, color: colors.status.recovery },
    { label: 'Workouts', value: prog?.workoutsCompleted ?? 0, color: colors.accent.primary },
    { label: 'Streak', value: prog?.streak ?? 0, color: colors.status.ready },
    { label: 'Lock-In', value: prog?.lockInSessions ?? 0, color: colors.accent.neon },
    { label: 'Rank', value: (prog?.rankIndex ?? 0) + 1, color: colors.accent.gold },
  ];

  const attrs = [
    { label: 'Strength', value: prog?.xpMap?.strength ?? 0, color: colors.accent.primary },
    { label: 'Discipline', value: prog?.xpMap?.discipline ?? 0, color: colors.status.ready },
    { label: 'Endurance', value: prog?.xpMap?.endurance ?? 0, color: colors.accent.gold },
    { label: 'Focus', value: prog?.xpMap?.focus ?? 0, color: colors.status.recovery },
    { label: 'Recovery', value: prog?.xpMap?.recovery ?? 0, color: colors.accent.neon },
  ];

  const maxAttr = Math.max(...attrs.map((a) => a.value), 1);
  const isParchment = mode === 'light';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.kage.void }]}>
      <ParticleBackground count={6} color={colors.accent.primary} maxOpacity={0.04} />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Soul Card */}
        <Animated.View entering={FadeInDown.delay(80).duration(600)} style={styles.header}>
          <KageText variant="mono" style={{ fontSize: 8, color: colors.accent.gold, letterSpacing: 3, marginBottom: 8 }}>
            THE STORY OF A WARRIOR
          </KageText>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
            <KageText variant="kanji" style={{ fontSize: 40, color: colors.accent.primary }}>魂</KageText>
            <KageText variant="h2" letterSpacing={4} style={{ color: '#FFFFFF' }}>SOUL</KageText>
          </View>
        </Animated.View>

        {/* Soul Profile Card */}
        <Animated.View entering={FadeInDown.delay(160).duration(600)} style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <PremiumCard
            isLight={isParchment}
            glowColor="rgba(227,30,36,0.15)"
            style={{
              backgroundColor: colors.kage.sumi,
              padding: 24,
              alignItems: 'center',
              gap: 12,
            }}
          >
            {/* Avatar */}
            <View style={[styles.avatar, { borderColor: colors.accent.primary, backgroundColor: colors.kage.kachi }]}>
              <KageText variant="kanji" style={{ fontSize: 36, color: colors.accent.primary }}>影</KageText>
            </View>

            <View style={{ alignItems: 'center', gap: 4 }}>
              <KageText variant="kanji" style={{ fontSize: 20, letterSpacing: 6, color: '#FFFFFF' }}>
                武 者
              </KageText>
              <KageText variant="mono" style={{ fontSize: 8, color: '#8E9EAF', letterSpacing: 2 }}>
                SHADOW DISCIPLE
              </KageText>
            </View>

            <View style={[styles.xpBadge, { backgroundColor: colors.kage.kachi, borderColor: colors.kage.kachi }]}>
              <KageText variant="mono" style={{ fontSize: 14, color: colors.accent.gold }}>{prog?.totalXP ?? 0} XP</KageText>
            </View>

            {/* Theme Toggle + Settings */}
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 4 }}>
              <TouchableOpacity
                onPress={() => { playSound('click'); toggleTheme(); }}
                style={[styles.actionBtn, { backgroundColor: colors.kage.kachi, borderColor: colors.accent.gold }]}
              >
                <KageText variant="mono" style={{ fontSize: 8, color: colors.accent.gold, letterSpacing: 1 }}>
                  {mode === 'dark' ? '☀️ LIGHT' : '🌙 DARK'}
                </KageText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/settings')}
                style={[styles.actionBtn, { backgroundColor: colors.kage.kachi, borderColor: colors.kage.kachi }]}
              >
                <KageText variant="mono" style={{ fontSize: 8, color: '#8E9EAF', letterSpacing: 1 }}>
                  ⚙️ SETTINGS
                </KageText>
              </TouchableOpacity>
            </View>
          </PremiumCard>
        </Animated.View>

        {/* Sensei Wisdom */}
        <Animated.View entering={FadeInDown.delay(240).duration(600)} style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <Sensei message="Know yourself. Master yourself. Evolve." />
        </Animated.View>

        {/* Journey Stats */}
        <Animated.View entering={FadeInDown.delay(320).duration(600)} style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <PremiumCard isLight={false} glowColor="rgba(201,168,76,0.1)" style={{ backgroundColor: colors.kage.sumi, padding: 16 }}>
            <KageText variant="mono" style={{ fontSize: 8, color: colors.accent.gold, letterSpacing: 2, marginBottom: 16 }}>
              JOURNEY STATS
            </KageText>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {stats.map((s, i) => (
                <View key={i} style={{ width: '30%', alignItems: 'center', gap: 4, paddingVertical: 8 }}>
                  <KageText variant="mono" style={{ fontSize: 18, color: s.color }}>{s.value}</KageText>
                  <KageText variant="mono" style={{ fontSize: 7, letterSpacing: 1, color: '#8E9EAF' }}>{s.label}</KageText>
                </View>
              ))}
            </View>
          </PremiumCard>
        </Animated.View>

        {/* Attributes */}
        {prog && (
          <Animated.View entering={FadeInDown.delay(400).duration(600)} style={{ paddingHorizontal: 16, marginBottom: 16 }}>
            <PremiumCard isLight={false} glowColor="rgba(227,30,36,0.1)" style={{ backgroundColor: colors.kage.sumi, padding: 16 }}>
              <KageText variant="mono" style={{ fontSize: 8, color: colors.accent.gold, letterSpacing: 2, marginBottom: 16 }}>
                ATTRIBUTES
              </KageText>
              {attrs.map((a) => (
                <View key={a.label} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <KageText variant="mono" style={{ width: 60, fontSize: 9, color: '#8E9EAF' }}>{a.label}</KageText>
                  <View style={{ flex: 1, height: 6, backgroundColor: colors.kage.kachi, borderRadius: 100, overflow: 'hidden' }}>
                    <View style={{ width: `${(a.value / maxAttr) * 100}%`, height: '100%', backgroundColor: a.color, borderRadius: 100 }} />
                  </View>
                  <KageText variant="mono" style={{ width: 30, fontSize: 9, textAlign: 'right', color: '#8E9EAF' }}>{a.value}</KageText>
                </View>
              ))}
            </PremiumCard>
          </Animated.View>
        )}

        {/* Timeline */}
        <Animated.View entering={FadeInDown.delay(480).duration(600)} style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <PremiumCard isLight={false} glowColor="rgba(201,168,76,0.1)" style={{ backgroundColor: colors.kage.sumi, padding: 16 }}>
            <KageText variant="mono" style={{ fontSize: 8, color: colors.accent.gold, letterSpacing: 2, marginBottom: 12 }}>
              TIMELINE
            </KageText>
            {history.length === 0 ? (
              <View style={{ alignItems: 'center', paddingVertical: 16, gap: 8 }}>
                <KageText variant="body" align="center" style={{ fontSize: 13, color: '#8E9EAF' }}>No workouts yet</KageText>
                <KageText variant="caption" align="center" style={{ fontSize: 10, color: '#6B7280' }}>Your journey begins with your first training session</KageText>
              </View>
            ) : (
              history.slice(0, 10).map((w, i) => (
                <View
                  key={w.id}
                  style={[
                    styles.timelineItem,
                    {
                      backgroundColor: i === 0 ? 'rgba(200,16,46,0.06)' : 'transparent',
                    },
                  ]}
                >
                  <View style={[styles.timelineDot, { backgroundColor: i === 0 ? colors.accent.primary : colors.kage.kachi }]} />
                  <KageText variant="kanji" style={{ fontSize: 14, color: colors.accent.primary, width: 24 }}>{w.kanji}</KageText>
                  <View style={{ flex: 1 }}>
                    <KageText variant="bodyBold" style={{ fontSize: 11, color: '#FFFFFF' }}>{w.name}</KageText>
                    <KageText variant="mono" style={{ fontSize: 8, color: '#8E9EAF' }}>
                      +{w.totalXP} XP · {w.exercises.length} exercises · {new Date(w.startedAt).toLocaleDateString()}
                    </KageText>
                  </View>
                </View>
              ))
            )}
          </PremiumCard>
        </Animated.View>

        <KageText variant="mono" align="center" style={{ color: '#6B7280', fontSize: 9, marginBottom: 80, letterSpacing: 3 }}>
          KAGE V2 · THE PATH OF THE WARRIOR
        </KageText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { alignItems: 'center', paddingVertical: 24 },
  avatar: { width: 88, height: 88, borderRadius: 44, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  xpBadge: { paddingHorizontal: 18, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  actionBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, borderWidth: 1 },
  timelineItem: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 6, paddingHorizontal: 4, borderRadius: 8,
    marginBottom: 2,
  },
  timelineDot: { width: 6, height: 6, borderRadius: 3 },
});
