import React from 'react';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { KageText } from '@/components/ui/KageText';
import { useColors, spacing } from '@/theme';

interface ChainLinkProps {
  day: number;
  isActive: boolean;
  isToday?: boolean;
  isBroken?: boolean;
}

function ChainLink({ day, isActive, isToday, isBroken }: ChainLinkProps) {
  const colors = useColors();
  const color = isBroken ? colors.dojo.cryActive : isActive ? colors.status.ready : colors.glass.border;
  const size = isToday ? 28 : 22;

  return (
    <View style={{ alignItems: 'center', gap: 4 }}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 2,
          borderColor: color,
          backgroundColor: isActive ? color + '22' : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: isActive ? color : 'transparent',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
        }}
      >
        {isActive && <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: color }} />}
      </View>
    </View>
  );
}

interface ChainStreakProps {
  streak: number;
  days?: number;
  label?: string;
}

export function ChainStreak({ streak, days = 7, label = 'STREAK' }: ChainStreakProps) {
  const colors = useColors();

  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <View style={{ gap: 8, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          {Array.from({ length: days }).map((_, i) => (
            <React.Fragment key={i}>
              <ChainLink
                day={i + 1}
                isActive={i < streak}
                isToday={i === new Date().getDay() % days}
              />
              {i < days - 1 && (
                <View
                  style={{
                    width: 12,
                    height: 2,
                    borderRadius: 1,
                    backgroundColor: i < streak - 1 ? colors.status.ready : colors.glass.border,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </View>
        <KageText variant="caption" style={{ fontSize: 8, letterSpacing: 1.5, color: colors.text.muted, textTransform: 'uppercase' }}>
          {streak} day {label}
        </KageText>
      </View>
    </Animated.View>
  );
}
