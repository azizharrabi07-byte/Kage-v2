import React from 'react';
import { View } from 'react-native';
import { KageText } from '@/components/ui/KageText';
import { useColors } from '@/theme';

type ShieldLevel = 'bronze' | 'silver' | 'gold' | 'onyx';

interface ShieldBadgeProps {
  level: ShieldLevel;
  size?: 'sm' | 'md' | 'lg';
  progress?: number;
}

const shieldConfig: Record<ShieldLevel, { label: string; color: string; glow: string; kanji: string }> = {
  bronze: { label: 'BRONZE', color: '#CD7F32', glow: 'rgba(205,127,50,0.3)', kanji: '銅' },
  silver: { label: 'SILVER', color: '#C0C0C0', glow: 'rgba(192,192,192,0.3)', kanji: '銀' },
  gold: { label: 'GOLD', color: '#C9A84C', glow: 'rgba(201,168,76,0.4)', kanji: '金' },
  onyx: { label: 'ONYX', color: '#1A1A2E', glow: 'rgba(200,16,46,0.5)', kanji: '漆' },
};

export function ShieldBadge({ level, size = 'md', progress = 0 }: ShieldBadgeProps) {
  const colors = useColors();
  const config = shieldConfig[level];
  const dim = size === 'sm' ? 40 : size === 'md' ? 56 : 72;
  const iconSize = size === 'sm' ? 14 : size === 'md' ? 20 : 26;
  const fontSize = size === 'sm' ? 7 : size === 'md' ? 8 : 10;

  return (
    <View style={{ alignItems: 'center', gap: 4 }}>
      <View
        style={{
          width: dim,
          height: dim,
          borderRadius: dim / 2,
          backgroundColor: level === 'onyx' ? '#0D0D1A' : colors.bg.tertiary,
          borderWidth: 2,
          borderColor: config.color,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: config.glow,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 10,
          elevation: 8,
        }}
      >
        <KageText variant="kanji" style={{ fontSize: iconSize, lineHeight: iconSize * 1.2, color: config.color }}>
          {config.kanji}
        </KageText>
      </View>
      <KageText
        variant="caption"
        style={{
          fontSize: fontSize,
          letterSpacing: 1.5,
          color: config.color,
          textTransform: 'uppercase',
        }}
      >
        {config.label}
      </KageText>
      {progress > 0 && (
        <View
          style={{
            width: dim * 0.8,
            height: 3,
            borderRadius: 1.5,
            backgroundColor: colors.glass.border,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              width: `${Math.min(progress * 100, 100)}%`,
              height: '100%',
              backgroundColor: config.color,
              borderRadius: 1.5,
            }}
          />
        </View>
      )}
    </View>
  );
}
