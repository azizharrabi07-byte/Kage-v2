import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { KageText } from '@/components/ui/KageText';
import { KageButton } from '@/components/ui/KageButton';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { ParticleBackground } from '@/components/cinematic/ParticleBackground';
import { useColors, spacing } from '@/theme';

const oathSteps = [
  { kanji: '誓', label: 'The Oath', text: 'I swear to train daily, to honor my pact, and to rise when I fall.' },
  { kanji: '絆', label: 'The Bond', text: 'My strength is our strength. My failure is our failure. We rise together.' },
  { kanji: '闘', label: 'The Fight', text: 'For 7 days, I will answer every Battle Cry. I will not break the chain.' },
  { kanji: '魂', label: 'The Spirit', text: 'This is my warrior soul. I am KAGE.' },
];

export default function WarriorOathScreen() {
  const router = useRouter();
  const { pactId } = useLocalSearchParams<{ pactId: string }>();
  const colors = useColors();
  const [step, setStep] = useState(0);

  const current = oathSteps[step];

  const handleNext = () => {
    if (step < oathSteps.length - 1) {
      setStep(step + 1);
    } else {
      if (pactId) {
        router.replace(`/pact/${pactId}`);
      } else {
        router.back();
      }
    }
  };

  return (
    <ScreenContainer>
      <ParticleBackground count={20} color={colors.accent.gold} maxOpacity={0.08} />
      <TouchableOpacity
        style={{ position: 'absolute', top: 60, left: spacing.lg, zIndex: 10 }}
        onPress={() => router.back()}
      >
        <KageText variant="body" style={{ fontSize: 28, color: colors.text.secondary }}>✕</KageText>
      </TouchableOpacity>

      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: spacing.xl, gap: 24 }}>
        {/* Progress dots */}
        <Animated.View entering={FadeIn.duration(400)} style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
          {oathSteps.map((_, i) => (
            <View
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: i === step ? colors.accent.gold : colors.glass.border,
              }}
            />
          ))}
        </Animated.View>

        <Animated.View key={step} entering={FadeInUp.duration(500).springify()}>
          <GlassContainer glow="gold" accentTop accentColor={colors.accent.gold} style={{ borderRadius: 14 }}>
            <View style={{ alignItems: 'center', gap: 16, paddingVertical: 32, paddingHorizontal: spacing.lg }}>
              <KageText variant="kanji" style={{ fontSize: 64, color: colors.accent.gold, letterSpacing: 8 }}>
                {current.kanji}
              </KageText>
              <KageText
                variant="bodyBold"
                style={{
                  fontSize: 14,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: colors.accent.gold,
                  marginBottom: 4,
                }}
              >
                {current.label}
              </KageText>
              <KageText
                variant="body"
                style={{
                  fontSize: 15,
                  color: colors.text.primary,
                  textAlign: 'center',
                  lineHeight: 24,
                }}
              >
                "{current.text}"
              </KageText>
            </View>
          </GlassContainer>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(250).duration(600).springify()}>
          <KageButton
            title={step < oathSteps.length - 1 ? 'I SWEAR IT' : 'ENTER THE DOJO'}
            variant="gold"
            size="lg"
            fullWidth
            onPress={handleNext}
          />
          <KageText
            variant="caption"
            style={{
              fontSize: 9,
              color: colors.text.muted,
              textAlign: 'center',
              marginTop: 8,
              letterSpacing: 1,
            }}
          >
            Step {step + 1} of {oathSteps.length}
          </KageText>
        </Animated.View>
      </View>
    </ScreenContainer>
  );
}
