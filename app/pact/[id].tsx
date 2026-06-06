import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { KageText } from '@/components/ui/KageText';
import { KageButton } from '@/components/ui/KageButton';
import { KageCard } from '@/components/ui/KageCard';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ShieldBadge } from '@/components/dojo/ShieldBadge';
import { ParticleBackground } from '@/components/cinematic/ParticleBackground';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { useColors, spacing } from '@/theme';
import { useWarriorPactStore } from '@/store/warriorPactStore';

export default function PactDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const { pacts, removePact } = useWarriorPactStore();

  const pact = pacts.find((p) => p.id === id);

  if (!pact) {
    return (
      <ScreenContainer>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl }}>
          <KageText variant="kanji" style={{ fontSize: 40, color: colors.text.muted, marginBottom: 12 }}>無</KageText>
          <KageText variant="body" style={{ fontSize: 14, color: colors.text.secondary }}>Pact not found</KageText>
          <KageButton title="GO BACK" variant="ghost" size="md" onPress={() => router.back()} style={{ marginTop: 20 }} />
        </View>
      </ScreenContainer>
    );
  }

  const daysSinceCreation = Math.floor((Date.now() - new Date(pact.createdAt).getTime()) / 86400000);

  return (
    <ScreenContainer safeBottom={false}>
      <ParticleBackground count={15} color={colors.accent.gold} maxOpacity={0.06} />
      <ScrollView
        contentContainerStyle={{ paddingTop: 60, paddingHorizontal: spacing.lg, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Back */}
        <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 16, alignSelf: 'flex-start' }}>
          <KageText variant="body" style={{ fontSize: 14, color: colors.text.secondary }}>← Back to Dojo</KageText>
        </TouchableOpacity>

        {/* Header */}
        <Animated.View entering={FadeInDown.delay(80).duration(600).springify()}>
          <KageCard
            title={`${pact.partnerName}`}
            subtitle={`Pact since ${new Date(pact.createdAt).toLocaleDateString()}`}
            accentColor={colors.accent.gold}
            glow="gold"
          >
            <View style={{ alignItems: 'center', gap: 16, paddingVertical: 8 }}>
              <ShieldBadge level={pact.shieldLevel} size="lg" progress={pact.shieldProgress} />
              <View style={{ flexDirection: 'row', gap: 24 }}>
                <View style={{ alignItems: 'center' }}>
                  <KageText variant="mono" style={{ fontSize: 28, color: colors.accent.gold }}>
                    {pact.combinedStreak}
                  </KageText>
                  <KageText variant="caption" style={{ fontSize: 8, letterSpacing: 1.5 }}>
                    COMBINED DAYS
                  </KageText>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <KageText variant="mono" style={{ fontSize: 28, color: colors.status.ready }}>
                    {daysSinceCreation}
                  </KageText>
                  <KageText variant="caption" style={{ fontSize: 8, letterSpacing: 1.5 }}>
                    PACT AGE (DAYS)
                  </KageText>
                </View>
              </View>
            </View>
          </KageCard>
        </Animated.View>

        {/* Status */}
        <Animated.View entering={FadeInDown.delay(160).duration(600).springify()} style={{ marginBottom: 16, marginTop: 8 }}>
          <GlassContainer intensity="medium" accentTop style={{ borderRadius: 14 }}>
            <View style={{ gap: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <KageText variant="body" style={{ fontSize: 12, color: colors.text.secondary }}>Your Streak</KageText>
                <KageText variant="mono" style={{ fontSize: 16, color: colors.status.ready }}>{pact.streak} days</KageText>
              </View>
              <View style={{ height: 1, backgroundColor: colors.glass.border }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <KageText variant="body" style={{ fontSize: 12, color: colors.text.secondary }}>Partner Streak</KageText>
                <KageText variant="mono" style={{ fontSize: 16, color: colors.accent.gold }}>{pact.streak} days</KageText>
              </View>
              <View style={{ height: 1, backgroundColor: colors.glass.border }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <KageText variant="body" style={{ fontSize: 12, color: colors.text.secondary }}>Last Workout</KageText>
                <KageText variant="body" style={{ fontSize: 12, color: colors.text.primary }}>
                  {new Date(pact.lastWorkoutDate).toLocaleDateString()}
                </KageText>
              </View>
            </View>
          </GlassContainer>
        </Animated.View>

        {/* Shield Progress */}
        <Animated.View entering={FadeInDown.delay(240).duration(600).springify()} style={{ marginBottom: 16 }}>
          <KageCard title="Shield Progress" subtitle={`${Math.round(pact.shieldProgress * 100)}% to next level`} accentColor={colors.accent.gold}>
            <View style={{ height: 6, borderRadius: 3, backgroundColor: colors.glass.border, overflow: 'hidden' }}>
              <View style={{ width: `${pact.shieldProgress * 100}%`, height: '100%', backgroundColor: colors.accent.gold, borderRadius: 3 }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
              <KageText variant="caption" style={{ fontSize: 8, color: colors.text.muted }}>BRONZE</KageText>
              <KageText variant="caption" style={{ fontSize: 8, color: colors.text.muted }}>SILVER</KageText>
              <KageText variant="caption" style={{ fontSize: 8, color: colors.text.muted }}>GOLD</KageText>
              <KageText variant="caption" style={{ fontSize: 8, color: colors.text.muted }}>ONYX</KageText>
            </View>
          </KageCard>
        </Animated.View>

        {/* Actions */}
        <Animated.View entering={FadeInDown.delay(320).duration(600).springify()} style={{ gap: 10, marginTop: 8 }}>
          <KageButton
            title="SEND BATTLE CRY"
            variant="lockIn"
            size="md"
            fullWidth
            onPress={() => router.push('/battle-cry')}
          />
          <KageButton
            title="BREAK PACT"
            variant="ghost"
            size="sm"
            fullWidth
            onPress={() => {
              removePact(pact.id);
              router.back();
            }}
          />
        </Animated.View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </ScreenContainer>
  );
}
