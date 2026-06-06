import React, { useEffect } from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  useScrollViewOffset,
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

interface HeroParallaxProps {
  imageSource: any;
  height?: number;
  gradientColors?: string[];
  overlayOpacity?: number;
}

export function HeroParallax({
  imageSource,
  height = 480,
  overlayOpacity = 0.6,
}: HeroParallaxProps) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1.1);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
    scale.value = withTiming(1, { duration: 2000 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={[styles.container, { height }]}>
      <Animated.Image
        source={imageSource}
        style={[styles.image, animatedStyle]}
        resizeMode="cover"
      />
      <View
        style={[
          styles.gradient,
          { opacity: overlayOpacity },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    inset: 0,
    backgroundColor: '#0B0B10',
  },
});
