import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KageText } from '@/components/ui/KageText';
import { PremiumCard } from '@/components/premium/PremiumCard';
import { ParticleBackground } from '@/components/cinematic/ParticleBackground';
import { SenseiChat } from '@/components/coach/SenseiChat';
import { useColors, IMAGES } from '@/theme';
import { playSound } from '@/utils/sound';

const quickActions = [
  { icon: '🧘', label: 'MEDITATE' },
  { icon: '💪', label: 'MOTIVATE' },
  { icon: '📊', label: 'REVIEW' },
  { icon: '🎯', label: 'TARGET' },
];

export default function SenseiScreen() {
  const colors = useColors();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.kage.void }]}>
      <ParticleBackground count={12} color={colors.accent.neon} maxOpacity={0.05} />

      {/* Header */}
      <Animated.View entering={FadeInDown.delay(80).duration(600)} style={styles.header}>
        {/* Hologram Avatar */}
        <View style={[styles.avatarContainer, { borderColor: colors.accent.neon, shadowColor: colors.accent.neon }]}>
          <Image
            source={IMAGES.hologramSensei}
            style={styles.avatarImage}
            resizeMode="cover"
          />
          <View style={[styles.avatarGlow, { backgroundColor: colors.accent.neon + '15' }]} />
        </View>

        <View style={{ alignItems: 'center', gap: 4 }}>
          <KageText
            variant="kanji"
            style={{
              fontSize: 18,
              letterSpacing: 4,
              color: colors.accent.neon,
            }}
          >
            先生
          </KageText>
          <KageText variant="mono" style={{ fontSize: 8, color: '#8E9EAF', letterSpacing: 3 }}>
            SENSEI — SPIRITUAL GUIDE
          </KageText>
        </View>
      </Animated.View>

      {/* Quick Action Gems */}
      <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.quickActions}>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.label}
            style={[styles.quickBtn, { backgroundColor: colors.kage.sumi, borderColor: colors.kage.kachi }]}
          >
            <KageText style={{ fontSize: 18 }}>{action.icon}</KageText>
            <KageText variant="mono" style={{ fontSize: 7, color: '#8E9EAF', letterSpacing: 1 }}>
              {action.label}
            </KageText>
          </TouchableOpacity>
        ))}
      </Animated.View>

      {/* Chat */}
      <View style={{ flex: 1, paddingHorizontal: 16, marginBottom: 70 }}>
        <SenseiChat />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { alignItems: 'center', paddingVertical: 24, gap: 12 },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 12,
  },
  avatarImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  avatarGlow: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  quickBtn: {
    width: 64,
    height: 64,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
});
