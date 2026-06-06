import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ParticleData {
  id: number;
  x: number;
  yBase: number;
  r: number;
}

interface ParticleBackgroundProps {
  count?: number;
  color?: string;
  maxOpacity?: number;
}

function Particle({
  data,
  color,
  maxOpacity,
}: {
  data: ParticleData;
  color: string;
  maxOpacity: number;
}) {
  const opacity = useSharedValue(Math.random() * maxOpacity);
  const yOffset = useSharedValue(0);

  useEffect(() => {
    const dur = 1500 + Math.random() * 1500;
    opacity.value = withRepeat(
      withSequence(
        withTiming(maxOpacity, { duration: dur, easing: Easing.sin }),
        withTiming(maxOpacity * 0.3, { duration: dur, easing: Easing.sin }),
      ),
      -1,
      true,
    );
    const durY = 2000 + Math.random() * 2000;
    const dist = -(20 + Math.random() * 20);
    yOffset.value = withRepeat(
      withSequence(
        withTiming(dist, { duration: durY, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: durY, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      true,
    );
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    opacity: opacity.value,
    cy: data.yBase + yOffset.value,
  }));

  return (
    <AnimatedCircle
      cx={data.x}
      cy={data.yBase}
      r={data.r}
      fill={color}
      animatedProps={animatedProps}
    />
  );
}

export function ParticleBackground({ count = 20, color = '#FF1A1A', maxOpacity = 0.15 }: ParticleBackgroundProps) {
  const particles: ParticleData[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      x: Math.random() * 400,
      yBase: Math.random() * 800,
      r: Math.random() * 2 + 0.5,
    });
  }

  return (
    <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map((p) => (
        <Particle key={p.id} data={p} color={color} maxOpacity={maxOpacity} />
      ))}
    </Svg>
  );
}