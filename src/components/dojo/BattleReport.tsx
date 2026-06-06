import React from 'react';
import { View } from 'react-native';
import { KageText } from '@/components/ui/KageText';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { useColors, spacing } from '@/theme';

interface BattleReportProps {
  warriorName: string;
  streak: number;
  rank: string;
  workoutsCompleted: number;
  xpEarned: number;
  pactStreak?: number;
  date?: string;
}

export function BattleReport({
  warriorName, streak, rank, workoutsCompleted, xpEarned, pactStreak, date,
}: BattleReportProps) {
  const colors = useColors();
  const today = date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <GlassContainer
      intensity="heavy"
      glow="red"
      accentTop
      accentColor={colors.accent.primary}
      style={{ borderRadius: 16, width: '100%', maxWidth: 340 }}
    >
      <View style={{ alignItems: 'center', gap: 12 }}>
        {/* Header */}
        <View style={{ alignItems: 'center', gap: 2 }}>
          <KageText variant="kanji" style={{ fontSize: 20, color: colors.accent.primary, letterSpacing: 4 }}>影</KageText>
          <KageText variant="caption" style={{ fontSize: 8, letterSpacing: 3, textTransform: 'uppercase', color: colors.accent.gold }}>
            BATTLE REPORT
          </KageText>
        </View>

        {/* Divider */}
        <View style={{ width: '60%', height: 1, backgroundColor: colors.glass.border }} />

        {/* Name + Date */}
        <View style={{ alignItems: 'center' }}>
          <KageText variant="h3" style={{ fontSize: 22, letterSpacing: 2, color: colors.text.primary }}>
            {warriorName}
          </KageText>
          <KageText variant="caption" style={{ fontSize: 8, color: colors.text.muted, letterSpacing: 1, marginTop: 2 }}>
            {today}
          </KageText>
        </View>

        {/* Stats Grid */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {[
            { label: 'STREAK', value: `${streak}d`, color: colors.accent.primary },
            { label: 'RANK', value: rank, color: colors.accent.gold },
            { label: 'WORKOUTS', value: workoutsCompleted.toString(), color: colors.status.ready },
            { label: 'XP', value: `+${xpEarned}`, color: colors.accent.neon },
            ...(pactStreak ? [{ label: 'PACT', value: `${pactStreak}d`, color: colors.dojo.pact }] : []),
          ].map((s) => (
            <View
              key={s.label}
              style={{
                backgroundColor: colors.glass.medium,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: colors.glass.border,
                paddingHorizontal: 12,
                paddingVertical: 8,
                alignItems: 'center',
                minWidth: 60,
              }}
            >
              <KageText variant="mono" style={{ fontSize: 16, color: s.color }}>{s.value}</KageText>
              <KageText variant="caption" style={{ fontSize: 7, letterSpacing: 1, color: colors.text.muted }}>
                {s.label}
              </KageText>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={{ width: '100%', height: 1, backgroundColor: colors.glass.border }} />
        <KageText variant="caption" style={{ fontSize: 7, letterSpacing: 2, color: colors.text.muted, textTransform: 'uppercase' }}>
          KAGE · The Shadow Warrior
        </KageText>
      </View>
    </GlassContainer>
  );
}
