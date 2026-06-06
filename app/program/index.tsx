import React, { useMemo } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { KageText } from '@/components/ui/KageText';
import { useColors } from '@/theme';
import { getAllMonths, yearProgram } from '@/data/programs';

export default function ProgramBrowser() {
  const colors = useColors();
  const router = useRouter();
  const months = useMemo(() => getAllMonths(), []);

  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <Animated.View entering={FadeInUp.duration(500)} style={styles.header}>
            <KageText style={[styles.programTitle, { color: colors.text.primary }]}>{yearProgram.name}</KageText>
            <KageText style={[styles.programDesc, { color: colors.text.muted }]}>{yearProgram.description}</KageText>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(100).duration(500)} style={styles.progressOverview}>
            <View style={[styles.progressBarBg, { backgroundColor: colors.glass.medium }]}>
              <View style={[styles.progressFill, { width: '0%', backgroundColor: colors.accent.primary }]} />
            </View>
            <KageText style={[styles.progressLabel, { color: colors.text.muted }]}>
              0 / {months.length} months completed
            </KageText>
          </Animated.View>

          {months.map((month, i) => (
            <Animated.View key={month.month} entering={FadeInUp.delay(150 + i * 60).springify()}>
              <TouchableOpacity
                style={[styles.monthCard, { backgroundColor: colors.bg.card, borderColor: colors.glass.border }]}
                onPress={() => router.push(`/program/${month.month}`)}
              >
                <View style={styles.monthHeader}>
                  <View style={styles.monthLeft}>
                    <KageText style={[styles.monthNum, { color: colors.accent.primary }]}>
                      Month {month.month}
                    </KageText>
                    <KageText style={[styles.monthName, { color: colors.text.primary }]}>{month.name}</KageText>
                    <KageText style={[styles.monthKanji, { color: colors.text.muted }]}>{month.kanji}</KageText>
                  </View>
                  <View style={[styles.monthArrow, { borderColor: colors.glass.border }]}>
                    <KageText style={{ color: colors.text.muted, fontSize: 18 }}>→</KageText>
                  </View>
                </View>
                <KageText style={[styles.monthSubtitle, { color: colors.text.secondary }]}>{month.subtitle}</KageText>
                <View style={styles.monthFooter}>
                  <KageText style={[styles.focusLabel, { color: colors.accent.gold }]}>Focus: {month.focus}</KageText>
                  <KageText style={[styles.weekCount, { color: colors.text.muted }]}>{month.weeks.length} weeks</KageText>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}

          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  header: { paddingVertical: 24, alignItems: 'center' },
  programTitle: { fontSize: 20, fontWeight: '800', letterSpacing: 3, textAlign: 'center' },
  programDesc: { fontSize: 12, lineHeight: 18, letterSpacing: 1, textAlign: 'center', marginTop: 8, paddingHorizontal: 20 },
  progressOverview: { marginBottom: 24, gap: 6 },
  progressBarBg: { height: 6, borderRadius: 100, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 100 },
  progressLabel: { fontSize: 9, letterSpacing: 1, textTransform: 'uppercase', textAlign: 'center' },
  monthCard: { borderRadius: 14, borderWidth: 1, padding: 18, marginBottom: 12 },
  monthHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  monthLeft: { flex: 1, gap: 4 },
  monthNum: { fontSize: 10, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase' },
  monthName: { fontSize: 18, fontWeight: '700', letterSpacing: 1, marginTop: 2 },
  monthKanji: { fontSize: 14, letterSpacing: 4, marginTop: 2 },
  monthArrow: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  monthSubtitle: { fontSize: 12, letterSpacing: 0.5, marginTop: 10, lineHeight: 18 },
  monthFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  focusLabel: { fontSize: 9, letterSpacing: 1, flex: 1 },
  weekCount: { fontSize: 9, letterSpacing: 1 },
});
