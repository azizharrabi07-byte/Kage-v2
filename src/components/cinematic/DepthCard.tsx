import { useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "@/theme";

type DepthCardProps = {
  children: React.ReactNode;
  width?: number;
  height?: number;
  depth?: number;
  gradientColors?: string[];
};

export function DepthCard({
  children,
  width = 320,
  height = 200,
  depth = 15,
  gradientColors,
}: DepthCardProps) {
  const colors = useColors();
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      scale.value = withSpring(1.02, { damping: 15 });
    })
    .onUpdate((e) => {
      rotateX.value = interpolate(e.translationY, [-height / 2, height / 2], [depth, -depth]);
      rotateY.value = interpolate(e.translationX, [-width / 2, width / 2], [-depth, depth]);
    })
    .onEnd(() => {
      rotateX.value = withSpring(0, { damping: 15 });
      rotateY.value = withSpring(0, { damping: 15 });
      scale.value = withSpring(1, { damping: 15 });
    });

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 800 },
      { rotateX: `${rotateX.value}deg` },
      { rotateY: `${rotateY.value}deg` },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[animStyle, { width, height, borderRadius: 16 }]}>
        <LinearGradient
          colors={gradientColors || [colors.glass.medium, colors.glass.light]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[StyleSheet.absoluteFill, { borderRadius: 16, borderWidth: 1, borderColor: colors.glass.border }]}
        >
          <View style={{ flex: 1, padding: 16 }}>{children}</View>
        </LinearGradient>
      </Animated.View>
    </GestureDetector>
  );
}
