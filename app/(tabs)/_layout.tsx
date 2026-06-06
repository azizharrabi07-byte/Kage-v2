import { Tabs } from 'expo-router';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle, withTiming, withRepeat,
  withSequence, Easing, useSharedValue,
  interpolateColor,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { KageText } from '@/components/ui/KageText';
import { useColors, useTheme } from '@/theme';

const { width } = Dimensions.get('window');

const tabs = [
  { name: 'index', title: 'Home', kanji: '家' },
  { name: 'workout', title: 'Train', kanji: '武' },
  { name: 'dojo', title: 'Dojo', kanji: '道' },
  { name: 'sensei', title: 'Sensei', kanji: '先' },
  { name: 'progress', title: 'Evolve', kanji: '昇' },
  { name: 'profile', title: 'Soul', kanji: '魂' },
];

const gradientColors = ['#E31E24', '#FF6B35', '#C9A84C', '#22D3EE', '#E31E24'];

function TrainTabButton({ focused }: { focused: boolean }) {
  const colors = useColors();
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const colorIndex = useSharedValue(0);
  const pulse = useSharedValue(1);

  useEffect(() => {
    if (focused) {
      rotateX.value = withRepeat(
        withSequence(
          withTiming(12, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
          withTiming(-12, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
        ),
        -1, true,
      );
      rotateY.value = withRepeat(
        withSequence(
          withTiming(-8, { duration: 2500, easing: Easing.inOut(Easing.sin) }),
          withTiming(8, { duration: 2500, easing: Easing.inOut(Easing.sin) }),
        ),
        -1, true,
      );
      colorIndex.value = withRepeat(
        withTiming(gradientColors.length - 1, { duration: 4000, easing: Easing.linear }),
        -1, false,
      );
      pulse.value = withRepeat(
        withSequence(
          withTiming(1.05, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        ),
        -1, true,
      );
    } else {
      rotateX.value = withTiming(0, { duration: 300 });
      rotateY.value = withTiming(0, { duration: 300 });
      pulse.value = withTiming(1, { duration: 300 });
    }
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 800 },
      { rotateX: `${rotateX.value}deg` },
      { rotateY: `${rotateY.value}deg` },
      { scale: pulse.value },
    ],
  }));

  const borderGlowStyle = useAnimatedStyle(() => {
    const idx = Math.floor(colorIndex.value) % (gradientColors.length - 1);
    const c = gradientColors[idx];
    return {
      borderColor: focused ? c : colors.glass.border,
      shadowColor: c,
      shadowOpacity: focused ? 0.9 : 0.4,
      shadowRadius: focused ? 16 : 4,
    };
  });

  return (
    <Animated.View style={[styles.trainButton, animatedStyle, borderGlowStyle, { backgroundColor: focused ? colors.accent.primary + '18' : 'rgba(26,26,36,0.4)' }]}>
      <Animated.Text style={[styles.trainKanji, { color: focused ? gradientColors[0] : '#6B7280' }]}>
        武
      </Animated.Text>
      {focused && (
        <>
          <Animated.View style={[styles.trainGlowRing, borderGlowStyle]} />
          <View style={styles.trainDotRow}>
            {gradientColors.slice(0, 4).map((c, i) => (
              <View key={i} style={[styles.trainDot, { backgroundColor: c }]} />
            ))}
          </View>
        </>
      )}
    </Animated.View>
  );
}

function CustomTabIcon({ focused, kanji, label }: { focused: boolean; kanji: string; label: string }) {
  const colors = useColors();

  if (label === 'Train') {
    return <TrainTabButton focused={focused} />;
  }

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(focused ? 1.15 : 1, { duration: 150 }) }],
    shadowColor: focused ? colors.accent.primary : 'transparent',
    shadowOpacity: withTiming(focused ? 0.8 : 0.4, { duration: 150 }),
    shadowRadius: focused ? 10 : 4,
    elevation: focused ? 10 : 4,
  }));

  const textStyle = useAnimatedStyle(() => ({
    color: withTiming(focused ? colors.accent.primary : '#6B7280', { duration: 150 }),
    transform: [{ scale: withTiming(focused ? 1.1 : 1, { duration: 150 }) }],
  }));

  return (
    <Animated.View style={[styles.tabIconContainer, containerStyle]}>
      <Animated.Text style={[styles.kanjiIcon, textStyle]}>
        {kanji}
      </Animated.Text>
      {focused && (
        <View style={[StyleSheet.absoluteFillObject, styles.glowEffect, { backgroundColor: colors.accent.primary }]} />
      )}
    </Animated.View>
  );
}

export default function TabLayout() {
  const colors = useColors();
  const { mode } = useTheme();
  const isParchment = mode === 'light';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          backgroundColor: isParchment ? colors.kage.parchment : colors.kage.void,
          borderTopWidth: 1,
          borderTopColor: isParchment ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.04)',
          elevation: 0,
          shadowOpacity: 0,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarActiveTintColor: colors.accent.primary,
        tabBarInactiveTintColor: '#6B7280',
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <CustomTabIcon focused={focused} kanji={tab.kanji} label={tab.title} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(26,26,36,0.4)',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  kanjiIcon: {
    fontSize: 24,
  },
  glowEffect: {
    borderRadius: 24,
    opacity: 0.3,
  },
  trainButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
    marginTop: -8,
  },
  trainKanji: {
    fontSize: 26,
    fontWeight: '700',
  },
  trainGlowRing: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1.5,
    opacity: 0.3,
  },
  trainDotRow: {
    position: 'absolute',
    bottom: -6,
    flexDirection: 'row',
    gap: 3,
  },
  trainDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});
