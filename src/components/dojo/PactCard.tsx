import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { KageText } from '@/components/ui/KageText';
import { KageCard } from '@/components/ui/KageCard';
import { ShieldBadge } from './ShieldBadge';
import { useColors, spacing } from '@/theme';
import type { WarriorPact } from '@/store/warriorPactStore';

interface PactCardProps {
  pact: WarriorPact;
  onPress: () => void;
  delay?: number;
}

const statusColors: Record<string, string> = {
  safe: '#00CC88',
  warning: '#D4A030',
  danger: '#FF2040',
  breaking: '#C8102E',
};

const statusLabels: Record<string, string> = {
  safe: 'Streak Safe',
  warning: '⚠ Warning',
  danger: '⚡ Danger',
  breaking: '💔 Breaking',
};

export function PactCard({ pact, onPress, delay = 0 }: PactCardProps) {
  const colors = useColors();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <KageCard
        title={`${pact.partnerName}`}
        subtitle={`${pact.combinedStreak} day combined streak`}
        accentColor={statusColors[pact.status]}
        delay={delay}
        glow={pact.status === 'breaking' ? 'red' : pact.shieldLevel === 'gold' ? 'gold' : 'subtle'}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <ShieldBadge level={pact.shieldLevel} size="sm" progress={pact.shieldProgress} />
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <KageText variant="bodyBold" style={{ fontSize: 13, color: colors.text.primary }}>
                  {pact.streak} day streak
                </KageText>
              </View>
              <KageText
                variant="caption"
                style={{
                  fontSize: 9,
                  letterSpacing: 1,
                  color: statusColors[pact.status],
                }}
              >
                {statusLabels[pact.status]}
              </KageText>
            </View>
          </View>
          <KageText variant="kanji" style={{ fontSize: 20, color: statusColors[pact.status], opacity: 0.6 }}>
            絆
          </KageText>
        </View>
      </KageCard>
    </TouchableOpacity>
  );
}
