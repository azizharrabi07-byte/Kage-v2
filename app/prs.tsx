import React, { useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, TextInput, Modal, Pressable } from 'react-native';
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

const PR_STORAGE_KEY = '@kage_prs';

interface PersonalRecord {
  id: string;
  exerciseName: string;
  weight: number;
  reps: number;
  date: number;
}

export default function PRsScreen() {
  const colors = useColors();
  const [prs, setPrs] = useState<PersonalRecord[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  // New PR form state
  const [selectedExercise, setSelectedExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');

  useFocusEffect(useCallback(() => { loadPRs(); }, []));

  async function loadPRs() {
    const data = await AsyncStorage.getItem(PR_STORAGE_KEY);
    if (data) {
      const parsed: PersonalRecord[] = JSON.parse(data);
      parsed.sort((a, b) => b.date - a.date);
      setPrs(parsed);
    }
  }

  async function savePR(pr: PersonalRecord) {
    const updated = [pr, ...prs];
    await AsyncStorage.setItem(PR_STORAGE_KEY, JSON.stringify(updated));
    setPrs(updated);
  }

  async function deletePR(id: string) {
    const updated = prs.filter((p) => p.id !== id);
    await AsyncStorage.setItem(PR_STORAGE_KEY, JSON.stringify(updated));
    setPrs(updated);
  }

  function handleCreatePR() {
    if (!selectedExercise || !weight || !reps) return;
    const newPR: PersonalRecord = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      exerciseName: selectedExercise,
      weight: parseFloat(weight),
      reps: parseInt(reps, 10),
      date: Date.now(),
    };
    savePR(newPR);
    setModalVisible(false);
    setSelectedExercise('');
    setWeight('');
    setReps('');
  }

  return (
    <ScreenContainer>
      <ParticleBackground count={8} color={colors.accent.gold} maxOpacity={0.06} />
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: spacing.lg, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeInDown.delay(80).duration(600)} style={{ marginBottom: 16, alignItems: 'center' }}>
          <KageText variant="caption" letterSpacing={3} color={colors.accent.gold} style={{ fontSize: 8, textTransform: 'uppercase', marginBottom: 4 }}>
            Peak achievements
          </KageText>
          <KageText variant="h3" letterSpacing={4}>PERSONAL RECORDS</KageText>
        </Animated.View>

        {/* Add PR Button */}
        <Animated.View entering={FadeInDown.delay(160).duration(600)} style={{ marginBottom: 20 }}>
          <KageButton title="LOG NEW RECORD" variant="gold" size="md" fullWidth onPress={() => setModalVisible(true)} />
        </Animated.View>

        {/* PR List */}
        {prs.length === 0 ? (
          <Animated.View entering={FadeInDown.delay(240).duration(600)}>
            <GlassContainer accentTop accentColor={colors.accent.gold} padding={spacing.xxl} style={{ borderRadius: 14, alignItems: 'center' }}>
              <KageText variant="body" align="center" color={colors.text.muted} style={{ fontSize: 13 }}>
                No records yet
              </KageText>
              <KageText variant="caption" align="center" color={colors.text.muted} style={{ fontSize: 10, marginTop: 8 }}>
                Log your first personal record above
              </KageText>
            </GlassContainer>
          </Animated.View>
        ) : (
          prs.map((pr, i) => (
            <Animated.View
              key={pr.id}
              entering={FadeInDown.delay(240 + i * 60).duration(600)}
              style={{ marginBottom: 10 }}
            >
              <GlassContainer accentTop accentColor={colors.accent.gold} padding={spacing.md} style={{ borderRadius: 14 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <View style={{ flex: 1 }}>
                    <KageText variant="bodyBold" style={{ fontSize: 13, color: colors.text.primary }}>
                      {pr.exerciseName}
                    </KageText>
                    <View style={{ flexDirection: 'row', gap: 16, marginTop: 4 }}>
                      <KageText variant="mono" color={colors.accent.primary} style={{ fontSize: 16 }}>
                        {pr.weight} kg
                      </KageText>
                      <KageText variant="mono" color={colors.accent.gold} style={{ fontSize: 16 }}>
                        {pr.reps} reps
                      </KageText>
                    </View>
                    <KageText variant="caption" style={{ fontSize: 8, color: colors.text.muted, marginTop: 2 }}>
                      {new Date(pr.date).toLocaleDateString()}
                    </KageText>
                  </View>
                  <Pressable
                    onPress={() => deletePR(pr.id)}
                    style={[styles.deleteBtn, { backgroundColor: colors.glass.medium, borderColor: colors.glass.border }]}
                  >
                    <KageText variant="caption" color={colors.status.danger} style={{ fontSize: 10 }}>✕</KageText>
                  </Pressable>
                </View>
              </GlassContainer>
            </Animated.View>
          ))
        )}
      </ScrollView>

      {/* New PR Modal */}
      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <Pressable onPress={() => {}} style={[styles.modalContent, { backgroundColor: colors.bg.secondary, borderColor: colors.glass.border }]}>
            <KageText variant="bodyBold" color={colors.accent.gold} style={{ fontSize: 14, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>
              New Personal Record
            </KageText>

            {/* Exercise Picker */}
            <KageText variant="caption" color={colors.text.secondary} style={{ fontSize: 9, letterSpacing: 1, marginBottom: 6 }}>
              EXERCISE
            </KageText>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 16 }}
              contentContainerStyle={{ gap: 6 }}
            >
              {exerciseLibrary.map((ex) => (
                <Pressable
                  key={ex.id}
                  onPress={() => setSelectedExercise(ex.name)}
                  style={[
                    styles.exerciseChip,
                    {
                      backgroundColor: selectedExercise === ex.name ? colors.accent.primary : colors.glass.medium,
                      borderColor: selectedExercise === ex.name ? colors.accent.primary : colors.glass.border,
                    },
                  ]}
                >
                  <KageText
                    variant="caption"
                    color={selectedExercise === ex.name ? '#F5F0E8' : colors.text.secondary}
                    style={{ fontSize: 9, letterSpacing: 1 }}
                  >
                    {ex.name}
                  </KageText>
                </Pressable>
              ))}
            </ScrollView>

            {/* Weight Input */}
            <KageText variant="caption" color={colors.text.secondary} style={{ fontSize: 9, letterSpacing: 1, marginBottom: 6 }}>
              WEIGHT (KG)
            </KageText>
            <TextInput
              value={weight}
              onChangeText={setWeight}
              placeholder="0"
              placeholderTextColor={colors.text.muted}
              keyboardType="decimal-pad"
              style={[styles.input, { color: colors.text.primary, backgroundColor: colors.glass.medium, borderColor: colors.glass.border }]}
            />

            {/* Reps Input */}
            <KageText variant="caption" color={colors.text.secondary} style={{ fontSize: 9, letterSpacing: 1, marginBottom: 6, marginTop: 12 }}>
              REPS
            </KageText>
            <TextInput
              value={reps}
              onChangeText={setReps}
              placeholder="0"
              placeholderTextColor={colors.text.muted}
              keyboardType="number-pad"
              style={[styles.input, { color: colors.text.primary, backgroundColor: colors.glass.medium, borderColor: colors.glass.border }]}
            />

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
              <KageButton title="CANCEL" variant="ghost" size="sm" onPress={() => setModalVisible(false)} style={{ flex: 1 }} />
              <KageButton title="SAVE RECORD" variant="primary" size="sm" onPress={handleCreatePR} style={{ flex: 1 }} />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxl,
  },
  modalContent: {
    width: '100%',
    maxHeight: '80%',
    borderRadius: 16,
    borderWidth: 1,
    padding: spacing.xxl,
  },
  exerciseChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  input: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
});
