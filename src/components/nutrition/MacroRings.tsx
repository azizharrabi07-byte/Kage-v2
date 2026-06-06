import React from 'react';
import { View } from 'react-native';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { KageText } from '@/components/ui/KageText';
import { useColors, spacing } from '@/theme';

interface MacroRingsProps {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  targets: { calories: number; protein: number; carbs: number; fat: number };
}

export function MacroRings({ calories, protein, carbs, fat, targets }: MacroRingsProps) {
  const colors = useColors();

  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <ProgressRing value={calories} maxValue={targets.calories} label="CAL" color={colors.accent.neon} format="percent" size={64} />
        <ProgressRing value={protein} maxValue={targets.protein} label="PROTEIN" color={colors.status.ready} format="percent" size={64} />
        <ProgressRing value={carbs} maxValue={targets.carbs} label="CARBS" color={colors.accent.gold} format="percent" size={64} />
        <ProgressRing value={fat} maxValue={targets.fat} label="FAT" color={colors.status.recovery} format="percent" size={64} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <KageText variant="mono" style={{ fontSize: 11, color: colors.accent.neon }}>{calories}/{targets.calories}</KageText>
        <KageText variant="mono" style={{ fontSize: 11, color: colors.status.ready }}>{protein}g/{targets.protein}g</KageText>
        <KageText variant="mono" style={{ fontSize: 11, color: colors.accent.gold }}>{carbs}g/{targets.carbs}g</KageText>
        <KageText variant="mono" style={{ fontSize: 11, color: colors.status.recovery }}>{fat}g/{targets.fat}g</KageText>
      </View>
    </View>
  );
}
