import React, { useMemo, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { KageText } from '@/components/ui/KageText';
import { useColors } from '@/theme';
import { getMonthProgram, type MonthProgram, type WorkoutDay } from '@/data/programs';
import { getExerciseById, type Exercise } from '@/data/exercises';

const intensityColor: Record<string, string> = {
  low: '#22C55E',
  medium: '#EAB308',
  high: '#EF4444',
};

function ExerciseImage({ exerciseId }: { exerciseId: string }) {
  const [failed, setFailed] = useState(false);
  const ex = getExerciseById(exerciseId);
  if (!ex || !ex.gifUrl || failed) return null;
  return (
    <Image
      source={{ uri: ex.gifUrl }}
      style={styles.exerciseGif}
      resizeMode="cover"
      onError={() => setFailed(true)}
    />
  );
}

function DayCard({ day, index }: { day: WorkoutDay; index: number }) {
  const colors = useColors();
  return (
    <Animated.View entering={FadeInDown.delay(200 + index * 40).duration(400)}>
      <View style={[styles.dayCard, { backgroundColor: colors.bg.card, borderColor: colors.glass.border }]}>
        <View style={styles.dayHeader}>
          <View style={styles.dayLeft}>
            <KageText style={[styles.dayNum, { color: colors.accent.primary }]}>Day {day.day}</KageText>
            <KageText style={[styles.dayName, { color: colors.text.primary }]}>{day.name}</KageText>
            <KageText style={[styles.dayKanji, { color: colors.text.muted }]}>{day.kanji}</KageText>
          </View>
          <View style={styles.dayRight}>
            <View style={[styles.intensityBadge, { backgroundColor: intensityColor[day.intensity] + '20' }]}>
              <KageText style={[styles.intensityText, { color: intensityColor[day.intensity] }]}>
                {day.intensity}
              </KageText>
            </View>
            <KageText style={[styles.duration, { color: colors.text.muted }]}>{day.durationMin}m</KageText>
          </View>
        </View>

        <KageText style={[styles.dayFocus, { color: colors.accent.gold }]}>{day.focus}</KageText>

        {day.exercises.length > 0 && (
          <View style={[styles.exerciseList, { borderTopColor: colors.glass.border }]}>
            {day.exercises.map((ex, i) => (
              <View key={i} style={styles.exRow}>
                <ExerciseImage exerciseId={ex.exerciseId} />
                <KageText style={[styles.exName, { color: colors.text.secondary }]}>{ex.exerciseId}</KageText>
                <KageText style={[styles.exSets, { color: colors.text.muted }]}>
                  {ex.sets}x{ex.reps}
                </KageText>
              </View>
            ))}
          </View>
        )}

        {day.exercises.length === 0 && (
          <KageText style={[styles.restText, { color: colors.text.muted }]}>Rest day — recover and recharge</KageText>
        )}
      </View>
    </Animated.View>
  );
}

export default function ProgramDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const router = useRouter();

  const month = useMemo(() => {
    const m = parseInt(id ?? '1', 10);
    return getMonthProgram(m);
  }, [id]);

  if (!month) {
    return (
      <ScreenContainer>
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <KageText style={{ fontSize: 16, color: colors.text.muted }}>Program not found</KageText>
          <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 16 }}>
            <KageText style={{ color: colors.accent.primary }}>Go Back</KageText>
          </TouchableOpacity>
        </SafeAreaView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <Animated.View entering={FadeInDown.duration(400)}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <KageText style={{ color: colors.accent.primary, fontSize: 14, letterSpacing: 2 }}>
                ← BACK TO PROGRAMS
              </KageText>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.headerSection}>
            <KageText style={[styles.monthLabel, { color: colors.accent.primary }]}>
              Month {month.month}
            </KageText>
            <KageText style={[styles.monthName, { color: colors.text.primary }]}>{month.name}</KageText>
            <KageText style={[styles.monthKanji, { color: colors.text.muted }]}>{month.kanji}</KageText>
            <KageText style={[styles.monthSubtitle, { color: colors.text.secondary }]}>{month.subtitle}</KageText>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(200).duration(500)} style={[styles.goalCard, { backgroundColor: colors.bg.card, borderColor: colors.glass.border }]}>
            <KageText style={[styles.goalLabel, { color: colors.accent.gold }]}>GOAL</KageText>
            <KageText style={[styles.goalText, { color: colors.text.primary }]}>{month.goal}</KageText>
            <KageText style={[styles.focusText, { color: colors.text.secondary }]}>Focus: {month.focus}</KageText>
          </Animated.View>

          {month.whatYouGain.length > 0 && (
            <Animated.View entering={FadeInDown.delay(250).duration(500)} style={styles.gainSection}>
              <KageText style={[styles.gainTitle, { color: colors.text.primary }]}>What You'll Gain</KageText>
              {month.whatYouGain.map((gain, i) => (
                <View key={i} style={styles.gainRow}>
                  <KageText style={[styles.gainBullet, { color: colors.status.ready }]}>✓</KageText>
                  <KageText style={[styles.gainText, { color: colors.text.secondary }]}>{gain}</KageText>
                </View>
              ))}
            </Animated.View>
          )}

          <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.weeksSection}>
            {month.weeks.map((week) => (
              <View key={week.week} style={styles.weekBlock}>
                <View style={styles.weekHeader}>
                  <KageText style={[styles.weekLabel, { color: colors.accent.primary }]}>
                    WEEK {week.week}
                  </KageText>
                  <KageText style={[styles.weekName, { color: colors.text.primary }]}>{week.name}</KageText>
                  <KageText style={[styles.weekTheme, { color: colors.text.muted }]}>{week.theme}</KageText>
                </View>
                {week.days.map((day) => (
                  <DayCard key={day.day} day={day} index={day.day} />
                ))}
              </View>
            ))}
          </Animated.View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  backBtn: { paddingVertical: 16 },
  headerSection: { alignItems: 'center', paddingVertical: 12, gap: 6 },
  monthLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 3, textTransform: 'uppercase' },
  monthName: { fontSize: 26, fontWeight: '800', letterSpacing: 2, textAlign: 'center' },
  monthKanji: { fontSize: 16, letterSpacing: 6, marginTop: 2 },
  monthSubtitle: { fontSize: 13, letterSpacing: 1, textAlign: 'center', marginTop: 4 },
  goalCard: { borderRadius: 14, borderWidth: 1, padding: 18, marginTop: 16, gap: 8 },
  goalLabel: { fontSize: 9, fontWeight: '700', letterSpacing: 2 },
  goalText: { fontSize: 14, lineHeight: 20, letterSpacing: 0.5 },
  focusText: { fontSize: 11, letterSpacing: 1, marginTop: 4 },
  gainSection: { marginTop: 20, gap: 8 },
  gainTitle: { fontSize: 14, fontWeight: '700', letterSpacing: 2, marginBottom: 4 },
  gainRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  gainBullet: { fontSize: 12, marginTop: 2 },
  gainText: { fontSize: 12, lineHeight: 18, flex: 1, letterSpacing: 0.5 },
  weeksSection: { marginTop: 24 },
  weekBlock: { marginBottom: 28 },
  weekHeader: { marginBottom: 12, gap: 4 },
  weekLabel: { fontSize: 9, fontWeight: '700', letterSpacing: 3 },
  weekName: { fontSize: 18, fontWeight: '700', letterSpacing: 1 },
  weekTheme: { fontSize: 11, letterSpacing: 0.5, lineHeight: 16 },
  dayCard: { borderRadius: 12, borderWidth: 1, padding: 14, marginBottom: 8 },
  dayHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  dayLeft: { flex: 1, gap: 2 },
  dayNum: { fontSize: 9, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase' },
  dayName: { fontSize: 15, fontWeight: '600', letterSpacing: 0.5, marginTop: 2 },
  dayKanji: { fontSize: 12, letterSpacing: 3, marginTop: 1 },
  dayRight: { alignItems: 'flex-end', gap: 4 },
  intensityBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  intensityText: { fontSize: 8, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  duration: { fontSize: 10, letterSpacing: 1 },
  dayFocus: { fontSize: 10, letterSpacing: 1, marginTop: 6 },
  exerciseList: { borderTopWidth: 1, marginTop: 10, paddingTop: 10, gap: 6 },
  exRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  exerciseGif: { width: 32, height: 32, borderRadius: 6 },
  exName: { fontSize: 12, letterSpacing: 0.5, flex: 1, textTransform: 'capitalize' },
  exSets: { fontSize: 11, letterSpacing: 0.5 },
  restText: { fontSize: 11, letterSpacing: 1, fontStyle: 'italic', marginTop: 8 },
});
