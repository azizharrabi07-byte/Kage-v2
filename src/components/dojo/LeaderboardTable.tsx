import React from 'react';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { KageText } from '@/components/ui/KageText';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { useColors, spacing } from '@/theme';
import type { LeaderboardEntry } from '@/store/warriorPactStore';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  currentPactId?: string;
  delay?: number;
}

const rankColors: Record<number, string> = {
  1: '#C9A84C',
  2: '#C0C0C0',
  3: '#CD7F32',
};

export function LeaderboardTable({ entries, currentPactId, delay = 0 }: LeaderboardTableProps) {
  const colors = useColors();

  return (
    <Animated.View entering={FadeInDown.delay(delay).duration(600).springify()}>
      <GlassContainer
        intensity="medium"
        glow="subtle"
        accentTop
        accentColor={colors.dojo.leaderboard}
        style={{ borderRadius: 14 }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <View style={{ width: 3, height: 16, borderRadius: 1.5, backgroundColor: colors.dojo.leaderboard }} />
          <KageText
            variant="bodyBold"
            style={{ fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: colors.dojo.leaderboard }}
          >
            Squad Leaderboard
          </KageText>
        </View>

        <View style={{ flexDirection: 'row', paddingBottom: 6, borderBottomWidth: 1, borderBottomColor: colors.glass.border, marginBottom: 6 }}>
          <KageText variant="caption" style={{ width: 28, fontSize: 8, letterSpacing: 1, color: colors.text.muted }}>#</KageText>
          <KageText variant="caption" style={{ flex: 1, fontSize: 8, letterSpacing: 1, color: colors.text.muted }}>PARTNERS</KageText>
          <KageText variant="caption" style={{ width: 50, textAlign: 'right', fontSize: 8, letterSpacing: 1, color: colors.text.muted }}>STREAK</KageText>
          <KageText variant="caption" style={{ width: 50, textAlign: 'right', fontSize: 8, letterSpacing: 1, color: colors.text.muted }}>SHIELD</KageText>
        </View>

        {entries.slice(0, 10).map((entry, i) => {
          const isCurrent = entry.pactId === currentPactId;
          const rankColor = rankColors[entry.rank] || colors.text.muted;

          return (
            <View
              key={entry.pactId}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
                borderBottomWidth: i < entries.length - 1 ? 1 : 0,
                borderBottomColor: colors.glass.borderLight,
                backgroundColor: isCurrent ? colors.accent.glow + '15' : 'transparent',
                borderRadius: i === entries.length - 1 ? 0 : 0,
                paddingHorizontal: 4,
              }}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: isCurrent ? colors.accent.glow + '22' : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <KageText
                  variant="mono"
                  style={{
                    fontSize: 11,
                    color: entry.rank <= 3 ? rankColor : colors.text.muted,
                    fontWeight: entry.rank <= 3 ? '700' : '400',
                  }}
                >
                  {entry.rank <= 3 ? ['🥇', '🥈', '🥉'][entry.rank - 1] : entry.rank}
                </KageText>
              </View>

              <KageText
                variant="body"
                style={{
                  flex: 1,
                  fontSize: 12,
                  color: isCurrent ? colors.accent.primary : colors.text.primary,
                  letterSpacing: 0.5,
                }}
              >
                {entry.partnerName}
                {isCurrent ? ' (you)' : ''}
              </KageText>

              <KageText variant="mono" style={{ width: 50, textAlign: 'right', fontSize: 12, color: colors.accent.gold }}>
                {entry.combinedStreak}
              </KageText>

              <KageText
                variant="caption"
                style={{
                  width: 50,
                  textAlign: 'right',
                  fontSize: 9,
                  letterSpacing: 1,
                  color: entry.shieldLevel === 'gold' ? colors.accent.gold :
                    entry.shieldLevel === 'onyx' ? colors.dojo.cryActive :
                    colors.text.muted,
                }}
              >
                {entry.shieldLevel.toUpperCase()}
              </KageText>
            </View>
          );
        })}
      </GlassContainer>
    </Animated.View>
  );
}
