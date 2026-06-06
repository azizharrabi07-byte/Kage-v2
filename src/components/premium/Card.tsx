import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import Animated from 'react-native-reanimated';
import { useColors } from '@/theme';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<Animated.AnimateStyle<ViewStyle>>;
  accentColor?: string;
  gradientColors?: string[];
}

export function Card({ children, style, accentColor }: CardProps) {
  const colors = useColors();

  return (
    <Animated.View
      style={[
        {
          borderRadius: 16,
          backgroundColor: '#2A2A3A',
          shadowColor: accentColor ? `${accentColor}60` : 'rgba(0,0,0,0.6)',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.8,
          shadowRadius: 10,
          elevation: 8,
          padding: 16,
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}
