import React, { useMemo, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { KageText } from '@/components/ui/KageText';
import { useColors } from '@/theme';
import { getAllExercises, type Exercise } from '@/data/exercises';

const difficultyColors: Record<string, string> = {
  beginner: '#22C55E',
  intermediate: '#EAB308',
  advanced: '#EF4444',
};

function MusclePill({ label, active, onPress, color }: { label: string; active: boolean; onPress: () => void; color: string }) {
  const colors = useColors();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.pill,
        {
          backgroundColor: active ? color : colors.bg.card,
          borderColor: active ? color : colors.glass.border,
        },
      ]}
    >
      <KageText style={[styles.pillText, { color: active ? '#0B0B10' : colors.text.muted }]}> 
        {label}
      </KageText>
    </TouchableOpacity>
  );
}

export default function ExerciseCatalog() {
  const colors = useColors();
  const router = useRouter();
  const exercises = useMemo(() => getAllExercises(), []);
  const [search, setSearch] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return exercises.filter((e) => {
      if (search && !e.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedMuscle && e.muscleGroup !== selectedMuscle) return false;
      return true;
    });
  }, [search, selectedMuscle, exercises]);

  const categories = useMemo(() => {
    const seen = new Set<string>();
    return exercises.filter((e) => {
      if (seen.has(e.muscleGroup)) return false;
      seen.add(e.muscleGroup);
      return true;
    }).map((e) => e.muscleGroup);
  }, [exercises]);

  return (
    <ScreenContainer>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={styles.header}>
          <KageText style={styles.logo}>EXERCISE</KageText>
          <KageText style={[styles.kanji, { color: colors.accent.primary }]}>運動目録</KageText>
          <KageText style={[styles.subtitle, { color: colors.text.muted }]}> 
            {filtered.length} techniques
          </KageText>
        </View>

        <TextInput
          style={[styles.search, { backgroundColor: colors.bg.card, color: colors.text.primary, borderColor: colors.glass.border }]}
          placeholder="Search exercises..."
          placeholderTextColor={colors.text.muted}
          value={search}
          onChangeText={setSearch}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow} contentContainerStyle={{ paddingHorizontal: 16 }}>
          <MusclePill label="All" active={!selectedMuscle} onPress={() => setSelectedMuscle(null)} color={colors.accent.primary} />
          {categories.map((cat) => (
            <MusclePill key={cat} label={cat} active={selectedMuscle === cat} onPress={() => setSelectedMuscle(cat)} color={colors.accent.primary} />
          ))}
        </ScrollView>

        <ScrollView style={styles.list} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
          {filtered.map((ex, i) => (
            <Animated.View key={ex.id} entering={FadeInUp.delay(i * 30).springify()}>
              <TouchableOpacity
                style={[styles.card, { backgroundColor: colors.bg.card, borderColor: colors.glass.border }]}
                onPress={() => router.push(`/exercise/${ex.id}`)}
              >
                <View style={styles.cardLeft}>
                  <KageText style={[styles.cardName, { color: colors.text.primary }]}>{ex.name}</KageText>
                  <KageText style={[styles.cardKanji, { color: colors.text.muted }]}>{ex.kanji}</KageText>
                  <View style={styles.tags}>
                    <View style={[styles.tag, { backgroundColor: colors.accent.primary + '20' }]}>
                      <KageText style={[styles.tagText, { color: colors.accent.primary }]}>{ex.muscleGroup}</KageText>
                    </View>
                    <View style={[styles.tag, { backgroundColor: difficultyColors[ex.difficulty] + '20' }]}>
                      <KageText style={[styles.tagText, { color: difficultyColors[ex.difficulty] }]}>
                        {ex.difficulty}
                      </KageText>
                    </View>
                  </View>
                </View>
                <View style={styles.cardRight}>
                  <KageText style={[styles.reps, { color: colors.accent.primary }]}> 
                    {ex.defaultSets}x{ex.defaultReps}
                  </KageText>
                  <KageText style={[styles.restLabel, { color: colors.text.muted }]}> 
                    {ex.defaultRest}s rest
                  </KageText>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
          {filtered.length === 0 && (
            <View style={styles.empty}>
              <KageText style={[styles.emptyText, { color: colors.text.muted }]}> 
                No exercises match your filters
              </KageText>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 12 },
  logo: { fontSize: 32, fontWeight: '800', letterSpacing: 8 },
  kanji: { fontSize: 16, letterSpacing: 4, marginTop: 2 },
  subtitle: { fontSize: 13, letterSpacing: 1, marginTop: 4 },
  search: { marginHorizontal: 16, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 15, borderWidth: 1, marginBottom: 8 },
  filterRow: { marginBottom: 8 },
  pill: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1, marginRight: 8 },
  pillText: { fontSize: 12, fontWeight: '600', letterSpacing: 1 },
  list: { flex: 1, paddingHorizontal: 16 },
  card: { flexDirection: 'row', justifyContent: 'space-between', borderRadius: 12, borderWidth: 1, padding: 16, marginBottom: 8 },
  cardLeft: { flex: 1 },
  cardName: { fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
  cardKanji: { fontSize: 13, letterSpacing: 4, marginTop: 2, marginBottom: 8 },
  tags: { flexDirection: 'row', gap: 6 },
  tag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  tagText: { fontSize: 10, fontWeight: '600', letterSpacing: 0.5 },
  cardRight: { alignItems: 'flex-end', justifyContent: 'center' },
  reps: { fontSize: 18, fontWeight: '800', letterSpacing: 1 },
  restLabel: { fontSize: 11, marginTop: 2 },
  empty: { paddingVertical: 60, alignItems: 'center' },
  emptyText: { fontSize: 14, letterSpacing: 1 },
});
