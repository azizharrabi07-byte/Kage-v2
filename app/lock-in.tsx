import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue, useAnimatedStyle,
  withTiming, withRepeat, Easing, interpolate,
} from 'react-native-reanimated';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { KageText } from '@/components/ui/KageText';
import { KageButton } from '@/components/ui/KageButton';
import { InkDivider } from '@/components/japanese/InkDivider';
import { useColors, spacing } from '@/theme';
import { addXP, incrementLockIn } from '@/store/progressionStore';

type Phase = 'ready' | 'active' | 'complete';

export default function LockInScreen() {
  const router = useRouter();
  const colors = useColors();
  const [phase, setPhase] = useState<Phase>('ready');
  const [seconds, setSeconds] = useState(0);
  const [focusDuration] = useState(25 * 60);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const bgGlow = useSharedValue(0);
  const readyOpacity = useSharedValue(1);
  const activeOpacity = useSharedValue(0);

  useEffect(() => {
    readyOpacity.value = withTiming(1, { duration: 600, easing: Easing.bezier(0.16, 1, 0.3, 1) });
  }, []);

  useEffect(() => {
    bgGlow.value = phase === 'active'
      ? withRepeat(withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.sin) }), -1, true)
      : withTiming(0, { duration: 500 });
  }, [phase]);

  useEffect(() => {
    if (seconds >= focusDuration && phase === 'active') {
      setPhase('complete');
      stopTimer();
      incrementLockIn();
      addXP('focus', Math.floor(focusDuration / 60) * 10);
    }
  }, [seconds, focusDuration, phase]);

  function startTimer() {
    addXP('focus', 5);
    setPhase('active');
    setSeconds(0);
    readyOpacity.value = withTiming(0, { duration: 300 });
    setTimeout(() => { activeOpacity.value = withTiming(1, { duration: 800, easing: Easing.bezier(0.16, 1, 0.3, 1) }); }, 200);
    intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  }

  function stopTimer() { if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; } }
  function resetTimer() { stopTimer(); setPhase('ready'); setSeconds(0); activeOpacity.value = withTiming(0, { duration: 300 }); setTimeout(() => { readyOpacity.value = withTiming(1, { duration: 600 }); }, 200); }

  const remaining = focusDuration - seconds;
  const remMins = Math.floor(remaining / 60);
  const remSecs = remaining % 60;
  const timeStr = `${remMins.toString().padStart(2, '0')}:${remSecs.toString().padStart(2, '0')}`;

  const glowStyle = useAnimatedStyle(() => ({ opacity: interpolate(bgGlow.value, [0, 1], [0.04, 0.12]) }));
  const bgStyle = useAnimatedStyle(() => ({ opacity: readyOpacity.value }));
  const actStyle = useAnimatedStyle(() => ({ opacity: activeOpacity.value }));

  return (
    <ScreenContainer safeTop safeBottom={false}>
      <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: colors.accent.primary }, glowStyle]} />

      {phase === 'ready' && (
        <Animated.View style={[styles.phase, bgStyle]}>
          <View style={{ alignItems: 'center', gap: 20, width: '100%' }}>
            <KageText variant="caption" letterSpacing={4} color={colors.accent.gold} style={{ fontSize: 8, textTransform: 'uppercase' }}>Focus Session</KageText>
            <KageText variant="h2" letterSpacing={8}>LOCK IN</KageText>
            <InkDivider width={80} thickness="thin" color={colors.accent.primary} />
            <KageText variant="body" align="center" color={colors.text.secondary} style={{ fontSize: 14, maxWidth: 220 }}>
              Clear your mind. Focus your spirit.
            </KageText>
            <KageText variant="caption" align="center" color={colors.text.muted} style={{ fontSize: 9, letterSpacing: 2 }}>
              {Math.floor(focusDuration / 60)} MINUTE SESSION
            </KageText>
            <KageButton title="BEGIN FOCUS" variant="lockIn" size="lg" fullWidth onPress={startTimer} style={{ marginTop: 12 }} />
            <KageButton title="RETURN" variant="ghost" size="sm" onPress={() => router.back()} style={{ marginTop: 4 }} />
          </View>
        </Animated.View>
      )}

      {phase === 'active' && (
        <Animated.View style={[styles.phase, actStyle]}>
          <View style={{ alignItems: 'center', gap: 20, width: '100%' }}>
            <KageText variant="caption" letterSpacing={4} color={colors.accent.gold} style={{ fontSize: 8, textTransform: 'uppercase' }}>In Focus</KageText>
            <KageText variant="giant" color={colors.accent.neon} align="center" style={{ marginVertical: -16, letterSpacing: 6 }}>
              {timeStr}
            </KageText>
            <View style={{ width: '80%', height: 3, backgroundColor: colors.glass.border, borderRadius: 1.5, overflow: 'hidden' }}>
              <View style={{ width: `${((focusDuration - remaining) / focusDuration) * 100}%`, height: '100%', backgroundColor: colors.accent.primary, borderRadius: 1.5 }} />
            </View>
            <KageButton title="END SESSION" variant="ghost" size="sm" onPress={resetTimer} style={{ marginTop: 20 }} />
          </View>
          {['TL', 'TR', 'BL', 'BR'].map((pos) => (
            <View key={pos} style={[styles.corner, {
              [pos.startsWith('T') ? 'top' : 'bottom']: 20,
              [pos.endsWith('L') ? 'left' : 'right']: 20,
              borderTopWidth: pos.includes('T') ? 2 : 0,
              borderBottomWidth: pos.includes('B') ? 2 : 0,
              borderLeftWidth: pos.endsWith('L') ? 2 : 0,
              borderRightWidth: pos.endsWith('R') ? 2 : 0,
              borderColor: colors.accent.primary,
            }]} />
          ))}
        </Animated.View>
      )}

      {phase === 'complete' && (
        <View style={styles.phase}>
          <View style={{ alignItems: 'center', gap: 20, width: '100%' }}>
            <KageText variant="caption" letterSpacing={4} color={colors.accent.gold} style={{ fontSize: 8, textTransform: 'uppercase' }}>Session Complete</KageText>
            <KageText variant="h2" letterSpacing={8} color={colors.accent.primary}>COMPLETE</KageText>
            <KageText variant="display" color={colors.accent.gold} align="center" style={{ marginVertical: 8 }}>
              +{Math.floor(focusDuration / 60) * 10} XP
            </KageText>
            <KageText variant="body" align="center" color={colors.text.secondary} style={{ fontSize: 14 }}>
              Discipline sharpened.
            </KageText>
            <KageButton title="CONTINUE" variant="primary" size="lg" fullWidth onPress={() => router.back()} style={{ marginTop: 12 }} />
          </View>
        </View>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  phase: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing.xxl },
  corner: { position: 'absolute', width: 36, height: 36, opacity: 0.3 },
});