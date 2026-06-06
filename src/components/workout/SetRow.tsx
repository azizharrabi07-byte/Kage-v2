import React from 'react';
import { View } from 'react-native';
import { KageText } from '@/components/ui/KageText';
import { useColors } from '@/theme';
import type { WorkoutSet } from '@/store/types';

interface SetRowProps {
  set: WorkoutSet;
  onToggle: () => void;
  disabled?: boolean;
}

const SetRow = React.memo(function SetRow({ set, onToggle, disabled }: SetRowProps) {
  const colors = useColors();

  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center', gap: 10,
      paddingVertical: 8, paddingHorizontal: 12,
      borderRadius: 10,
      backgroundColor: set.completed ? 'rgba(0,204,136,0.06)' : colors.glass.light,
      borderWidth: 1,
      borderColor: set.completed ? 'rgba(0,204,136,0.12)' : colors.glass.borderLight,
      marginBottom: 4,
    }}>
      <View
        style={{
          width: 26, height: 26, borderRadius: 13,
          borderWidth: 2,
          borderColor: set.completed ? colors.status.ready : colors.glass.border,
          backgroundColor: set.completed ? colors.status.ready : 'transparent',
          alignItems: 'center', justifyContent: 'center',
        }}
        onTouchEnd={disabled ? undefined : onToggle}
      >
        {set.completed && <KageText variant="mono" color={colors.text.inverse} style={{ fontSize: 12 }}>✓</KageText>}
      </View>
      <KageText variant="bodyBold" style={{ fontSize: 13, flex: 1, color: colors.text.primary }}>
        Set {set.setNumber}
      </KageText>
      <KageText variant="mono" style={{ fontSize: 13, color: colors.text.secondary }}>
        {set.reps} reps
      </KageText>
      {set.weight > 0 && (
        <KageText variant="caption" style={{ fontSize: 11, color: colors.text.muted }}>{set.weight}kg</KageText>
      )}
      {set.completed && (
        <KageText variant="caption" color={colors.status.ready} style={{ fontSize: 8, letterSpacing: 1 }}>
          DONE
        </KageText>
      )}
    </View>
  );
});

export { SetRow };