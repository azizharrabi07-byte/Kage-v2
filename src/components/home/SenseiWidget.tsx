import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming, Easing, interpolate } from 'react-native-reanimated';
import { useColors } from '@/theme';
import { KageText } from '@/components/ui/KageText';
import { Card } from '@/components/premium/Card';

const senseiQuotes = [
  "Mastery begins with discipline.",
  "The path of the warrior is endless.",
  "True strength lies within.",
  "Patience is your greatest weapon.",
  "Observe, adapt, overcome.",
];

export function SenseiWidget() {
  const colors = useColors();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const floatTranslateY = useSharedValue(0);
  const glowOpacity = useSharedValue(0.5);

  useEffect(() => {
    floatTranslateY.value = withRepeat(
      withSequence(
        withTiming(-5, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1, false
    );
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.5, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1, false
    );
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % senseiQuotes.length);
    }, 5000);
    return () => clearInterval(quoteInterval);
  }, []);

  const animatedHologramStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatTranslateY.value }],
    shadowColor: colors.accent.blue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: glowOpacity.value,
    shadowRadius: 10,
    elevation: interpolate(glowOpacity.value, [0.5, 0.8], [5, 10]),
  }));

  return (
    <Card style={styles.card} accentColor={colors.accent.blue}>
      <View style={styles.contentContainer}>
        <Animated.View style={[styles.hologramContainer, animatedHologramStyle, { backgroundColor: 'rgba(46,58,92,0.3)' }]}>
          <KageText style={{ fontSize: 30, opacity: 0.8 }}>🧘</KageText>
        </Animated.View>
        <View style={styles.quoteContainer}>
          <KageText variant="caption" color={colors.text.muted} style={{ fontSize: 9 }}>
            SENSEI'S WISDOM:
          </KageText>
          <KageText variant="body" style={{ fontStyle: 'italic', fontSize: 14, lineHeight: 20, marginTop: 4 }}>
            "{senseiQuotes[currentQuoteIndex]}"
          </KageText>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { width: '100%', marginTop: 10 },
  contentContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 5 },
  hologramContainer: {
    width: 60, height: 60, borderRadius: 30,
    justifyContent: 'center', alignItems: 'center', marginRight: 15,
  },
  quoteContainer: { flex: 1 },
});
