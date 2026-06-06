import React from 'react';
import { TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';
import { useColors } from '@/theme';

interface PressScaleProps {
  onPress: () => void;
  children: React.ReactNode;
  style?: StyleProp<Animated.AnimateStyle<ViewStyle>>;
  buttonColor?: string;
  gradientColors?: string[];
  disabled?: boolean;
}

export function PressScale({ onPress, children, style, buttonColor, disabled }: PressScaleProps) {
  const colors = useColors();
  const scale = useSharedValue(1);
  const elevation = useSharedValue(8);
  const shadowOpacity = useSharedValue(0.8);

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 100 });
    elevation.value = withTiming(2, { duration: 100 });
    shadowOpacity.value = withTiming(0.4, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 12, stiffness: 100 });
    elevation.value = withSpring(8, { damping: 12, stiffness: 100 });
    shadowOpacity.value = withSpring(0.8, { damping: 12, stiffness: 100 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowOffset: { width: 0, height: elevation.value / 2 },
    shadowOpacity: shadowOpacity.value,
    shadowRadius: elevation.value,
    elevation: elevation.value,
  }));

  return (
    <Animated.View style={[
      {
        borderRadius: 12,
        shadowColor: 'rgba(0,0,0,0.7)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.7,
        shadowRadius: 6,
        elevation: 6,
        backgroundColor: buttonColor || colors.accent.primary,
        overflow: 'visible',
      },
      animatedStyle,
      style,
    ]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={disabled}
        style={{
          borderRadius: 12,
          paddingVertical: 18,
          paddingHorizontal: 25,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}
