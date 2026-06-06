import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { KageText } from '@/components/ui/KageText';
import { KageButton } from '@/components/ui/KageButton';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { useColors, spacing } from '@/theme';
import type { BattleCry } from '@/store/warriorPactStore';

interface BattleCryWidgetProps {
  battleCry: BattleCry;
  partnerName: string;
  onRespond: () => void;
}

export function BattleCryWidget({ battleCry, partnerName, onRespond }: BattleCryWidgetProps) {
  const colors = useColors();
  const [remaining, setRemaining] = useState(900);

  useEffect(() => {
    if (battleCry.status !== 'pending') return;
    const triggered = new Date(battleCry.triggeredAt).getTime();
    const deadline = triggered + 900000;

    const tick = () => {
      const now = Date.now();
      const left = Math.max(0, Math.floor((deadline - now) / 1000));
      setRemaining(left);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [battleCry]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const isUrgent = remaining < 300;

  if (battleCry.status !== 'pending') return null;

  return (
    <Animated.View entering={FadeInDown.duration(600).springify()}>
      <GlassContainer
        intensity="medium"
        glow={isUrgent ? 'red' : 'subtle'}
        accentTop
        accentColor={isUrgent ? colors.dojo.cryActive : colors.accent.gold}
        style={{ borderRadius: 14, borderColor: isUrgent ? colors.dojo.cryActive + '44' : colors.glass.border }}
      >
        <View style={{ alignItems: 'center', gap: 8 }}>
          <KageText variant="kanji" style={{ fontSize: 28, color: colors.dojo.cryActive, letterSpacing: 6 }}>
            鬨
          </KageText>
          <KageText
            variant="bodyBold"
            style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: colors.dojo.cryActive }}
          >
            Battle Cry!
          </KageText>
          <KageText variant="body" style={{ fontSize: 13, color: colors.text.secondary, textAlign: 'center' }}>
            {partnerName} challenges you!
          </KageText>

          {remaining > 0 ? (
            <KageText
              variant="mono"
              style={{
                fontSize: 28,
                letterSpacing: 3,
                color: isUrgent ? colors.accent.neon : colors.accent.gold,
              }}
            >
              {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
            </KageText>
          ) : (
            <KageText variant="body" style={{ fontSize: 13, color: colors.text.muted }}>Time expired</KageText>
          )}

          {remaining > 0 && (
            <KageButton title="RESPOND" variant={isUrgent ? 'lockIn' : 'primary'} size="md" onPress={onRespond} />
          )}
        </View>
      </GlassContainer>
    </Animated.View>
  );
}
