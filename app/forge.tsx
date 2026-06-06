import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { KageText } from '@/components/ui/KageText';
import { KageButton } from '@/components/ui/KageButton';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { ParticleBackground } from '@/components/cinematic/ParticleBackground';
import { useColors, spacing } from '@/theme';
import { useWarriorPactStore } from '@/store/warriorPactStore';

export default function ForgePactScreen() {
  const router = useRouter();
  const colors = useColors();
  const { addPact, pacts } = useWarriorPactStore();
  const [code, setCode] = useState('');
  const [mode, setMode] = useState<'create' | 'join'>('create');

  const handleCreate = () => {
    const newPact = {
      id: `pact_${Date.now()}`,
      partnerId: `partner_${Math.random().toString(36).slice(2, 8)}`,
      partnerName: 'Awaiting Warrior',
      streak: 0,
      combinedStreak: 0,
      shieldLevel: 'bronze' as const,
      shieldProgress: 0,
      lastWorkoutDate: new Date().toISOString(),
      partnerLastWorkoutDate: new Date().toISOString(),
      status: 'safe' as const,
      createdAt: new Date().toISOString(),
      inviteCode: Math.random().toString(36).toUpperCase().slice(2, 8),
    };
    addPact(newPact);
    router.replace(`/warrior-oath?pactId=${newPact.id}`);
  };

  const handleJoin = () => {
    if (code.trim().length < 4) return;
    const newPact = {
      id: `pact_${Date.now()}`,
      partnerId: `partner_${Math.random().toString(36).slice(2, 8)}`,
      partnerName: `Warrior_${code.slice(0, 4)}`,
      streak: 0,
      combinedStreak: 0,
      shieldLevel: 'bronze' as const,
      shieldProgress: 0,
      lastWorkoutDate: new Date().toISOString(),
      partnerLastWorkoutDate: new Date().toISOString(),
      status: 'safe' as const,
      createdAt: new Date().toISOString(),
    };
    addPact(newPact);
    router.replace(`/pact/${newPact.id}`);
  };

  return (
    <ScreenContainer>
      <ParticleBackground count={15} color={colors.accent.gold} maxOpacity={0.06} />
      <TouchableOpacity
        style={{ position: 'absolute', top: 60, left: spacing.lg, zIndex: 10 }}
        onPress={() => router.back()}
      >
        <KageText variant="body" style={{ fontSize: 28, color: colors.text.secondary }}>✕</KageText>
      </TouchableOpacity>

      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: spacing.xl, gap: 24 }}>
        <Animated.View entering={FadeInUp.duration(600).springify()}>
          <GlassContainer glow="gold" accentTop accentColor={colors.accent.gold} style={{ borderRadius: 14 }}>
            <View style={{ alignItems: 'center', gap: 12, paddingVertical: 20 }}>
              <KageText variant="kanji" style={{ fontSize: 48, color: colors.accent.gold }}>絆</KageText>
              <KageText
                variant="bodyBold"
                style={{ fontSize: 16, letterSpacing: 3, textTransform: 'uppercase', color: colors.accent.gold }}
              >
                Forge a Pact
              </KageText>
              <KageText variant="body" style={{ fontSize: 12, color: colors.text.secondary, textAlign: 'center' }}>
                A bond that strengthens both. When one falls, both feel the weight.
              </KageText>
            </View>
          </GlassContainer>
        </Animated.View>

        {/* Tab selector */}
        <Animated.View entering={FadeInUp.delay(150).duration(600).springify()}>
          <View style={{
            flexDirection: 'row', backgroundColor: colors.glass.medium,
            borderRadius: 12, padding: 3, borderWidth: 1, borderColor: colors.glass.border,
          }}>
            {(['create', 'join'] as const).map((m) => (
              <TouchableOpacity
                key={m}
                onPress={() => setMode(m)}
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  borderRadius: 10,
                  backgroundColor: mode === m ? colors.accent.primary : 'transparent',
                  alignItems: 'center',
                }}
              >
                <KageText
                  variant="bodyBold"
                  style={{
                    fontSize: 11,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: mode === m ? '#F5F0E8' : colors.text.muted,
                  }}
                >
                  {m === 'create' ? 'Create' : 'Join'}
                </KageText>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {mode === 'create' ? (
          <Animated.View entering={FadeInUp.delay(250).duration(600).springify()} style={{ gap: 16 }}>
            <KageText variant="body" style={{ fontSize: 12, color: colors.text.secondary, textAlign: 'center' }}>
              Create a pact code to share with your warrior. They'll enter it to join your bond.
            </KageText>
            <KageButton title="GENERATE PACT CODE" variant="gold" size="lg" fullWidth onPress={handleCreate} />
          </Animated.View>
        ) : (
          <Animated.View entering={FadeInUp.delay(250).duration(600).springify()} style={{ gap: 16 }}>
            <KageText variant="body" style={{ fontSize: 12, color: colors.text.secondary, textAlign: 'center' }}>
              Enter the pact code shared by your warrior.
            </KageText>
            <TextInput
              value={code}
              onChangeText={setCode}
              placeholder="XXXXXX"
              placeholderTextColor={colors.text.muted}
              autoCapitalize="characters"
              maxLength={8}
              style={{
                backgroundColor: colors.glass.medium,
                borderWidth: 1,
                borderColor: colors.glass.border,
                borderRadius: 14,
                padding: spacing.lg,
                color: colors.text.primary,
                fontFamily: 'Inter-Regular',
                fontSize: 24,
                textAlign: 'center',
                letterSpacing: 6,
              }}
            />
            <KageButton title="JOIN PACT" variant="primary" size="lg" fullWidth onPress={handleJoin} />
          </Animated.View>
        )}
      </View>
    </ScreenContainer>
  );
}
