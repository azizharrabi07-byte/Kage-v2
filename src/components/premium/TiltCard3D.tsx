import React, { memo, useEffect } from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { useColors } from '@/theme';

interface TiltCard3DProps {
  children: React.ReactNode;
  style?: ViewStyle;
  tiltAmount?: number;
}

export const TiltCard3D = memo(function TiltCard3D({
  children,
  style,
  tiltAmount = 5,
}: TiltCard3DProps) {
  const colors = useColors();
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const shadowOffsetX = useSharedValue(0);
  const shadowOffsetY = useSharedValue(0);

  useEffect(() => {
    const baseAmplitude = tiltAmount * 0.4; // ~2° for tiltAmount=5

    rotateX.value = withRepeat(
      withSequence(
        withTiming(baseAmplitude, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
        withTiming(-baseAmplitude, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      true,
    );

    rotateY.value = withRepeat(
      withSequence(
        withTiming(-baseAmplitude, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
        withTiming(baseAmplitude, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      true,
    );

    shadowOffsetX.value = withRepeat(
      withSequence(
        withTiming(3, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
        withTiming(-3, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      true,
    );

    shadowOffsetY.value = withRepeat(
      withSequence(
        withTiming(-3, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
        withTiming(3, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      true,
    );

    return () => {
      rotateX.value = 0;
      rotateY.value = 0;
      shadowOffsetX.value = 0;
      shadowOffsetY.value = 0;
    };
  }, [tiltAmount]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateX: `${rotateX.value}deg` },
      { rotateY: `${rotateY.value}deg` },
    ],
    shadowOffset: {
      width: interpolate(
        shadowOffsetX.value,
        [-3, 3],
        [-2, 4],
      ),
      height: interpolate(
        shadowOffsetY.value,
        [-3, 3],
        [-2, 4],
      ),
    },
    shadowOpacity: interpolate(
      Math.abs(shadowOffsetX.value) + Math.abs(shadowOffsetY.value),
      [0, 6],
      [0.5, 0.8],
    ),
  }));

  return (
    <Animated.View
      style={[
        styles.container,
        {
          shadowColor: colors.kage.void,
          backgroundColor: 'transparent',
        },
        animatedStyle,
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
});
