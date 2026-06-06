import React from 'react';
import { View, type ViewStyle } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { GlassContainer } from './GlassContainer';
import { KageText } from './KageText';
import { useColors, spacing } from '@/theme';

interface KageCardProps {
  title?: string;
  subtitle?: string;
  accentColor?: string;
  children: React.ReactNode;
  style?: ViewStyle;
  delay?: number;
  glow?: 'none' | 'subtle' | 'red' | 'gold';
}

export function KageCard({
  title,
  subtitle,
  accentColor,
  children,
  style,
  delay = 0,
  glow = 'none',
}: KageCardProps) {
  const colors = useColors();
  const col = accentColor || colors.accent.primary;

  return (
    <Animated.View entering={FadeInDown.delay(delay).duration(600).springify()}>
      <GlassContainer
        intensity="medium"
        glow={glow}
        padding={spacing.lg}
        accentTop
        accentColor={col}
        style={[{ borderRadius: 14 }, style]}
      >
        {title && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: subtitle ? 4 : 12 }}>
            <View style={{ width: 3, height: 16, borderRadius: 1.5, backgroundColor: col }} />
            <KageText
              variant="bodyBold"
              color={col}
              style={{ fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}
            >
              {title}
            </KageText>
          </View>
        )}
        {subtitle && (
          <KageText
            variant="caption"
            color={colors.text.muted}
            style={{ fontSize: 10, marginBottom: 12 }}
          >
            {subtitle}
          </KageText>
        )}
        {children}
      </GlassContainer>
    </Animated.View>
  );
}
