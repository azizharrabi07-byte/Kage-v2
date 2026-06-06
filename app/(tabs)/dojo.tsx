import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { KageText } from '@/components/ui/KageText';
import { KageButton } from '@/components/ui/KageButton';
import { PremiumCard } from '@/components/premium/PremiumCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ParticleBackground } from '@/components/cinematic/ParticleBackground';
import { BattleCryWidget } from '@/components/dojo/BattleCryWidget';
import { PactCard } from '@/components/dojo/PactCard';
import { LeaderboardTable } from '@/components/dojo/LeaderboardTable';
import { ShieldBadge } from '@/components/dojo/ShieldBadge';
import { useColors } from '@/theme';
import { useWarriorPactStore } from '@/store/warriorPactStore';

export default function DojoScreen() {
  const router = useRouter();
  const colors = useColors();
  const {
    pacts, activeBattleCry, battleCryHistory, leaderboard, loading,
    loadPacts, loadLeaderboard,
  } = useWarriorPactStore();

  useEffect(() => {
    loadPacts();
    loadLeaderboard();
  }, []);

  if (loading) {
    return <ScreenContainer safeBottom={false}><LoadingSpinner message="Entering the Dojo..." /></ScreenContainer>;
  }

  const activePact = pacts.length > 0 ? pacts[0] : null;
  const totalPactStreak = pacts.reduce((sum, p) => sum + p.combinedStreak, 0);
  const totalPacts = pacts.length;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.kage.void }]}>
      <ParticleBackground count={15} color={colors.accent.primary} maxOpacity={0.04} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeInDown.delay(80).duration(600)} style={styles.header}>
          <KageText variant="mono" style={{ fontSize: 8, color: colors.accent.gold, letterSpacing: 3, marginBottom: 4 }}>
            THE WARRIOR'S CODE
          </KageText>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', gap: 8 }}>
            <KageText variant="kanji" style={{ fontSize: 40, color: colors.accent.primary }}>道</KageText>
            <KageText variant="h2" letterSpacing={4} style={{ color: '#FFFFFF' }}>DOJO</KageText>
          </View>
        </Animated.View>

        {/* Pact Stats Bar */}
        <Animated.View entering={FadeInDown.delay(140).duration(600)} style={styles.statsRow}>
          <PremiumCard isLight={false} glowColor="rgba(201,168,76,0.15)" style={styles.statCard}>
            <KageText variant="mono" style={{ fontSize: 24, color: colors.accent.gold }}>{totalPacts}</KageText>
            <KageText variant="mono" style={{ fontSize: 7, color: '#8E9EAF', letterSpacing: 2 }}>PACTS</KageText>
          </PremiumCard>
          <View style={{ width: 12 }} />
          <PremiumCard isLight={false} glowColor="rgba(0,204,136,0.15)" style={styles.statCard}>
            <KageText variant="mono" style={{ fontSize: 24, color: colors.status.ready }}>{totalPactStreak}d</KageText>
            <KageText variant="mono" style={{ fontSize: 7, color: '#8E9EAF', letterSpacing: 2 }}>STREAK</KageText>
          </PremiumCard>
        </Animated.View>

        {/* Battle Cry Widget */}
        {activeBattleCry && activePact && (
          <Animated.View entering={FadeInDown.delay(200).duration(600)} style={{ marginBottom: 16, paddingHorizontal: 16 }}>
            <BattleCryWidget
              battleCry={activeBattleCry}
              partnerName={activePact.partnerName}
              onRespond={() => router.push('/battle-cry')}
            />
          </Animated.View>
        )}

        {/* Active Pacts */}
        <Animated.View entering={FadeInDown.delay(260).duration(600)} style={{ paddingHorizontal: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View style={{ width: 3, height: 14, borderRadius: 1.5, backgroundColor: colors.accent.gold }} />
              <KageText variant="mono" style={{ fontSize: 9, letterSpacing: 2, color: colors.accent.gold }}>
                WARRIOR PACTS
              </KageText>
            </View>
            {pacts.length < 5 && (
              <TouchableOpacity
                onPress={() => router.push('/forge')}
                style={[styles.newPactBtn, { borderColor: colors.accent.primary }]}
              >
                <KageText variant="mono" style={{ fontSize: 8, color: colors.accent.primary, letterSpacing: 1 }}>
                  + NEW PACT
                </KageText>
              </TouchableOpacity>
            )}
          </View>

          {pacts.length === 0 ? (
            <PremiumCard isLight={false} glowColor="rgba(201,168,76,0.1)" style={{ backgroundColor: colors.kage.sumi, padding: 24, alignItems: 'center' }}>
              <KageText variant="kanji" style={{ fontSize: 32, color: '#8E9EAF', opacity: 0.3 }}>絆</KageText>
              <KageText variant="body" style={{ fontSize: 13, color: '#8E9EAF', textAlign: 'center', marginTop: 8 }}>
                No warrior pacts yet
              </KageText>
              <KageText variant="body" style={{ fontSize: 10, color: '#6B7280', textAlign: 'center', marginTop: 4, marginBottom: 12 }}>
                Forge a bond to start your shared journey
              </KageText>
              <KageButton title="FORGE PACT" variant="gold" size="md" onPress={() => router.push('/forge')} />
            </PremiumCard>
          ) : (
            pacts.map((pact, i) => (
              <View key={pact.id} style={{ marginBottom: 8 }}>
                <PactCard
                  pact={pact}
                  onPress={() => router.push(`/pact/${pact.id}`)}
                  delay={200 + i * 60}
                />
              </View>
            ))
          )}
        </Animated.View>

        {/* Battle Cry History */}
        {battleCryHistory.length > 0 && (
          <Animated.View entering={FadeInDown.delay(360).duration(600)} style={{ paddingHorizontal: 16, marginTop: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <View style={{ width: 3, height: 14, borderRadius: 1.5, backgroundColor: colors.status.ready }} />
              <KageText variant="mono" style={{ fontSize: 9, letterSpacing: 2, color: colors.status.ready }}>
                BATTLE CRY HISTORY
              </KageText>
            </View>
            {battleCryHistory.slice(0, 5).map((cry) => (
              <View
                key={cry.id}
                style={[styles.cryItem, { backgroundColor: colors.kage.sumi, borderColor: colors.kage.kachi }]}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <KageText variant="kanji" style={{ fontSize: 14, color: colors.status.ready, opacity: 0.7 }}>鬨</KageText>
                      <KageText variant="bodyBold" style={{ fontSize: 11, color: '#FFFFFF' }}>
                        Battle Cry
                      </KageText>
                    </View>
                    {cry.myResponse && (
                      <KageText variant="body" style={{ fontSize: 11, color: '#8E9EAF', marginTop: 4 }}>
                        "{cry.myResponse.text}"
                      </KageText>
                    )}
                  </View>
                  <KageText
                    variant="mono"
                    style={{
                      fontSize: 8,
                      color: cry.status === 'responded' ? colors.status.ready : '#8E9EAF',
                      letterSpacing: 1,
                    }}
                  >
                    {cry.status === 'responded' ? 'RESOLVED' : 'MISSED'}
                  </KageText>
                </View>
              </View>
            ))}
          </Animated.View>
        )}

        {/* Squad Leaderboard */}
        <Animated.View entering={FadeInDown.delay(440).duration(600)} style={{ paddingHorizontal: 16, marginTop: 16 }}>
          <LeaderboardTable entries={leaderboard} currentPactId={pacts[0]?.id} delay={400} />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { alignItems: 'center', paddingVertical: 24 },
  statsRow: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 16 },
  statCard: { flex: 1, padding: 16, alignItems: 'center', backgroundColor: '#1A1A24' },
  newPactBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 100, borderWidth: 1 },
  cryItem: { padding: 12, borderRadius: 10, borderWidth: 1, marginBottom: 6 },
});
