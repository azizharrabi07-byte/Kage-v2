import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { useColors } from '@/theme';
import { KageText } from '@/components/ui/KageText';
import { Card } from '@/components/premium/Card';

interface AchievementsStackProps {
  workoutsCompleted?: number;
  nextMilestoneName?: string;
  nextMilestoneProgress?: number;
}

export function AchievementsStack({
  workoutsCompleted = 75,
  nextMilestoneName = 'Reach Level 5',
  nextMilestoneProgress = 75,
}: AchievementsStackProps) {
  const colors = useColors();
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    progressWidth.value = withTiming(nextMilestoneProgress, { duration: 1000, easing: Easing.out(Easing.ease) });
  }, [nextMilestoneProgress]);

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  return (
    <View style={styles.container}>
      <Card style={styles.milestoneCard} accentColor={colors.accent.gold}>
        <KageText variant="caption" color={colors.text.muted} style={{ fontSize: 9, marginBottom: 5 }}>
          NEXT MILESTONE:
        </KageText>
        <KageText variant="bodyBold" style={{ fontSize: 16, marginBottom: 10 }}>
          {nextMilestoneName}
        </KageText>
        <View style={[styles.progressBarBackground]}>
          <Animated.View style={[styles.progressBarFill, animatedProgressStyle, { backgroundColor: colors.accent.gold }]} />
        </View>
        <KageText variant="caption" color={colors.text.muted} style={{ alignSelf: 'flex-end', fontSize: 11, marginTop: 4 }}>
          {nextMilestoneProgress}%
        </KageText>
      </Card>

      <Card style={styles.achievementsCard} accentColor={colors.status.ready}>
        <KageText variant="caption" color={colors.text.muted} style={{ fontSize: 9, marginBottom: 10 }}>
          RECENT ACHIEVEMENTS:
        </KageText>
        <View style={styles.medalContainer}>
          {[
            { name: 'First Kill', emoji: '🥉' },
            { name: '7-Day Streak', emoji: '🥈' },
            { name: 'Iron Will', emoji: '🥇' },
          ].map((achievement, i) => (
            <View key={i} style={styles.medalItem}>
              <KageText style={{ fontSize: 28 }}>{achievement.emoji}</KageText>
              <KageText variant="caption" color={colors.text.muted} style={{ fontSize: 9, textAlign: 'center' }}>
                {achievement.name}
              </KageText>
            </View>
          ))}
          <View style={styles.medalItem}>
            <View style={[styles.placeholderMedal, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
              <KageText variant="caption" color={colors.text.muted}>...</KageText>
            </View>
            <KageText variant="caption" color={colors.text.muted} style={{ fontSize: 9, textAlign: 'center' }}>More</KageText>
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 10, flexDirection: 'column', gap: 10 },
  milestoneCard: { width: '100%', height: 130, justifyContent: 'center', padding: 20 },
  progressBarBackground: { height: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden', width: '100%' },
  progressBarFill: { height: '100%', borderRadius: 4 },
  achievementsCard: { width: '100%', height: 130, justifyContent: 'center', padding: 20 },
  medalContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' },
  medalItem: { alignItems: 'center', width: 60 },
  placeholderMedal: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center', marginBottom: 4,
  },
});
