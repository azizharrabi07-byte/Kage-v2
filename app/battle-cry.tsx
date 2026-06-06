import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { KageText } from '@/components/ui/KageText';
import { KageButton } from '@/components/ui/KageButton';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { ParticleBackground } from '@/components/cinematic/ParticleBackground';
import { useColors, spacing } from '@/theme';
import { useWarriorPactStore } from '@/store/warriorPactStore';

export default function BattleCryScreen() {
  const router = useRouter();
  const colors = useColors();
  const { activeBattleCry, respondToBattleCry } = useWarriorPactStore();
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!activeBattleCry || !text.trim()) return;
    respondToBattleCry(activeBattleCry.id, { text: text.trim() });
    router.back();
  };

  if (!activeBattleCry) {
    return (
      <ScreenContainer>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl }}>
          <KageText variant="kanji" style={{ fontSize: 40, color: colors.text.muted, marginBottom: 12 }}>静寂</KageText>
          <KageText variant="body" style={{ fontSize: 14, color: colors.text.secondary, textAlign: 'center' }}>
            No active Battle Cry
          </KageText>
          <KageButton title="GO BACK" variant="ghost" size="md" onPress={() => router.back()} style={{ marginTop: 20 }} />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ParticleBackground count={15} color={colors.dojo.cryActive} maxOpacity={0.08} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ position: 'absolute', top: 60, left: spacing.lg, zIndex: 10 }}
          onPress={() => router.back()}
        >
          <KageText variant="body" style={{ fontSize: 28, color: colors.text.secondary }}>✕</KageText>
        </TouchableOpacity>

        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: spacing.xl, gap: 24 }}>
          <Animated.View entering={FadeInUp.duration(600).springify()}>
            <GlassContainer glow="red" accentTop accentColor={colors.dojo.cryActive} style={{ borderRadius: 14 }}>
              <View style={{ alignItems: 'center', gap: 16, paddingVertical: 16 }}>
                <KageText variant="kanji" style={{ fontSize: 48, color: colors.dojo.cryActive, letterSpacing: 8 }}>
                  鬨
                </KageText>
                <KageText
                  variant="bodyBold"
                  style={{
                    fontSize: 16,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    color: colors.dojo.cryActive,
                  }}
                >
                  Answer the Cry
                </KageText>
                <KageText variant="body" style={{ fontSize: 13, color: colors.text.secondary, textAlign: 'center' }}>
                  Your partner calls. Reply with words of power.
                </KageText>
              </View>
            </GlassContainer>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(200).duration(600).springify()}>
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder="I am here. We fight together."
              placeholderTextColor={colors.text.muted}
              multiline
              style={{
                backgroundColor: colors.glass.medium,
                borderWidth: 1,
                borderColor: colors.glass.border,
                borderRadius: 14,
                padding: spacing.lg,
                color: colors.text.primary,
                fontFamily: 'Inter-Regular',
                fontSize: 15,
                lineHeight: 22,
                minHeight: 100,
                textAlignVertical: 'top',
              }}
            />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(300).duration(600).springify()} style={{ gap: 8 }}>
            <KageButton
              title="SEND RESPONSE"
              variant="lockIn"
              size="lg"
              fullWidth
              onPress={handleSubmit}
            />
            <KageText
              variant="caption"
              style={{ fontSize: 9, color: colors.text.muted, textAlign: 'center', letterSpacing: 1 }}
            >
              Your response will be shared with your pact partner
            </KageText>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
