import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown, useSharedValue, useAnimatedStyle, withTiming, withDelay, Easing } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { KageText } from '@/components/ui/KageText';
import { KageButton } from '@/components/ui/KageButton';
import { PremiumCard } from '@/components/premium/PremiumCard';
import { ExerciseCard } from '@/components/workout/ExerciseCard';
import { SetRow } from '@/components/workout/SetRow';
import { RestTimer } from '@/components/workout/Timer';
import { WorkoutComplete } from '@/components/workout/WorkoutComplete';
import { ParticleBackground } from '@/components/cinematic/ParticleBackground';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { Sensei } from '@/components/coach/Sensei';
import { MacroRings } from '@/components/nutrition/MacroRings';
import { WaterTracker } from '@/components/nutrition/WaterTracker';
import { MealCard } from '@/components/nutrition/MealCard';
import { Card } from '@/components/premium/Card';
import { PressScale } from '@/components/premium/PressScale';
import { EquipmentCarousel } from '@/components/train/EquipmentCarousel';
import { useColors, spacing } from '@/theme';
import { useRouter } from 'expo-router';
import { workoutTemplates } from '@/constants/workouts';
import { createWorkoutSession, saveWorkoutSession, calculateWorkoutXP } from '@/store/workoutStore';
import { addXP, incrementWorkouts } from '@/store/progressionStore';
import { getWater, setWater, getMeals, getMacroTotals, getMealPlan, type Meal } from '@/store/nutritionStore';
import type { WorkoutSession, WorkoutTemplate, WorkoutPhase } from '@/store/types';

const tabsArr = [
  { label: 'Equipment', icon: '⚔️' },
  { label: 'Zero-Equip', icon: '🧘' },
  { label: 'Diet', icon: '🍱' },
];

