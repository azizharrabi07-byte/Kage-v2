import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useColors } from '@/theme';
import { KageText } from '@/components/ui/KageText';
import { Card } from '@/components/premium/Card';

interface StreakBannerProps {
  currentStreak?: number;
}

export function StreakBanner({ currentStreak = 15 }: StreakBannerProps) {
  const colors = useColors();

  return (
    <Card
      style={styles.card}
      accentColor={colors.accent.primary}
    >
      <View style={styles.contentContainer}>
        <KageText variant="h2" color={colors.accent.primary} style={{ fontSize: 36, letterSpacing: 2 }}>
          {currentStreak}
        </KageText>
        <KageText variant="caption" letterSpacing={2} color={colors.text.secondary} style={{ fontSize: 8, textTransform: 'uppercase' }}>
          Day Streak
        </KageText>
      </View>
      <View style={styles.flameIndicator}>
        <KageText variant="bodyBold" style={{ fontSize: 16, color: '#FFFFFF', marginRight: 5 }}>
          FLAME
        </KageText>
        <KageText style={{ fontSize: 24 }}>🔥</KageText>
      </View>
      <KageText variant="caption" style={styles.subtext}>
        Keep the fire burning, warrior!
      </KageText>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 120,
    marginTop: 10,
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  flameIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  subtext: {
    alignSelf: 'flex-end',
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
});
