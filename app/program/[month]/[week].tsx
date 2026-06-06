import React, { useMemo, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { KageText } from '@/components/ui/KageText';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useColors } from '@/theme';
import { getWeekProgram } from '@/data/programs';
import { getExerciseById } from '@/data/exercises';
import type { WorkoutDay, ProgramExercise } from '@/data/programs';

const INTENSITY_COLORS: Record<string, string> = {
  low: '#22C55E',
  medium: '#EAB308',
  high: '#EF4444',
};

function ExerciseRow({ exercise, colors }: {
  exercise: ProgramExercise;
  colors: ReturnType<typeof useColors>;
}) {
  const ex = getExerciseById(exercise.exerciseId);

  return (
    <View style={[styles.exerciseRow, { borderLeftColor: colors.accent.primary }]}>
      <View style={styles.exerciseLeft}>
        <KageText variant="bodyBold" color={colors.text.primary} style={styles.exerciseName}>
          {ex?.name ?? exercise.exerciseId}
        </KageText>
        {ex?.kanji && (
          <KageText variant="caption" color={colors.text.muted} style={styles.exerciseKanji}>
            {ex.kanji}
          </KageText>
        )}
      </View>
      <View style={styles.exerciseRight}>
        <KageText variant="mono" color={colors.accent.primary} style={styles.exerciseSets}>
          {exercise.sets}×{exercise.reps}
        </KageText>
        {exercise.restSeconds > 0 && (
          <KageText variant="caption" color={colors.text.muted} style={styles.exerciseRest}>
            {exercise.restSeconds}s rest
          </KageText>
        )}
      </View>
      {exercise.notes && (
        <KageText variant="caption" color={colors.text.secondary} style={styles.exerciseNotes}>
          {exercise.notes}
        </KageText>
      )}
    </View>
  );
}

