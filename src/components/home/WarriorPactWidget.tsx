import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming, Easing } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useColors } from '@/theme';
import { KageText } from '@/components/ui/KageText';
import { Card } from '@/components/premium/Card';

interface WarriorPactWidgetProps {
  partnerName?: string;
  sharedStreak?: number;
  hasBattleCry?: boolean;
  isShieldIntact?: boolean;
}

export function WarriorPactWidget({
  partnerName = 'Kenshin',
  sharedStreak = 10,
  hasBattleCry = true,
  isShieldIntact = true,
}: WarriorPactWidgetProps) {
  const colors = useColors();
  const router = useRouter();
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(1);

  useEffect(() => {
    if (hasBattleCry) {
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 500, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) })
        ),
        -1, false
      );
      pulseOpacity.value = withRepeat(
        withSequence(
          withTiming(0.7, { duration: 500, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) })
        ),
        -1, false
      );
    }
  }, [hasBattleCry]);

  const animatedBattleCryStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  return (
    <Card style={styles.card} accentColor={colors.accent.blue}>
      <View style={styles.contentContainer}>
        <View style={styles.leftSection}>
          <View style={[styles.avatar, { borderColor: 'rgba(255,255,255,0.2)' }]}>
            <KageText variant="h2" color={colors.text.secondary} style={{ fontSize: 24 }}>
              {partnerName[0]}
            </KageText>
          </View>
          <View style={styles.pactDetails}>
            <KageText variant="bodyBold">{partnerName}'s Pact</KageText>
            <KageText variant="caption" color={colors.text.muted}>
              Shared Streak: {sharedStreak} days
            </KageText>
          </View>
        </View>
        <View style={styles.rightSection}>
          <KageText style={{ fontSize: 28 }}>
            {isShieldIntact ? '🛡️' : '⚔️'}
          </KageText>
          {hasBattleCry && (
            <TouchableOpacity onPress={() => router.push('/battle-cry')} style={styles.battleCryTouchArea}>
              <Animated.View style={[styles.battleCryBadge, animatedBattleCryStyle]}>
                <KageText variant="bodyBold" style={{ color: '#FFFFFF', fontSize: 16, marginTop: -2 }}>!</KageText>
              </Animated.View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { width: '100%', marginTop: 10 },
  contentContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 5 },
  leftSection: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 50, height: 50, borderRadius: 25, marginRight: 10,
    borderWidth: 2, alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  pactDetails: {},
  rightSection: { flexDirection: 'row', alignItems: 'center' },
  battleCryTouchArea: { marginLeft: 15 },
  battleCryBadge: {
    width: 24, height: 24, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#FF3B30',
  },
});
