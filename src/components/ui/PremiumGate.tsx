import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { KageText } from '@/components/ui/KageText';
import { KageButton } from '@/components/ui/KageButton';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { useColors, spacing } from '@/theme';

interface PremiumGateProps {
  feature: string;
  requiredTier: string;
  variant?: 'card' | 'inline';
}

export function PremiumGate({ feature, requiredTier, variant = 'card' }: PremiumGateProps) {
  const colors = useColors();
  const router = useRouter();

  if (variant === 'inline') {
    return (
      <TouchableOpacity
        onPress={() => router.push('/settings')}
        style={{
          flexDirection: 'row', alignItems: 'center', gap: 6,
          paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8,
          backgroundColor: colors.accent.gold + '15',
          borderWidth: 1, borderColor: colors.accent.gold + '33',
        }}
      >
        <KageText variant="caption" style={{ fontSize: 8, color: colors.accent.gold, letterSpacing: 1 }}>
          🔒 {requiredTier.toUpperCase()}
        </KageText>
        <KageText variant="caption" style={{ fontSize: 8, color: colors.text.muted, flex: 1 }}>
          {feature}
        </KageText>
        <KageText variant="caption" style={{ fontSize: 9, color: colors.accent.gold }}>→</KageText>
      </TouchableOpacity>
    );
  }

  return (
    <GlassContainer glow="gold" accentTop accentColor={colors.accent.gold} style={{ borderRadius: 14 }}>
      <View style={{ alignItems: 'center', gap: 12, paddingVertical: 8 }}>
        <KageText variant="kanji" style={{ fontSize: 28, color: colors.accent.gold, opacity: 0.5 }}>鍵</KageText>
        <KageText variant="body" style={{ fontSize: 13, color: colors.text.secondary, textAlign: 'center' }}>
          {feature} requires <KageText variant="bodyBold" style={{ fontSize: 13, color: colors.accent.gold }}>{requiredTier}</KageText>
        </KageText>
        <KageButton
          title="UPGRADE NOW"
          variant="gold"
          size="sm"
          onPress={() => router.push('/settings')}
        />
      </View>
    </GlassContainer>
  );
}