function DayCard({ day, index, colors }: {
  day: WorkoutDay;
  index: number;
  colors: ReturnType<typeof useColors>;
}) {
  const [expanded, setExpanded] = useState(false);
  const isRest = day.durationMin === 0 || day.exercises.length === 0;
  const exerciseCount = day.exercises.length;
  const intensityColor = INTENSITY_COLORS[day.intensity] ?? colors.text.muted;

  return (
    <Animated.View entering={FadeInUp.delay(index * 60).springify().damping(14)}>
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
        style={[
          styles.dayCard,
          {
            backgroundColor: colors.bg.card,
            borderColor: isRest ? colors.glass.borderLight : colors.glass.border,
          },
          isRest && styles.dayCardRest,
        ]}
      >
        <View style={styles.dayTop}>
          <View style={styles.dayTopLeft}>
            <KageText variant="mono" color={colors.accent.primary} style={styles.dayNumber}>
              DAY {day.day}
            </KageText>
            {isRest && (
              <View style={[styles.restBadge, { backgroundColor: colors.text.muted + '20' }]}>
                <KageText variant="caption" color={colors.text.muted} style={styles.restBadgeText}>
                  REST
                </KageText>
              </View>
            )}
          </View>
          {!isRest && (
            <View style={[styles.intensityBadge, { backgroundColor: intensityColor + '20' }]}>
              <KageText variant="caption" color={intensityColor} style={styles.intensityText}>
                {day.intensity.toUpperCase()}
              </KageText>
            </View>
          )}
        </View>

        <KageText variant="bodyBold" color={colors.text.primary} style={styles.dayName}>
          {day.name}
        </KageText>
        <KageText variant="kanji" color={colors.text.muted} style={styles.dayKanji}>
          {day.kanji}
        </KageText>

        <KageText variant="body" color={colors.text.secondary} style={styles.dayDesc}>
          {day.description}
        </KageText>

        <View style={styles.dayMeta}>
          <KageText variant="caption" color={colors.text.muted} style={styles.dayFocus}>
            {day.focus}
          </KageText>
          {!isRest && (
            <>
              <View style={[styles.metaDot, { backgroundColor: colors.text.muted }]} />
              <KageText variant="caption" color={colors.text.muted}>
                {day.durationMin} min
              </KageText>
              <View style={[styles.metaDot, { backgroundColor: colors.text.muted }]} />
              <KageText variant="caption" color={colors.text.muted}>
                {exerciseCount} exercises
              </KageText>
            </>
          )}
          {isRest && day.durationMin > 0 && (
            <>
              <View style={[styles.metaDot, { backgroundColor: colors.text.muted }]} />
              <KageText variant="caption" color={colors.text.muted}>
                {day.durationMin} min
              </KageText>
            </>
          )}
        </View>

        {expanded && !isRest && (
          <View style={[styles.exerciseList, { borderTopColor: colors.glass.border }]}>
            {day.exercises.map((ex, i) => (
              <ExerciseRow key={`${ex.exerciseId}-${i}`} exercise={ex} colors={colors} />
            ))}
          </View>
        )}

        {!isRest && (
          <KageText variant="caption" color={colors.text.muted} style={styles.expandHint}>
            {expanded ? 'TAP TO HIDE' : 'TAP TO SHOW EXERCISES'}
          </KageText>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function WeekDetailScreen() {
  const colors = useColors();
  const router = useRouter();
  const { month, week } = useLocalSearchParams<{ month: string; week: string }>();
  const monthNum = parseInt(month ?? '0', 10);
  const weekNum = parseInt(week ?? '0', 10);

  const program = useMemo(() => getWeekProgram(monthNum, weekNum), [monthNum, weekNum]);

  if (!monthNum || !weekNum) {
    return (
      <ScreenContainer>
        <LoadingSpinner message="Loading..." />
      </ScreenContainer>
    );
  }

  if (!program) {
    return (
      <ScreenContainer>
        <SafeAreaView edges={['top']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
          <KageText variant="kanji" color={colors.text.muted} style={{ fontSize: 48, marginBottom: 12 }}>
            ???
          </KageText>
          <KageText variant="body" color={colors.text.secondary} style={{ textAlign: 'center', letterSpacing: 1 }}>
            Week {weekNum} of Month {monthNum} not found
          </KageText>
          <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
            <KageText variant="bodyBold" color={colors.accent.primary} style={{ letterSpacing: 2 }}>
              GO BACK
            </KageText>
          </TouchableOpacity>
        </SafeAreaView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View entering={FadeInUp.springify().damping(14)}>
            <View style={styles.header}>
              <KageText variant="mono" color={colors.accent.primary} style={styles.headerWeek}>
                WEEK {program.week}
              </KageText>
              <KageText variant="h2" color={colors.text.primary} style={styles.headerName}>
                {program.name}
              </KageText>
              <View style={[styles.accentLine, { backgroundColor: colors.accent.primary }]} />
            </View>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(60).springify().damping(14)}>
            <View style={[styles.themeCard, { backgroundColor: colors.bg.card, borderColor: colors.glass.border }]}>
              <KageText variant="caption" color={colors.accent.primary} style={styles.themeLabel}>
                WEEK THEME
              </KageText>
              <KageText variant="body" color={colors.text.secondary} style={styles.themeText}>
                {program.theme}
              </KageText>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(120).springify().damping(14)} style={styles.section}>
            <KageText variant="caption" color={colors.accent.primary} style={styles.sectionLabel}>
              DAYS
            </KageText>
            {program.days.map((day, i) => (
              <DayCard key={day.day} day={day} index={i} colors={colors} />
            ))}
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    gap: 12,
  },
  header: {
    paddingTop: 16,
    gap: 6,
  },
  headerWeek: {
    fontSize: 20,
    letterSpacing: 4,
  },
  headerName: {
    fontSize: 26,
    letterSpacing: 3,
  },
  accentLine: {
    height: 2,
    width: 48,
    borderRadius: 1,
    marginTop: 8,
  },
  themeCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    gap: 6,
  },
  themeLabel: {
    fontSize: 9,
    letterSpacing: 3,
  },
  themeText: {
    fontSize: 13,
    letterSpacing: 0.5,
    lineHeight: 19,
  },
  section: {
    gap: 8,
  },
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 4,
    paddingTop: 4,
  },
  dayCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    gap: 4,
  },
  dayCardRest: {
    opacity: 0.6,
  },
  dayTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayTopLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dayNumber: {
    fontSize: 14,
    letterSpacing: 2,
  },
  restBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  restBadgeText: {
    fontSize: 9,
    letterSpacing: 2,
    fontWeight: '700',
  },
  intensityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  intensityText: {
    fontSize: 9,
    letterSpacing: 2,
    fontWeight: '700',
  },
  dayName: {
    fontSize: 16,
    letterSpacing: 1,
    marginTop: 2,
  },
  dayKanji: {
    fontSize: 14,
    letterSpacing: 4,
  },
  dayDesc: {
    fontSize: 12,
    letterSpacing: 0.5,
    marginTop: 2,
  },
  dayMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
    flexWrap: 'wrap',
  },
  dayFocus: {
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '600',
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
  },
  exerciseList: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    gap: 8,
  },
  exerciseRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderLeftWidth: 2,
    paddingLeft: 10,
    paddingVertical: 4,
    gap: 4,
  },
  exerciseLeft: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 13,
    letterSpacing: 0.5,
  },
  exerciseKanji: {
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 1,
  },
  exerciseRight: {
    alignItems: 'flex-end',
  },
  exerciseSets: {
    fontSize: 13,
    letterSpacing: 1,
  },
  exerciseRest: {
    fontSize: 9,
    letterSpacing: 1,
    marginTop: 1,
  },
  exerciseNotes: {
    fontSize: 10,
    letterSpacing: 0.5,
    width: '100%',
    marginTop: 2,
    fontStyle: 'italic',
  },
  expandHint: {
    fontSize: 8,
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: 6,
  },
});
