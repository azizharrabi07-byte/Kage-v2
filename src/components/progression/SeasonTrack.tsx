import React from 'react';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { KageText } from '@/components/ui/KageText';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { useColors, spacing } from '@/theme';

interface SeasonTrackProps {
  currentXP: number;
  seasonStartXP: number;
  seasonTargetXP: number;
  seasonNumber: number;
  seasonName: string;
}

export function SeasonTrack({ currentXP, seasonStartXP, seasonTargetXP, seasonNumber, seasonName }: SeasonTrackProps) {
  const colors = useColors();
  const progress = Math.min((currentXP - seasonStartXP) / (seasonTargetXP - seasonStartXP), 1);
  const progressPct = Math.round(progress * 100);

  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <GlassContainer intensity="medium" glow="red" accentTop accentColor={colors.accent.primary} style={{ borderRadius: 14 }}>
        <View style={{ gap: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View>
              <KageText variant="caption" style={{ fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: colors.accent.gold, marginBottom: 2 }}>
                Season {seasonNumber}
              </KageText>
              <KageText variant="bodyBold" style={{ fontSize: 14, color: colors.text.primary }}>
                {seasonName}
              </KageText>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <KageText variant="mono" style={{ fontSize: 18, color: colors.accent.primary }}>
                {progressPct}%
              </KageText>
              <KageText variant="caption" style={{ fontSize: 8, color: colors.text.muted }}>
                {currentXP.toLocaleString()} / {seasonTargetXP.toLocaleString()} XP
              </KageText>
            </View>
          </View>

          <View style={{ height: 8, borderRadius: 4, backgroundColor: colors.glass.border, overflow: 'hidden', position: 'relative' }}>
            <View
              style={{
                width: `${progressPct}%`,
                height: '100%',
                borderRadius: 4,
                backgroundColor: colors.accent.primary,
              }}
            />
            {/* Checkpoints */}
            {[0.25, 0.5, 0.75].map((cp) => (
              <View
                key={cp}
                style={{
                  position: 'absolute',
                  left: `${cp * 100}%`,
                  top: 0,
                  bottom: 0,
                  width: 1,
                  backgroundColor: colors.glass.borderLight,
                }}
              />
            ))}
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <KageText variant="caption" style={{ fontSize: 7, color: colors.text.muted }}>
              {seasonStartXP.toLocaleString()} XP
            </KageText>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <KageText variant="caption" style={{ fontSize: 7, color: colors.text.muted }}>⚔</KageText>
              <KageText variant="caption" style={{ fontSize: 7, color: colors.text.muted }}>⚔</KageText>
              <KageText variant="caption" style={{ fontSize: 7, color: colors.text.muted }}>⚔</KageText>
            </View>
            <KageText variant="caption" style={{ fontSize: 7, color: colors.text.muted }}>
              {seasonTargetXP.toLocaleString()} XP
            </KageText>
          </View>
        </View>
      </GlassContainer>
    </Animated.View>
  );
}