export default function WorkoutScreen() {
  const colors = useColors();
  const router = useRouter();
  const [phase, setPhase] = useState<WorkoutPhase>('idle');
  const [session, setSession] = useState<WorkoutSession | null>(null);
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [sessionDuration, setSessionDuration] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [waterGlasses, setWaterGlasses] = useState(0);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [mealPlan, setMealPlanKey] = useState('maintain');
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  useEffect(() => {
    getWater().then(setWaterGlasses);
    getMeals().then(setMeals);
  }, []);

  const activePlan = getMealPlan(mealPlan);
  const macroTotals = getMacroTotals(meals);

  useEffect(() => {
    if (phase === 'active' && !intervalRef.current) {
      intervalRef.current = setInterval(() => setSessionDuration((d) => d + 1), 1000);
    }
    return () => { if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; } };
  }, [phase]);

  function startWorkout(template: WorkoutTemplate) {
    setSession(createWorkoutSession(template));
    setCurrentExIndex(0);
    setSessionDuration(0);
    setPhase('active');
  }

  const currentExercise = session?.exercises[currentExIndex];
  const isLastExercise = currentExIndex >= (session?.exercises.length ?? 1) - 1;

  function completeSet(setId: string) {
    if (!session) return;
    const updated = { ...session };
    const ex = updated.exercises[currentExIndex];
    const set = ex.sets.find((s) => s.id === setId);
    if (!set || set.completed) return;
    set.completed = true;
    set.completedAt = Date.now();
    if (ex.sets.every((s) => s.completed)) { ex.completed = true; ex.completedAt = Date.now(); }
    setSession(updated);
  }

  function nextExercise() {
    if (!session) return;
    if (isLastExercise) completeWorkout();
    else setPhase('rest');
  }

  function finishRest() { setCurrentExIndex((i) => i + 1); setPhase('active'); }
  function skipRest() { finishRest(); }

  async function completeWorkout() {
    if (!session) return;
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    const xp = calculateWorkoutXP(session);
    const final = { ...session, completedAt: Date.now(), totalXP: xp, xpBreakdown: { strength: Math.round(xp * 0.4), discipline: Math.round(xp * 0.3), endurance: Math.round(xp * 0.2), focus: Math.round(xp * 0.1) } };
    await saveWorkoutSession(final);
    await addXP('strength', Math.round(xp * 0.4));
    await addXP('discipline', Math.round(xp * 0.3));
    await addXP('endurance', Math.round(xp * 0.2));
    await addXP('focus', Math.round(xp * 0.1));
    await incrementWorkouts();
    setSession(final);
    setPhase('complete');
  }

  function handleFinish() { setPhase('idle'); setSession(null); setCurrentExIndex(0); setSessionDuration(0); }

  const totalSets = session?.exercises.reduce((a, e) => a + e.sets.length, 0) ?? 0;
  const completedSets = session?.exercises.reduce((a, e) => a + e.sets.filter((s) => s.completed).length, 0) ?? 0;

  const equipmentPrograms = workoutTemplates.filter((t) => !t.zeroEquipment);
  const zeroEquipmentPrograms = workoutTemplates.filter((t) => t.zeroEquipment);

  const activeProgram = equipmentPrograms[0];

  if (phase === 'idle') {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.kage.void }]}>
        <ParticleBackground count={10} color={colors.accent.primary} maxOpacity={0.05} />
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <Animated.View entering={FadeInDown.delay(80).duration(600)} style={{ alignItems: 'center', paddingVertical: 24 }}>
            <KageText variant="mono" style={{ fontSize: 8, color: colors.accent.gold, letterSpacing: 3, marginBottom: 8 }}>
              SELECT YOUR PATH
            </KageText>
            <KageText variant="kanji" style={{ fontSize: 36, color: colors.accent.primary }}>武</KageText>
            <KageText variant="mono" style={{ fontSize: 10, color: '#8E9EAF', letterSpacing: 2, marginTop: 4 }}>
              TRAINING GROUNDS
            </KageText>
          </Animated.View>

          {/* Active Program Banner */}
          {activeProgram && (
            <Animated.View entering={FadeInDown.delay(200).duration(600)} style={{ marginBottom: 16 }}>
              <PremiumCard
                glowColor="rgba(227,30,36,0.2)"
                style={{ backgroundColor: colors.kage.sumi }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <KageText variant="mono" style={{ fontSize: 8, color: '#8E9EAF', letterSpacing: 2 }}>
                      ACTIVE PROGRAM
                    </KageText>
                    <KageText variant="bodyBold" style={{ fontSize: 16, color: '#FFFFFF', marginTop: 4 }}>
                      {activeProgram.name}
                    </KageText>
                    <View style={[styles.progressBar, { backgroundColor: '#0B0B10' }]}>
                      <View style={[styles.progressFill, { width: '60%', backgroundColor: colors.accent.primary }]} />
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => startWorkout(activeProgram)}
                    style={[styles.resumeBtn, { backgroundColor: colors.accent.primary }]}
                  >
                    <KageText variant="mono" style={{ fontSize: 9, color: '#FFFFFF', letterSpacing: 1 }}>
                      RESUME
                    </KageText>
                  </TouchableOpacity>
                </View>
              </PremiumCard>
            </Animated.View>
          )}

          {/* Navigation Links */}
          <Animated.View entering={FadeInDown.delay(240).duration(600)} style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
            <TouchableOpacity
              onPress={() => router.push('/exercise')}
              style={[styles.navLink, { backgroundColor: 'rgba(227,30,36,0.12)', borderColor: colors.accent.primary }]}
            >
              <KageText variant="mono" style={{ fontSize: 8, color: colors.accent.primary, letterSpacing: 2 }}>
                運動目録
              </KageText>
              <KageText variant="mono" style={{ fontSize: 7, color: colors.text.muted, letterSpacing: 1 }}>
                EXERCISE CATALOG
              </KageText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/program')}
              style={[styles.navLink, { backgroundColor: 'rgba(201,168,76,0.12)', borderColor: colors.accent.gold }]}
            >
              <KageText variant="mono" style={{ fontSize: 8, color: colors.accent.gold, letterSpacing: 2 }}>
                計画
              </KageText>
              <KageText variant="mono" style={{ fontSize: 7, color: colors.text.muted, letterSpacing: 1 }}>
                PROGRAMS
              </KageText>
            </TouchableOpacity>
          </Animated.View>

          {/* Sub Tabs */}
          <Animated.View entering={FadeInDown.delay(280).duration(600)}>
            <View style={styles.subTabRow}>
              {tabsArr.map((tab, i) => (
                <TouchableOpacity
                  key={tab.label}
                  onPress={() => setSelectedTabIndex(i)}
                  style={[
                    styles.subTab,
                    selectedTabIndex === i && {
                      backgroundColor: selectedTabIndex === 0 ? 'rgba(227,30,36,0.15)' : selectedTabIndex === 1 ? 'rgba(0,204,136,0.15)' : 'rgba(201,168,76,0.15)',
                      borderColor: selectedTabIndex === 0 ? colors.accent.primary : selectedTabIndex === 1 ? colors.status.ready : colors.accent.gold,
                    },
                  ]}
                >
                  <KageText style={{ fontSize: 12 }}>{tab.icon}</KageText>
                  <KageText
                    variant="mono"
                    style={{
                      fontSize: 8,
                      letterSpacing: 1,
                      color: selectedTabIndex === i ? '#FFFFFF' : '#8E9EAF',
                    }}
                  >
                    {tab.label}
                  </KageText>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>

          {/* Content */}
          <Animated.View entering={FadeInDown.delay(360).duration(600)} style={styles.contentWrapper}>
            {selectedTabIndex === 0 && (
              <View style={styles.sectionContainer}>
                <KageText variant="bodyBold" style={{ fontSize: 14, color: '#FFFFFF', marginBottom: 16, letterSpacing: 2 }}>
                  ⚔️ Equipment Workouts
                </KageText>
                <EquipmentCarousel programs={equipmentPrograms} accentColor={colors.accent.primary} onSelect={startWorkout} />
              </View>
            )}

            {selectedTabIndex === 1 && (
              <View style={styles.sectionContainer}>
                <KageText variant="bodyBold" style={{ fontSize: 14, color: '#FFFFFF', marginBottom: 16, letterSpacing: 2 }}>
                  🧘 Zero-Equipment Workouts
                </KageText>
                <EquipmentCarousel programs={zeroEquipmentPrograms} accentColor={colors.status.ready} onSelect={startWorkout} />
              </View>
            )}

            {selectedTabIndex === 2 && (
              <View style={styles.sectionContainer}>
                <GlassContainer intensity="medium" glow="subtle" accentTop accentColor={colors.accent.neon} style={{ borderRadius: 14, marginBottom: 20 }}>
                  <MacroRings calories={macroTotals.calories} protein={macroTotals.protein} carbs={macroTotals.carbs} fat={macroTotals.fat} targets={activePlan.macros} />
                </GlassContainer>

                <View style={styles.macroPlanSelector}>
                  {['Shred', 'Bulk', 'Maintain'].map(plan => (
                    <TouchableOpacity
                      key={plan}
                      onPress={() => setMealPlanKey(plan.toLowerCase())}
                      style={[
                        styles.macroPlanBtn,
                        {
                          backgroundColor: mealPlan === plan.toLowerCase() ? colors.accent.primary : colors.kage.sumi,
                          borderColor: mealPlan === plan.toLowerCase() ? colors.accent.primary : 'transparent',
                        },
                      ]}
                    >
                      <KageText variant="mono" style={{ fontSize: 9, letterSpacing: 1, color: mealPlan === plan.toLowerCase() ? '#FFFFFF' : '#8E9EAF' }}>
                        {plan}
                      </KageText>
                    </TouchableOpacity>
                  ))}
                </View>

                <KageText variant="bodyBold" style={{ fontSize: 14, color: '#FFFFFF', marginBottom: 16, marginTop: 10, letterSpacing: 2 }}>
                  💧 Water Tracker
                </KageText>
                <WaterTracker
                  glasses={waterGlasses}
                  onAdd={async () => { const g = Math.min(waterGlasses + 1, 12); setWaterGlasses(g); await setWater(g); }}
                  onRemove={async () => { const g = Math.max(waterGlasses - 1, 0); setWaterGlasses(g); await setWater(g); }}
                />

                <KageText variant="bodyBold" style={{ fontSize: 14, color: '#FFFFFF', marginBottom: 16, letterSpacing: 2 }}>
                  🍱 Today's Meals
                </KageText>

                {meals.length === 0 ? (
                  <View style={{ alignItems: 'center', paddingVertical: 20 }}>
                    <KageText variant="body" style={{ fontSize: 12, color: '#8E9EAF', marginBottom: 8 }}>
                      No meals logged today
                    </KageText>
                    <KageText variant="caption" style={{ fontSize: 9, color: '#8E9EAF', marginBottom: 10 }}>
                      Apply a meal plan to get started
                    </KageText>
                  </View>
                ) : (
                  meals.map((meal) => (
                    <MealCard
                      key={meal.id}
                      meal={meal}
                      onRemove={async () => {
                        const { removeMeal } = await import('@/store/nutritionStore');
                        await removeMeal(meal.id);
                        setMeals(meals.filter((m) => m.id !== meal.id));
                      }}
                    />
                  ))
                )}
              </View>
            )}
          </Animated.View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (phase === 'rest') {
    return (
      <ScreenContainer>
        <ParticleBackground count={6} color={colors.accent.primary} maxOpacity={0.08} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xxl, gap: 12 }}>
          <KageText variant="h3" letterSpacing={8} color={colors.text.muted} style={{ opacity: 0.5 }}>REST</KageText>
          <KageText variant="caption" color={colors.text.muted} style={{ opacity: 0.3, marginBottom: 24 }}>Prepare for the next challenge.</KageText>
          <RestTimer total={60} onSkip={skipRest} onComplete={finishRest} />
        </View>
      </ScreenContainer>
    );
  }

  if (phase === 'complete' && session) {
    return (
      <ScreenContainer>
        <ParticleBackground count={20} color={colors.accent.primary} maxOpacity={0.12} />
        <WorkoutComplete xp={session.totalXP} duration={sessionDuration} setsCompleted={completedSets} onFinish={handleFinish} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ParticleBackground count={8} color={colors.accent.primary} maxOpacity={0.06} />
      <View style={{ flex: 1, paddingTop: 50 }}>
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: 12, gap: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <KageText variant="caption" letterSpacing={2} color={colors.accent.gold} style={{ fontSize: 7.5, textTransform: 'uppercase' }}>
              {session?.name?.toUpperCase()} · {currentExIndex + 1}/{session?.exercises.length}
            </KageText>
            <KageText variant="caption" color={colors.text.muted} style={{ fontSize: 9 }}>
              {Math.floor(sessionDuration / 60)}:{(sessionDuration % 60).toString().padStart(2, '0')}
            </KageText>
          </View>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {session?.exercises.map((_, i) => (
              <View key={i} style={{
                height: 4, borderRadius: 2, flex: 1,
                backgroundColor: i < currentExIndex ? colors.status.ready : i === currentExIndex ? colors.accent.primary : colors.glass.border,
              }} />
            ))}
          </View>
        </View>

        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 12 }} showsVerticalScrollIndicator={false}>
          {currentExercise && (
            <>
              <ExerciseCard exercise={currentExercise.exercise} index={0} active />
              <KageText variant="caption" letterSpacing={2} color={colors.text.muted} style={{ fontSize: 8, marginBottom: 12, textTransform: 'uppercase' }}>
                Sets · {currentExercise.sets.filter((s) => s.completed).length}/{currentExercise.sets.length}
              </KageText>
              {currentExercise.sets.map((set) => (
                <SetRow key={set.id} set={set} onToggle={() => completeSet(set.id)} />
              ))}
            </>
          )}
        </ScrollView>

        <View style={{ paddingHorizontal: spacing.lg, paddingBottom: 90, paddingTop: 8, gap: 4, borderTopWidth: 1, borderTopColor: colors.glass.border, backgroundColor: colors.bg.primary }}>
          <KageText variant="caption" align="center" color={colors.text.muted} style={{ fontSize: 9 }}>
            {completedSets}/{totalSets} sets
          </KageText>
          <KageButton title={isLastExercise ? 'COMPLETE WORKOUT' : 'NEXT EXERCISE'} variant="primary" size="md" fullWidth onPress={nextExercise} />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 16 },
  progressBar: { height: 6, borderRadius: 100, overflow: 'hidden', marginTop: 8 },
  progressFill: { height: '100%', borderRadius: 100 },
  resumeBtn: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 100 },
  navLink: { flex: 1, paddingVertical: 14, paddingHorizontal: 14, borderRadius: 12, borderWidth: 1, alignItems: 'center', gap: 4 },
  subTabRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  subTab: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 10,
    borderRadius: 100, borderWidth: 1, borderColor: 'transparent',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  contentWrapper: { marginBottom: 100 },
  sectionContainer: { marginTop: 10 },
  macroPlanSelector: { flexDirection: 'row', gap: 10, marginTop: 15, marginBottom: 25 },
  macroPlanBtn: {
    flex: 1, paddingVertical: 12, borderRadius: 100, borderWidth: 1,
    alignItems: 'center',
  },
});
