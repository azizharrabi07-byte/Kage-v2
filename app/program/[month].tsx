import React, { useMemo } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { KageText } from '@/components/ui/KageText';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useColors } from '@/theme';
import { getMonthProgram, type MonthProgram } from '@/data/programs';

const INTENSITY_COLORS: Record<string, string> = {
  low: '#22C55E',
  medium: '#EAB308',
  high: '#EF4444',
};

function InfoCard({ label, value, colors }: {
  label: string;
  value: string;
  colors: ReturnType<typeof useColors>;
}) {
  return (
    <View style={[styles.infoCard, { backgroundColor: colors.bg.card, borderColor: colors.glass.border }]}>
      <KageText variant="caption" color={colors.text.muted} style={styles.infoLabel}>
        {label}
      </KageText>
      <KageText variant="bodyBold" color={colors.text.primary} style={styles.infoValue}>
        {value}
      </KageText>
    </View>
  );
}

function WeekCard({ month, week, index, colors, onPress }: {
  month: number;
  week: { week: number; name: string; theme: string; days: { durationMin: number }[] };
  index: number;
  colors: ReturnType<typeof useColors>;
  onPress: () => void;
}) {
  const workoutDays = week.days.filter((d) => d.durationMin > 0).length;

  return (
    <Animated.View entering={FadeInUp.delay(index * 80).springify().damping(14)}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={[styles.weekCard, { backgroundColor: colors.bg.card, borderColor: colors.glass.border }]}
      >
        <View style={styles.weekCardTop}>
          <KageText variant="mono" color={colors.accent.primary} style={styles.weekNumber}>
            WEEK {week.week}
          </KageText>
          <View style={[styles.workoutBadge, { backgroundColor: colors.accent.primary + '20' }]}>
            <KageText variant="caption" color={colors.accent.primary} style={styles.workoutBadgeText}>
              {workoutDays} WORKOUTS
            </KageText>
          </View>
        </View>
        <KageText variant="h3" color={colors.text.primary} style={styles.weekName}>
          {week.name}
        </KageText>
        <KageText variant="body" color={colors.text.secondary} style={styles.weekTheme}>
          {week.theme}
        </KageText>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function MonthDetailScreen() {
  const colors = useColors();
  const router = useRouter();
  const { month } = useLocalSearchParams<{ month: string }>();
  const monthNum = parseInt(month ?? '0', 10);

  const program = useMemo(() => getMonthProgram(monthNum), [monthNum]);

  if (!monthNum) {
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
            Month {monthNum} not found
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
              <KageText variant="mono" color={colors.accent.primary} style={styles.headerNumber}>
                {String(program.month).padStart(2, '0')}
              </KageText>
              <KageText variant="kanji" color={colors.text.muted} style={styles.headerKanji}>
                {program.kanji}
              </KageText>
            </View>
            <KageText variant="h2" color={colors.text.primary} style={styles.headerName}>
              {program.name}
            </KageText>
            <KageText variant="body" color={colors.text.secondary} style={styles.headerSubtitle}>
              {program.subtitle}
            </KageText>
            <View style={[styles.accentLine, { backgroundColor: colors.accent.primary }]} />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(80).springify().damping(14)} style={styles.infoRow}>
            <InfoCard label="THEME" value={program.theme} colors={colors} />
            <InfoCard label="FOCUS" value={program.focus} colors={colors} />
            <InfoCard label="GOAL" value={program.goal} colors={colors} />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(160).springify().damping(14)} style={styles.section}>
            <KageText variant="caption" color={colors.accent.primary} style={styles.sectionLabel}>
              WHAT YOU'LL GAIN
            </KageText>
            {program.whatYouGain.map((item, i) => (
              <View key={i} style={styles.gainItem}>
                <View style={[styles.bullet, { backgroundColor: colors.accent.primary }]} />
                <KageText variant="body" color={colors.text.primary} style={styles.gainText}>
                  {item}
                </KageText>
              </View>
            ))}
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(240).springify().damping(14)} style={styles.section}>
            <KageText variant="caption" color={colors.accent.primary} style={styles.sectionLabel}>
              WEEKS
            </KageText>
            {program.weeks.map((week, i) => (
              <WeekCard
                key={week.week}
                month={program.month}
                week={week}
                index={i}
                colors={colors}
                onPress={() => router.push(`/program/${program.month}/${week.week}`)}
              />
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
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    paddingTop: 16,
  },
  headerNumber: {
    fontSize: 28,
    letterSpacing: 3,
  },
  headerKanji: {
    fontSize: 20,
    letterSpacing: 6,
  },
  headerName: {
    fontSize: 28,
    letterSpacing: 3,
    marginTop: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    letterSpacing: 1,
    marginTop: 2,
  },
  accentLine: {
    height: 2,
    width: 48,
    borderRadius: 1,
    marginTop: 12,
  },
  infoRow: {
    gap: 8,
  },
  infoCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
  },
  infoLabel: {
    fontSize: 9,
    letterSpacing: 3,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    letterSpacing: 0.5,
    lineHeight: 20,
  },
  section: {
    gap: 8,
  },
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 4,
    marginBottom: 4,
    paddingTop: 4,
  },
  gainItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 2,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  gainText: {
    fontSize: 14,
    letterSpacing: 0.5,
    flex: 1,
  },
  weekCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    gap: 6,
  },
  weekCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekNumber: {
    fontSize: 16,
    letterSpacing: 3,
  },
  workoutBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  workoutBadgeText: {
    fontSize: 9,
    letterSpacing: 2,
    fontWeight: '700',
  },
  weekName: {
    fontSize: 20,
    letterSpacing: 2,
  },
  weekTheme: {
    fontSize: 13,
    letterSpacing: 0.5,
  },
});
