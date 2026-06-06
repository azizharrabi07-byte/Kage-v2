import React, { useState } from 'react';
import { View, ScrollView, Alert, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { KageText } from '@/components/ui/KageText';
import { KageButton } from '@/components/ui/KageButton';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { ParticleBackground } from '@/components/cinematic/ParticleBackground';
import { useColors, useTheme, spacing } from '@/theme';

export default function SettingsScreen() {
  const router = useRouter();
  const colors = useColors();
  const { mode, toggleTheme } = useTheme();
  const [clearing, setClearing] = useState(false);

  function handleClearAllData() {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all workouts, measurements, PRs, templates, and progression. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear Everything',
          style: 'destructive',
          onPress: async () => {
            setClearing(true);
            try {
              const keys = [
                '@kage_workouts',
                '@kage_progression',
                '@kage_measurements',
                '@kage_prs',
                '@kage_templates',
              ];
              await AsyncStorage.multiRemove(keys);
              Alert.alert('Done', 'All data has been cleared.');
            } catch (err) {
              Alert.alert('Error', 'Failed to clear data.');
            } finally {
              setClearing(false);
            }
          },
        },
      ],
    );
  }

  return (
    <ScreenContainer>
      <ParticleBackground count={6} color={colors.accent.primary} maxOpacity={0.05} />
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: spacing.lg, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeInDown.delay(80).duration(600)} style={{ marginBottom: 20, alignItems: 'center' }}>
          <KageText variant="caption" letterSpacing={3} color={colors.accent.gold} style={{ fontSize: 8, textTransform: 'uppercase', marginBottom: 4 }}>
            Configure your path
          </KageText>
          <KageText variant="h3" letterSpacing={4}>SETTINGS</KageText>
        </Animated.View>

        {/* Appearance */}
        <Animated.View entering={FadeInDown.delay(160).duration(600)} style={{ marginBottom: 12 }}>
          <GlassContainer accentTop accentColor={colors.accent.primary} padding={spacing.lg} style={{ borderRadius: 14 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flex: 1 }}>
                <KageText variant="bodyBold" style={{ fontSize: 13, color: colors.text.primary }}>
                  Appearance
                </KageText>
                <KageText variant="caption" color={colors.text.muted} style={{ fontSize: 9, marginTop: 2 }}>
                  Current: {mode === 'dark' ? 'Dark (Warrior)' : 'Light (Ronin)'}
                </KageText>
              </View>
              <View
                onTouchEnd={toggleTheme}
                style={[styles.toggleBtn, { backgroundColor: colors.glass.medium, borderColor: colors.glass.border }]}
              >
                <KageText variant="caption" color={colors.text.secondary} style={{ fontSize: 9, letterSpacing: 2 }}>
                  {mode === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}
                </KageText>
              </View>
            </View>
          </GlassContainer>
        </Animated.View>

        {/* Data Management */}
        <Animated.View entering={FadeInDown.delay(240).duration(600)} style={{ marginBottom: 12 }}>
          <GlassContainer accentTop accentColor={colors.status.danger} padding={spacing.lg} style={{ borderRadius: 14 }}>
            <KageText variant="caption" letterSpacing={2} color={colors.status.danger} style={{ fontSize: 7.5, textTransform: 'uppercase', marginBottom: 8 }}>
              Data Management
            </KageText>
            <KageText variant="caption" color={colors.text.muted} style={{ fontSize: 9, marginBottom: 12 }}>
              Clear all locally stored data including workouts, measurements, personal records, and templates.
            </KageText>
            <KageButton
              title={clearing ? 'CLEARING...' : 'CLEAR ALL DATA'}
              variant="outline"
              size="sm"
              fullWidth
              onPress={handleClearAllData}
              disabled={clearing}
            />
          </GlassContainer>
        </Animated.View>

        {/* About */}
        <Animated.View entering={FadeInDown.delay(320).duration(600)} style={{ marginBottom: 12 }}>
          <GlassContainer accentTop accentColor={colors.accent.gold} padding={spacing.lg} style={{ borderRadius: 14 }}>
            <KageText variant="caption" letterSpacing={2} color={colors.accent.gold} style={{ fontSize: 7.5, textTransform: 'uppercase', marginBottom: 8 }}>
              About
            </KageText>
            <View style={{ gap: 6 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <KageText variant="caption" color={colors.text.secondary} style={{ fontSize: 10 }}>App</KageText>
                <KageText variant="bodyBold" style={{ fontSize: 11 }}>KAGE</KageText>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <KageText variant="caption" color={colors.text.secondary} style={{ fontSize: 10 }}>Version</KageText>
                <KageText variant="bodyBold" style={{ fontSize: 11 }}>1.0.0</KageText>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <KageText variant="caption" color={colors.text.secondary} style={{ fontSize: 10 }}>Theme</KageText>
                <KageText variant="bodyBold" style={{ fontSize: 11 }}>Japanese Warrior</KageText>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <KageText variant="caption" color={colors.text.secondary} style={{ fontSize: 10 }}>Framework</KageText>
                <KageText variant="bodyBold" style={{ fontSize: 11 }}>Expo + React Native</KageText>
              </View>
            </View>
            <KageText variant="caption" align="center" color={colors.text.muted} style={{ fontSize: 8, letterSpacing: 1, marginTop: 16, textAlign: 'center' }}>
              "The warrior who walks the path of shadows finds their own light."
            </KageText>
          </GlassContainer>
        </Animated.View>

        {/* Navigation */}
        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={{ marginTop: 8 }}>
          <KageButton title="RETURN" variant="ghost" size="md" fullWidth onPress={() => router.back()} />
        </Animated.View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  toggleBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
});
