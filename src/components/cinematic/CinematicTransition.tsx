import { useRef } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  FadeInDown,
  FadeIn,
  SlideInRight,
  ZoomIn,
  interpolate,
} from "react-native-reanimated";

const DURATION = 400;

export function withStagger(delay: number) {
  return {
    entering: FadeInDown.delay(delay).duration(DURATION).easing(Easing.out(Easing.cubic)),
  };
}

export function fadeSlide(delay = 0) {
  return {
    entering: SlideInRight.delay(delay).duration(DURATION).easing(Easing.out(Easing.cubic)),
  };
}

export function zoomFade(delay = 0) {
  return {
    entering: ZoomIn.delay(delay).duration(DURATION).springify().damping(12),
  };
}

export function fadeIn(delay = 0) {
  return {
    entering: FadeIn.delay(delay).duration(DURATION).easing(Easing.out(Easing.cubic)),
  };
}

type CinematicCardProps = {
  children: React.ReactNode;
  index?: number;
  style?: Record<string, unknown>;
};

export function CinematicCard({ children, index = 0, style }: CinematicCardProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 80).duration(400).springify().damping(14)}
      style={[{ borderRadius: 12, overflow: "hidden" }, style as Record<string, unknown>]}
    >
      {children}
    </Animated.View>
  );
}
