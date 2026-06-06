import React from 'react';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { KageText } from '@/components/ui/KageText';
import { useColors, spacing } from '@/theme';
import type { Exercise } from '@/store/types';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  active?: boolean;
  completed?: boolean;
}

const ExerciseCard = React.memo(function ExerciseCard({ exercise, index, active, completed }: ExerciseCardProps) {
  const colors = useColors();

  return (
    <Animated.View entering={FadeInDown.delay(index * 80).duration(500)} style={{ marginBottom: spacing.md }}>
      <GlassContainer
        intensity={active ? 'heavy' : 'medium'}
        glow={active ? 'red' : completed ? 'subtle' : 'none'}
        padding={spacing.lg}
        accentTop={active}
        accentColor={colors.accent.primary}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{
            width: 40, height: 40, borderRadius: 10,
            backgroundColor: colors.glass.medium,
            borderWidth: 1, borderColor: colors.glass.border,
            alignItems: 'center', justifyContent: 'center',
          }}>
            <KageText variant="kanji" style={{ fontSize: 18, color: colors.accent.primary }}>{exercise.kanji}</KageText>
          </View>
          <View style={{ flex: 1 }}>
            <KageText variant="bodyBold" style={{ fontSize: 14, color: colors.text.primary }}>{exercise.name}</KageText>
            <KageText variant="caption" color={colors.text.muted} style={{ fontSize: 10, marginTop: 1 }}>{exercise.target}</KageText>
          </View>
          {completed && <KageText variant="mono" color={colors.status.ready} style={{ fontSize: 16 }}>✓</KageText>}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 10 }}>
          <View style={{ alignItems: 'center', gap: 2 }}>
            <KageText variant="mono" color={colors.accent.primary} style={{ fontSize: 16 }}>{exercise.sets}</KageText>
            <KageText variant="caption" color={colors.text.muted} style={{ fontSize: 8, letterSpacing: 1, textTransform: 'uppercase' }}>Sets</KageText>
          </View>
          <View style={{ width: 1, height: 20, backgroundColor: colors.glass.border }} />
          <View style={{ alignItems: 'center', gap: 2 }}>
            <KageText variant="mono" color={colors.accent.primary} style={{ fontSize: 16 }}>{exercise.reps}</KageText>
            <KageText variant="caption" color={colors.text.muted} style={{ fontSize: 8, letterSpacing: 1, textTransform: 'uppercase' }}>Reps</KageText>
          </View>
        </View>
      </GlassContainer>
    </Animated.View>
  );
});

export { ExerciseCard };