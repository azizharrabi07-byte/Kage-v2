import React, { useEffect, useState } from 'react';
import { View, type ViewStyle } from 'react-native';
import {
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { KageText } from '@/components/ui/KageText';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { useColors, spacing } from '@/theme';

interface QuickStatItem {
  label: string;
  value: number;
  color?: string;
  suffix?: string;
  prefix?: string;
  format?: 'number' | 'duration' | 'percentage';
  icon?: string;
}

interface QuickStatsProps {
  stats: QuickStatItem[];
  columns?: 2 | 3 | 4;
  title?: string;
  style?: ViewStyle;
  animate?: boolean;
}

function AnimatedCounter({
  value,
  color,
  suffix,
  prefix,
  format = 'number',
}: {
  value: number;
  color: string;
  suffix?: string;
  prefix?: string;
  format?: string;
}) {
  const [display, setDisplay] = useState('0');
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withTiming(value, {
      duration: 800,
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
  }, [value]);

  useEffect(() => {
    const timer = setInterval(() => {
      const current = Math.round(animatedValue.value);
      let displayStr = '';
      if (format === 'duration') {
        const mins = Math.floor(current / 60);
        const secs = current % 60;
        displayStr = `${mins}:${secs.toString().padStart(2, '0')}`;
      } else if (format === 'percentage') {
        displayStr = `${current}%`;
      } else {
        displayStr = `${current}`;
      }
      setDisplay(displayStr);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <KageText
      variant="mono"
      color={color}
      style={{ fontSize: 22, lineHeight: 28, letterSpacing: 1 }}
    >
      {prefix || ''}{display}{suffix || ''}
    </KageText>
  );
}

export function QuickStats({ stats, columns = 3, title, style, animate = true }: QuickStatsProps) {
  const colors = useColors();

  return (
    <GlassContainer
      accentTop
      accentColor={colors.accent.gold}
      padding={spacing.lg}
      style={[{ borderRadius: 14 }, style]}
    >
      {title && (
        <KageText
          variant="caption"
          letterSpacing={2}
          color={colors.accent.gold}
          style={{ fontSize: 7.5, textTransform: 'uppercase', marginBottom: 12 }}
        >
          {title}
        </KageText>
      )}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {stats.map((stat, i) => {
          const colColor = stat.color || colors.accent.primary;
          const width = columns === 2 ? '50%' : columns === 4 ? '25%' : '33.33%';
          return (
            <View
              key={i}
              style={{
                width,
                alignItems: 'center',
                gap: 2,
                paddingVertical: 8,
              }}
            >
              {stat.icon && (
                <KageText variant="body" style={{ fontSize: 18, marginBottom: 2 }}>
                  {stat.icon}
                </KageText>
              )}
              {animate ? (
                <AnimatedCounter
                  value={stat.value}
                  color={colColor}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  format={stat.format || 'number'}
                />
              ) : (
                <KageText
                  variant="mono"
                  color={colColor}
                  style={{ fontSize: 22, lineHeight: 28, letterSpacing: 1 }}
                >
                  {stat.prefix || ''}{stat.value}{stat.suffix || ''}
                </KageText>
              )}
              <KageText
                variant="caption"
                style={{
                  fontSize: 7,
                  letterSpacing: 1.5,
                  color: colors.text.muted,
                  textTransform: 'uppercase',
                  textAlign: 'center',
                }}
              >
                {stat.label}
              </KageText>
            </View>
          );
        })}
      </View>
    </GlassContainer>
  );
}
