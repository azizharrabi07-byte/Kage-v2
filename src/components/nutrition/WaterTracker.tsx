import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { KageText } from '@/components/ui/KageText';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { useColors, spacing } from '@/theme';

interface WaterTrackerProps {
  glasses: number;
  maxGlasses?: number;
  onAdd: () => void;
  onRemove: () => void;
}

export function WaterTracker({ glasses, maxGlasses = 8, onAdd, onRemove }: WaterTrackerProps) {
  const colors = useColors();
  const fillRatio = Math.min(glasses / maxGlasses, 1);

  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <GlassContainer intensity="medium" accentTop accentColor={colors.status.recovery} style={{ borderRadius: 14 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View style={{ width: 3, height: 14, borderRadius: 1.5, backgroundColor: colors.status.recovery }} />
            <KageText variant="bodyBold" style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: colors.status.recovery }}>
              WATER 💧
            </KageText>
          </View>
          <KageText variant="mono" style={{ fontSize: 14, color: colors.status.recovery }}>
            {glasses}/{maxGlasses}
          </KageText>
        </View>

        <View style={{ flexDirection: 'row', gap: 4, marginBottom: 10 }}>
          {Array.from({ length: maxGlasses }).map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                if (i < glasses) onRemove();
                else onAdd();
              }}
              style={{
                flex: 1,
                height: 36,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: i < glasses ? colors.status.recovery : colors.glass.border,
                backgroundColor: i < glasses ? colors.status.recovery + '22' : colors.glass.light,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <KageText
                variant="caption"
                style={{
                  fontSize: i < glasses ? 14 : 10,
                  color: i < glasses ? colors.status.recovery : colors.text.muted,
                }}
              >
                {i < glasses ? '💧' : '○'}
              </KageText>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 4, borderRadius: 2, backgroundColor: colors.glass.border, overflow: 'hidden' }}>
          <View
            style={{
              width: `${fillRatio * 100}%`,
              height: '100%',
              backgroundColor: colors.status.recovery,
              borderRadius: 2,
            }}
          />
        </View>
      </GlassContainer>
    </Animated.View>
  );
}
