import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { KageText } from '@/components/ui/KageText';
import { useColors } from '@/theme';
import { getExerciseById } from '@/data/exercises';

const difficultyColors: Record<string, string> = {
  beginner: '#22C55E',
  intermediate: '#EAB308',
  advanced: '#EF4444',
};

function MetaPill({ label, color }: { label: string; color: string }) {
  return (
    <View style={[styles.pill, { backgroundColor: color + '18', borderColor: color + '40' }]}>
      <KageText style={[styles.pillText, { color }]}>{label}</KageText>
    </View>
  );
}

export default function ExerciseDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const router = useRouter();
  const ex = getExerciseById(id);

  if (!ex) {
    return (
      <ScreenContainer safeTop safeBottom>
        <View style={styles.notFound}>
          <KageText variant="h2" align="center" color={colors.text.secondary}>
            見つかりません
          </KageText>
          <KageText variant="body" align="center" color={colors.text.muted} style={{ marginTop: 8 }}>
            Exercise not found
          </KageText>
          <TouchableOpacity
            style={[styles.backBtn, { backgroundColor: colors.accent.primary, marginTop: 24 }]}
            onPress={() => router.back()}
          >
            <KageText style={{ color: '#FFF', fontWeight: '700', letterSpacing: 2, fontSize: 13 }}>
              GO BACK
            </KageText>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }

  const [gifFailed, setGifFailed] = React.useState(false);

  return (
    <ScreenContainer safeTop={false} safeBottom={false}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <View style={styles.hero}>
            {ex.gifUrl && !gifFailed ? (
              <Image
                source={{ uri: ex.gifUrl }}
                style={styles.heroGif}
                resizeMode="contain"
                onError={() => setGifFailed(true)}
              />
            ) : (
              <View style={styles.heroFallback}>
                <KageText variant="display" align="center" color={colors.text.muted} letterSpacing={8}>
                  {ex.kanji}
                </KageText>
              </View>
            )}
            <View style={[styles.heroOverlay, { backgroundColor: colors.kage.void + '99' }]} />
            <TouchableOpacity style={styles.heroBack} onPress={() => router.back()}>
              <KageText style={[styles.heroBackText, { color: colors.text.primary }]}>←</KageText>
            </TouchableOpacity>
          </View>

          {/* Title Area */}
          <View style={styles.titleSection}>
            <KageText variant="h2" color={colors.text.primary} letterSpacing={4}>
              {ex.name}
            </KageText>
            <KageText variant="kanji" color={colors.text.muted} style={{ marginTop: 4 }}>
              {ex.kanji}
            </KageText>
          </View>

          {/* Meta Pills Row */}
          <View style={styles.pillsRow}>
            <MetaPill label={ex.muscleGroup} color={colors.accent.primary} />
            <MetaPill label={ex.equipment} color={colors.kage.kin} />
            <MetaPill label={ex.difficulty} color={difficultyColors[ex.difficulty]} />
          </View>

          {/* Sets/Reps Card */}
          <View style={[styles.statsCard, { backgroundColor: colors.bg.card, borderColor: colors.glass.border }]}>
            <View style={styles.statsMain}>
              <KageText variant="display" color={colors.accent.primary} letterSpacing={2}>
                {ex.defaultSets}×{ex.defaultReps}
              </KageText>
              <KageText variant="caption" color={colors.text.muted} style={{ marginTop: 4 }}>
                REST {ex.restSeconds}s
              </KageText>
            </View>
            <View style={styles.statsDivider} />
            <View style={styles.statsMeta}>
              <KageText style={[styles.statLabel, { color: colors.text.muted }]}>SETS</KageText>
              <KageText style={[styles.statValue, { color: colors.text.primary }]}>{ex.defaultSets}</KageText>
              <KageText style={[styles.statLabel, { color: colors.text.muted, marginTop: 12 }]}>REPS</KageText>
              <KageText style={[styles.statValue, { color: colors.text.primary }]}>{ex.defaultReps}</KageText>
            </View>
          </View>

          {/* Instructions */}
          <View style={styles.section}>
            <KageText style={[styles.sectionTitle, { color: colors.text.primary }]}>
              INSTRUCTIONS
            </KageText>
            <KageText style={[styles.sectionKanji, { color: colors.accent.primary }]}>
              手順
            </KageText>
            <View style={[styles.sectionCard, { backgroundColor: colors.bg.card, borderColor: colors.glass.border }]}>
              {ex.instructions.map((step, i) => (
                <View key={i} style={styles.stepRow}>
                  <View style={[styles.stepNumber, { backgroundColor: colors.accent.primary }]}>
                    <KageText style={styles.stepNumberText}>{i + 1}</KageText>
                  </View>
                  <KageText style={[styles.stepText, { color: colors.text.secondary }]}>{step}</KageText>
                </View>
              ))}
            </View>
          </View>

          {/* Training Tips */}
          <View style={styles.section}>
            <KageText style={[styles.sectionTitle, { color: colors.text.primary }]}>
              TRAINING TIPS
            </KageText>
            <KageText style={[styles.sectionKanji, { color: colors.kage.kin }]}>
              秘訣
            </KageText>
            <View style={[styles.sectionCard, { backgroundColor: colors.bg.card, borderColor: colors.glass.border }]}>
              {ex.tips.map((tip, i) => (
                <View key={i} style={styles.bulletRow}>
                  <View style={[styles.bullet, { backgroundColor: colors.kage.kin }]} />
                  <KageText style={[styles.bulletText, { color: colors.text.secondary }]}>{tip}</KageText>
                </View>
              ))}
            </View>
          </View>

          {/* Benefits */}
          <View style={styles.section}>
            <KageText style={[styles.sectionTitle, { color: colors.text.primary }]}>
              BENEFITS
            </KageText>
            <KageText style={[styles.sectionKanji, { color: colors.accent.primary }]}>
              効果
            </KageText>
            <View style={[styles.sectionCard, { backgroundColor: colors.bg.card, borderColor: colors.glass.border }]}>
              {ex.benefits.map((benefit, i) => (
                <View key={i} style={styles.bulletRow}>
                  <View style={[styles.bullet, { backgroundColor: colors.accent.primary }]} />
                  <KageText style={[styles.bulletText, { color: colors.text.secondary }]}>{benefit}</KageText>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  backBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },

  // Hero
  hero: {
    height: 300,
    position: 'relative',
    overflow: 'hidden',
  },
  heroGif: {
    width: '100%',
    height: '100%',
  },
  heroFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B0B10',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  heroBack: {
    position: 'absolute',
    top: 12,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  heroBackText: {
    fontSize: 22,
    lineHeight: 24,
  },

  // Title
  titleSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },

  // Pills
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },

  // Stats Card
  statsCard: {
    flexDirection: 'row',
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    padding: 20,
    marginBottom: 24,
  },
  statsMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsDivider: {
    width: 1,
    marginHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  statsMeta: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  statLabel: {
    fontSize: 10,
    letterSpacing: 3,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1,
    marginTop: 2,
  },

  // Sections
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 6,
  },
  sectionKanji: {
    fontSize: 14,
    letterSpacing: 4,
    marginTop: 2,
    marginBottom: 12,
  },
  sectionCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },

  // Steps / Bullets
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 1,
  },
  stepNumberText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.5,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
    marginRight: 12,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.5,
  },
});
