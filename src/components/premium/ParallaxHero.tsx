import React, { memo } from 'react';
import {
  Dimensions,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useColors } from '@/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ParallaxHeroProps {
  imageSource: { uri: string } | number;
  height?: number;
  overlayColor?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export const ParallaxHero = memo(function ParallaxHero({
  imageSource,
  height = 300,
  overlayColor,
  children,
  style,
  contentContainerStyle,
}: ParallaxHeroProps) {
  const colors = useColors();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [-height, 0, height],
      [1.3, 1, 0.9],
      Extrapolation.CLAMP,
    );

    const translateY = interpolate(
      scrollY.value,
      [-height, 0, height],
      [-height * 0.3, 0, height * 0.15],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{ scale }, { translateY }],
    };
  });

  const gradientColors: [string, string, ...string[]] = overlayColor
    ? ['transparent', overlayColor]
    : ['transparent', colors.kage.void];

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      style={[styles.scroll, style]}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingTop: height },
        contentContainerStyle,
      ]}
      bounces={false}
    >
      <Animated.Image
        source={imageSource}
        style={[styles.image, { height }, imageAnimatedStyle]}
        resizeMode="cover"
      />

      <LinearGradient
        colors={gradientColors}
        locations={[0, 1]}
        style={[styles.gradient, { height: height * 0.4, top: height - height * 0.4 }]}
        pointerEvents="none"
      />

      {children}
    </Animated.ScrollView>
  );
});

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    zIndex: -1,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
});
