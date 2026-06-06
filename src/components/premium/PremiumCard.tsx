import React from 'react';
import { View, TouchableOpacity, type ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { useColors } from '@/theme';

interface PremiumCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  glowColor?: string;
  onPress?: () => void;
  isLight?: boolean;
}

export function PremiumCard({ children, style, glowColor, onPress, isLight = false }: PremiumCardProps) {
  const colors = useColors();
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const shadowVal = useSharedValue(0);

  const bg = isLight
    ? { backgroundColor: colors.kage.parchmentCard, borderColor: colors.kage.parchmentBorder }
    : { backgroundColor: colors.kage.sumi, borderColor: 'rgba(255,255,255,0.05)' };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
    shadowOpacity: shadowVal.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15, stiffness: 200 });
    translateY.value = withSpring(-2, { damping: 15, stiffness: 200 });
    shadowVal.value = withTiming(0.6, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 12, stiffness: 150 });
    translateY.value = withSpring(0, { damping: 12, stiffness: 150 });
    shadowVal.value = withTiming(0, { duration: 100 });
  };

  return (
    <Animated.View
      style={[
        {
          borderRadius: 16,
          borderWidth: 1,
          padding: 20,
          shadowColor: glowColor || colors.accent.glow,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 12,
          elevation: 6,
          overflow: 'hidden',
        },
        bg,
        animatedStyle,
        style,
      ]}
    >
      <View
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.15,
          backgroundColor: isLight
            ? 'transparent'
            : 'transparent',
          backgroundImage: isLight
            ? undefined
            : undefined,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.12,
          backgroundColor: isLight
            ? 'rgba(193,39,45,0.04)'
            : 'rgba(255,255,255,0.06)',
        }}
      />
      {onPress ? (
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={onPress}
        >
          {children}
        </TouchableOpacity>
      ) : (
        children
      )}
    </Animated.View>
  );
}
