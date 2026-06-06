import React, { useState, useCallback } from 'react';
import { View, ScrollView, TextInput, StyleSheet, Pressable } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { KageText } from '@/components/ui/KageText';
import { KageButton } from '@/components/ui/KageButton';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { ParticleBackground } from '@/components/cinematic/ParticleBackground';
import { useColors, spacing } from '@/theme';
import { exerciseLibrary } from '@/constants/workouts';
import type { Exercise } from '@/store/types';

const TEMPLATES_KEY = '@kage_templates';

interface CustomTemplate {
  id: string;
  name: string;
  kanji: string;
  difficulty: 'beginner' | 'intermediate' | 'warrior';
  exercises: Exercise[];
  createdAt: number;
}

const KANJI_OPTIONS = ['影', '武', '魂', '道', '心', '龍', '虎', '鳳', '鬼', '雷', '風', '水', '火', '地', '天', '空', '月', '星', '山', '海'];

export default function TemplatesScreen() {
  const colors = useColors();
  const [templates, setTemplates] = useState<CustomTemplate[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [tName, setTName] = useState('');
  const [tKanji, setTKanji] = useState('影');
  const [tDifficulty, setTDifficulty] = useState<'beginner' | 'intermediate' | 'warrior'>('beginner');
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [exerciseSets, setExerciseSets] = useState<Record<string, { sets: number; reps: number }>>({});

  useFocusEffect(useCallback(() => { loadTemplates(); }, []));

  async function loadTemplates() {
    const data = await AsyncStorage.getItem(TEMPLATES_KEY);
    if (data) {
      setTemplates(JSON.parse(data));
    }
  }

  async function saveTemplates(updated: CustomTemplate[]) {
    await AsyncStorage.setItem(TEMPLATES_KEY, JSON.stringify(updated));
    setTemplates(updated);
  }

  async function deleteTemplate(id: string) {
    const updated = templates.filter((t) => t.id !== id);
    await saveTemplates(updated);
  }

  function toggleExercise(ex: Exercise) {
    setSelectedExercises((prev) => {
      const exists = prev.find((e) => e.id === ex.id);
      if (exists) {
        const updated = prev.filter((e) => e.id !== ex.id);
        const newSets = { ...exerciseSets };
        delete newSets[ex.id];
        setExerciseSets(newSets);
        return updated;
      }
      setExerciseSets((s) => ({ ...s, [ex.id]: { sets: ex.sets, reps: ex.reps } }));
      return [...prev, ex];
    });
  }

  function updateExerciseConfig(exId: string, field: 'sets' | 'reps', value: number) {
    setExerciseSets((prev) => ({
      ...prev,
      [exId]: { ...prev[exId], [field]: value },
    }));
  }

  function resetForm() {
    setTName('');
    setTKanji('影');
    setTDifficulty('beginner');
    setSelectedExercises([]);
    setExerciseSets({});
  }

  function handleCreate() {
    if (!tName.trim() || selectedExercises.length === 0) return;

    const finalExercises: Exercise[] = selectedExercises.map((ex) => {
      const cfg = exerciseSets[ex.id] || { sets: ex.sets, reps: ex.reps };
      return { ...ex, sets: cfg.sets, reps: cfg.reps };
    });

    const newTemplate: CustomTemplate = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: tName.trim(),
      kanji: tKanji,
      difficulty: tDifficulty,
      exercises: finalExercises,
      createdAt: Date.now(),
    };

    saveTemplates([newTemplate, ...templates]);
    setShowForm(false);
    resetForm();
  }

  const difficulties: { key: 'beginner' | 'intermediate' | 'warrior'; label: string }[] = [
    { key: 'beginner', label: 'BEGINNER' },
    { key: 'intermediate', label: 'INTERMEDIATE' },
    { key: 'warrior', label: 'WARRIOR' },
  ];

  return (
    <ScreenContainer>
      <ParticleBackground count={8} color={colors.accent.primary} maxOpacity={0.06} />
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: spacing.lg, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <Animated.View entering={FadeInDown.delay(80).duration(600)} style={{ marginBottom: 16, alignItems: 'center' }}>
          <KageText variant="caption" letterSpacing={3} color={colors.accent.gold} style={{ fontSize: 8, textTransform: 'uppercase', marginBottom: 4 }}>
            Forge your own path
          </KageText>
          <KageText variant="h3" letterSpacing={4}>TEMPLATES</KageText>
        </Animated.View>

        {/* Create Button */}
        <Animated.View entering={FadeInDown.delay(160).duration(600)} style={{ marginBottom: 20 }}>
          <KageButton
            title={showForm ? 'CANCEL' : 'CREATE TEMPLATE'}
            variant={showForm ? 'ghost' : 'gold'}
            size="md"
            fullWidth
            onPress={() => {
              if (showForm) resetForm();
              setShowForm(!showForm);
            }}
          />
        </Animated.View>

        {/* Create Form */}
        {showForm && (
          <Animated.View entering={FadeInDown.delay(240).duration(600)} style={{ marginBottom: 20 }}>
            <GlassContainer accentTop accentColor={colors.accent.primary} padding={spacing.lg} style={{ borderRadius: 14 }}>
              <KageText variant="caption" letterSpacing={2} color={colors.accent.gold} style={{ fontSize: 7.5, textTransform: 'uppercase', marginBottom: 12 }}>
                New Template
              </KageText>

              {/* Name */}
              <KageText variant="caption" color={colors.text.secondary} style={{ fontSize: 9, letterSpacing: 1, marginBottom: 4 }}>
                NAME
              </KageText>
              <TextInput
                value={tName}
                onChangeText={setTName}
                placeholder="e.g. Shadow Legion"
                placeholderTextColor={colors.text.muted}
                style={[styles.input, { color: colors.text.primary, backgroundColor: colors.glass.medium, borderColor: colors.glass.border }]}
              />

              {/* Kanji Picker */}
              <KageText variant="caption" color={colors.text.secondary} style={{ fontSize: 9, letterSpacing: 1, marginBottom: 6, marginTop: 12 }}>
                KANJI SYMBOL
              </KageText>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, marginBottom: 12 }}>
                {KANJI_OPTIONS.map((k) => (
                  <Pressable
                    key={k}
                    onPress={() => setTKanji(k)}
                    style={[
                      styles.kanjiChip,
                      {
                        backgroundColor: tKanji === k ? colors.accent.primary : colors.glass.medium,
                        borderColor: tKanji === k ? colors.accent.primary : colors.glass.border,
                      },
                    ]}
                  >
                    <KageText variant="kanji" style={{ fontSize: 20, color: tKanji === k ? '#F5F0E8' : colors.text.primary }}>
                      {k}
                    </KageText>
                  </Pressable>
                ))}
              </ScrollView>

              {/* Difficulty */}
              <KageText variant="caption" color={colors.text.secondary} style={{ fontSize: 9, letterSpacing: 1, marginBottom: 6 }}>
                DIFFICULTY
              </KageText>
              <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
                {difficulties.map((d) => (
                  <Pressable
                    key={d.key}
                    onPress={() => setTDifficulty(d.key)}
                    style={[
                      styles.diffChip,
                      {
                        backgroundColor: tDifficulty === d.key ? colors.accent.primary : colors.glass.medium,
                        borderColor: tDifficulty === d.key ? colors.accent.primary : colors.glass.border,
                      },
                    ]}
                  >
                    <KageText
                      variant="caption"
                      color={tDifficulty === d.key ? '#F5F0E8' : colors.text.secondary}
                      style={{ fontSize: 8, letterSpacing: 1.5 }}
                    >
                      {d.label}
                    </KageText>
                  </Pressable>
                ))}
              </View>

              {/* Exercise Picker */}
              <KageText variant="caption" color={colors.text.secondary} style={{ fontSize: 9, letterSpacing: 1, marginBottom: 6 }}>
                EXERCISES ({selectedExercises.length} selected)
              </KageText>
              <View style={{ maxHeight: 300, marginBottom: 16 }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 300 }}>
                  {exerciseLibrary.map((ex) => {
                    const isSelected = selectedExercises.some((e) => e.id === ex.id);
                    const cfg = exerciseSets[ex.id];
                    return (
                      <Pressable
                        key={ex.id}
                        onPress={() => toggleExercise(ex)}
                        style={[
                          styles.exRow,
                          {
                            backgroundColor: isSelected ? 'rgba(200,16,46,0.06)' : 'transparent',
                            borderColor: isSelected ? colors.accent.glow : colors.glass.border,
                          },
                        ]}
                      >
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                          <KageText variant="kanji" style={{ fontSize: 14, color: colors.accent.primary, width: 24 }}>{ex.kanji}</KageText>
                          <View style={{ flex: 1 }}>
                            <KageText variant="bodyBold" style={{ fontSize: 11 }}>{ex.name}</KageText>
                            <KageText variant="caption" style={{ fontSize: 8, color: colors.text.muted }}>{ex.target}</KageText>
                          </View>
                        </View>
                        {isSelected && cfg && (
                          <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                            <View style={{ alignItems: 'center' }}>
                              <KageText variant="caption" style={{ fontSize: 7, color: colors.text.muted, marginBottom: 1 }}>SETS</KageText>
                              <View style={[styles.smallInput, { borderColor: colors.glass.border, backgroundColor: colors.glass.light }]}>
                                <Pressable onPress={() => updateExerciseConfig(ex.id, 'sets', Math.max(1, cfg.sets - 1))}>
                                  <KageText variant="caption" color={colors.accent.primary} style={{ fontSize: 12, paddingHorizontal: 4 }}>−</KageText>
                                </Pressable>
                                <KageText variant="mono" color={colors.text.primary} style={{ fontSize: 11, minWidth: 20, textAlign: 'center' }}>{cfg.sets}</KageText>
                                <Pressable onPress={() => updateExerciseConfig(ex.id, 'sets', Math.min(10, cfg.sets + 1))}>
                                  <KageText variant="caption" color={colors.accent.primary} style={{ fontSize: 12, paddingHorizontal: 4 }}>+</KageText>
                                </Pressable>
                              </View>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                              <KageText variant="caption" style={{ fontSize: 7, color: colors.text.muted, marginBottom: 1 }}>REPS</KageText>
                              <View style={[styles.smallInput, { borderColor: colors.glass.border, backgroundColor: colors.glass.light }]}>
                                <Pressable onPress={() => updateExerciseConfig(ex.id, 'reps', Math.max(1, cfg.reps - 1))}>
                                  <KageText variant="caption" color={colors.accent.primary} style={{ fontSize: 12, paddingHorizontal: 4 }}>−</KageText>
                                </Pressable>
                                <KageText variant="mono" color={colors.text.primary} style={{ fontSize: 11, minWidth: 20, textAlign: 'center' }}>{cfg.reps}</KageText>
                                <Pressable onPress={() => updateExerciseConfig(ex.id, 'reps', Math.min(100, cfg.reps + 5))}>
                                  <KageText variant="caption" color={colors.accent.primary} style={{ fontSize: 12, paddingHorizontal: 4 }}>+</KageText>
                                </Pressable>
                              </View>
                            </View>
                          </View>
                        )}
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>

              <KageButton
                title={selectedExercises.length === 0 ? 'SELECT EXERCISES FIRST' : 'SAVE TEMPLATE'}
                variant="primary"
                size="md"
                fullWidth
                onPress={handleCreate}
                disabled={selectedExercises.length === 0}
              />
            </GlassContainer>
          </Animated.View>
        )}

        {/* Template List */}
        {templates.length === 0 && !showForm ? (
          <Animated.View entering={FadeInDown.delay(320).duration(600)}>
            <GlassContainer accentTop accentColor={colors.accent.gold} padding={spacing.xxl} style={{ borderRadius: 14, alignItems: 'center' }}>
              <KageText variant="body" align="center" color={colors.text.muted} style={{ fontSize: 13 }}>
                No custom templates yet
              </KageText>
              <KageText variant="caption" align="center" color={colors.text.muted} style={{ fontSize: 10, marginTop: 8 }}>
                Create your own workout template above
              </KageText>
            </GlassContainer>
          </Animated.View>
        ) : (
          templates.map((t, i) => (
            <Animated.View
              key={t.id}
              entering={FadeInDown.delay(360 + i * 80).duration(600)}
              style={{ marginBottom: 12 }}
            >
              <GlassContainer accentTop accentColor={colors.accent.primary} padding={spacing.lg} style={{ borderRadius: 14 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <View style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: colors.glass.medium, borderWidth: 1, borderColor: colors.glass.border, alignItems: 'center', justifyContent: 'center' }}>
                    <KageText variant="kanji" style={{ fontSize: 18, color: colors.accent.primary }}>{t.kanji}</KageText>
                  </View>
                  <View style={{ flex: 1 }}>
                    <KageText variant="bodyBold" style={{ fontSize: 13 }}>{t.name}</KageText>
                    <KageText variant="caption" style={{ fontSize: 9, color: colors.text.muted }}>
                      {t.exercises.length} exercises · {t.difficulty.toUpperCase()}
                    </KageText>
                  </View>
                  <Pressable
                    onPress={() => deleteTemplate(t.id)}
                    style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: colors.glass.medium, borderWidth: 1, borderColor: colors.glass.border, alignItems: 'center', justifyContent: 'center' }}
                  >
                    <KageText variant="caption" color={colors.status.danger} style={{ fontSize: 9 }}>✕</KageText>
                  </Pressable>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                  {t.exercises.map((ex) => (
                    <View key={ex.id} style={{ backgroundColor: colors.glass.light, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, borderWidth: 1, borderColor: colors.glass.border }}>
                      <KageText variant="caption" style={{ fontSize: 7, color: colors.text.secondary, letterSpacing: 0.5 }}>
                        {ex.name} ({ex.sets}×{ex.reps})
                      </KageText>
                    </View>
                  ))}
                </View>
              </GlassContainer>
            </Animated.View>
          ))
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  kanjiChip: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diffChip: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  exRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: 4,
  },
  smallInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 2,
  },
});
