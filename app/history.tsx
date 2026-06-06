import React, { useState, useCallback, useMemo } from 'react';
import { View, ScrollView, TextInput, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useFocusEffect } from 'expo-router';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { KageText } from '@/components/ui/KageText';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { ParticleBackground } from '@/components/cinematic/ParticleBackground';
import { useColors, spacing } from '@/theme';
import { getWorkoutHistory } from '@/store/workoutStore';
import type { WorkoutSession } from '@/store/types';

type FilterMode = 'all' | 'push' | 'pull' | 'legs' | 'core' | 'cardio' | 'full';

export default function HistoryScreen() {
  const colors = useColors();
  const [history, setHistory] = useState<WorkoutSession[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterMode>('all');

  useFocusEffect(useCallback(() => { loadData(); }, []));

  async function loadData() {
    setHistory(await getWorkoutHistory());
  }

  const grouped = useMemo(() => {
    let filtered = history;

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter((s) =>
        s.name.toLowerCase().includes(q)
      );
    }

    if (filter !== 'all') {
      filtered = filtered.filter((s) =>
        s.exercises.some((e) => e.exercise.category === filter)
      );
    }

    const groups: Record<string, WorkoutSession[]> = {};
    filtered.forEach((session) => {
      const dateKey = new Date(session.startedAt).toLocaleDateString('en-US', {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
      });
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(session);
    });
    return groups;
  }, [history, search, filter]);

  const dateKeys = Object.keys(grouped);

  const filters: { key: FilterMode; label: string }[] = [
    { key: 'all', label: 'ALL' },
    { key: 'push', label: 'PUSH' },
    { key: 'pull', label: 'PULL' },
    { key: 'legs', label: 'LEGS' },
    { key: 'core', label: 'CORE' },
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
            The record of battles
          </KageText>
          <KageText variant="h3" letterSpacing={4}>HISTORY</KageText>
        </Animated.View>

        {/* Search */}
        <Animated.View entering={FadeInDown.delay(140).duration(600)} style={{ marginBottom: 12 }}>
          <View style={[styles.searchBar, { backgroundColor: colors.glass.medium, borderColor: colors.glass.border }]}>
            <KageText variant="caption" color={colors.text.muted} style={{ fontSize: 12, marginRight: 8 }}>🔍</KageText>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search workouts..."
              placeholderTextColor={colors.text.muted}
              style={[styles.searchInput, { color: colors.text.primary }]}
            />
          </View>
        </Animated.View>

        {/* Filter Chips */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={{ marginBottom: 16 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
            {filters.map((f) => (
              <View
                key={f.key}
                onTouchEnd={() => setFilter(f.key)}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor: filter === f.key ? colors.accent.primary : colors.glass.medium,
                    borderColor: filter === f.key ? colors.accent.primary : colors.glass.border,
                  },
                ]}
              >
                <KageText
                  variant="caption"
                  color={filter === f.key ? '#F5F0E8' : colors.text.secondary}
                  style={{ fontSize: 9, letterSpacing: 1.5 }}
                >
                  {f.label}
                </KageText>
              </View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Workout Groups */}
        {dateKeys.length === 0 ? (
          <Animated.View entering={FadeInDown.delay(260).duration(600)}>
            <GlassContainer accentTop accentColor={colors.accent.gold} padding={spacing.xxl} style={{ borderRadius: 14, alignItems: 'center' }}>
              <KageText variant="body" align="center" color={colors.text.muted} style={{ fontSize: 13 }}>
                No workouts found
              </KageText>
              <KageText variant="caption" align="center" color={colors.text.muted} style={{ fontSize: 10, marginTop: 8 }}>
                Complete a training session to see it here
              </KageText>
            </GlassContainer>
          </Animated.View>
        ) : (
          dateKeys.map((dateKey, groupIndex) => (
            <Animated.View
              key={dateKey}
              entering={FadeInDown.delay(260 + groupIndex * 80).duration(600)}
              style={{ marginBottom: 16 }}
            >
              <GlassContainer accentTop accentColor={colors.accent.primary} padding={spacing.lg} style={{ borderRadius: 14 }}>
                <KageText variant="caption" letterSpacing={2} color={colors.accent.gold} style={{ fontSize: 7.5, textTransform: 'uppercase', marginBottom: 12 }}>
                  {dateKey}
                </KageText>
                {grouped[dateKey].map((session) => (
                  <View
                    key={session.id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                      paddingVertical: 8,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.glass.border,
                    }}
                  >
                    <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: colors.glass.medium, borderWidth: 1, borderColor: colors.glass.border, alignItems: 'center', justifyContent: 'center' }}>
                      <KageText variant="kanji" style={{ fontSize: 16, color: colors.accent.primary }}>{session.kanji}</KageText>
                    </View>
                    <View style={{ flex: 1 }}>
                      <KageText variant="bodyBold" style={{ fontSize: 12 }}>{session.name}</KageText>
                      <KageText variant="caption" style={{ fontSize: 9, color: colors.text.muted }}>
                        {session.exercises.length} exercises · {new Date(session.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </KageText>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <KageText variant="mono" color={colors.accent.gold} style={{ fontSize: 13 }}>+{session.totalXP}</KageText>
                      <KageText variant="caption" style={{ fontSize: 8, color: colors.text.muted, letterSpacing: 1 }}>XP</KageText>
                    </View>
                  </View>
                ))}
              </GlassContainer>
            </Animated.View>
          ))
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    paddingVertical: 0,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
});
