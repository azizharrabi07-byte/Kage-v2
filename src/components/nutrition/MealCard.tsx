import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { KageText } from '@/components/ui/KageText';
import { useColors, spacing } from '@/theme';
import type { Meal } from '@/store/nutritionStore';

interface MealCardProps {
  meal: Meal;
  onRemove?: () => void;
}

const typeColors: Record<string, string> = {
  breakfast: '#C9A84C',
  lunch: '#C8102E',
  dinner: '#38B48B',
  snack: '#8B5CF6',
};

export function MealCard({ meal, onRemove }: MealCardProps) {
  const colors = useColors();
  const typeColor = typeColors[meal.type] || colors.text.muted;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.glass.borderLight,
      }}
    >
      <View
        style={{
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: typeColor,
        }}
      />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <KageText variant="body" style={{ fontSize: 12, color: colors.text.primary }}>
            {meal.name}
          </KageText>
          <KageText variant="caption" style={{ fontSize: 8, color: colors.text.muted, letterSpacing: 0.5 }}>
            {meal.time}
          </KageText>
        </View>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <KageText variant="caption" style={{ fontSize: 8, color: colors.accent.neon }}>{meal.calories}cal</KageText>
          <KageText variant="caption" style={{ fontSize: 8, color: colors.status.ready }}>P{meal.protein}</KageText>
          <KageText variant="caption" style={{ fontSize: 8, color: colors.accent.gold }}>C{meal.carbs}</KageText>
          <KageText variant="caption" style={{ fontSize: 8, color: colors.status.recovery }}>F{meal.fat}</KageText>
        </View>
      </View>
      {onRemove && (
        <TouchableOpacity onPress={onRemove} style={{ padding: 4 }}>
          <KageText variant="body" style={{ fontSize: 14, color: colors.text.muted }}>✕</KageText>
        </TouchableOpacity>
      )}
    </View>
  );
}
