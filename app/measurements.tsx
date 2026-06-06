import React, { useState, useCallback } from 'react';
import { View, ScrollView, TextInput, StyleSheet, Pressable } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Line, Circle, Text as SvgText, Polyline } from 'react-native-svg';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { KageText } from '@/components/ui/KageText';
import { KageButton } from '@/components/ui/KageButton';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { ParticleBackground } from '@/components/cinematic/ParticleBackground';
import { useColors, spacing } from '@/theme';

const MEASUREMENTS_KEY = '@kage_measurements';

interface MeasurementEntry {
  id: string;
  date: number;
  weight: number;
  bodyFat?: number;
  chest?: number;
  waist?: number;
  arms?: number;
  thighs?: number;
}

const CHART_WIDTH = 320;
const CHART_HEIGHT = 160;
const CHART_PADDING = 20;

export default function MeasurementsScreen() {
  const colors = useColors();
  const [entries, setEntries] = useState<MeasurementEntry[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [mWeight, setMWeight] = useState('');
  const [mBodyFat, setMBodyFat] = useState('');
  const [mChest, setMChest] = useState('');
  const [mWaist, setMWaist] = useState('');
  const [mArms, setMArms] = useState('');
  const [mThighs, setMThighs] = useState('');

  useFocusEffect(useCallback(() => { loadEntries(); }, []));

  async function loadEntries() {
    const data = await AsyncStorage.getItem(MEASUREMENTS_KEY);
    if (data) {
      const parsed: MeasurementEntry[] = JSON.parse(data);
      parsed.sort((a, b) => b.date - a.date);
      setEntries(parsed);
    }
  }

  async function saveEntry(entry: MeasurementEntry) {
    const updated = [entry, ...entries];
    updated.sort((a, b) => b.date - a.date);
    await AsyncStorage.setItem(MEASUREMENTS_KEY, JSON.stringify(updated));
    setEntries(updated);
  }

  async function deleteEntry(id: string) {
    const updated = entries.filter((e) => e.id !== id);
    await AsyncStorage.setItem(MEASUREMENTS_KEY, JSON.stringify(updated));
    setEntries(updated);
  }

  function handleSubmit() {
    if (!mWeight) return;
    const entry: MeasurementEntry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      date: Date.now(),
      weight: parseFloat(mWeight),
      bodyFat: mBodyFat ? parseFloat(mBodyFat) : undefined,
      chest: mChest ? parseFloat(mChest) : undefined,
      waist: mWaist ? parseFloat(mWaist) : undefined,
      arms: mArms ? parseFloat(mArms) : undefined,
      thighs: mThighs ? parseFloat(mThighs) : undefined,
    };
    saveEntry(entry);
    setShowForm(false);
    setMWeight('');
    setMBodyFat('');
    setMChest('');
    setMWaist('');
    setMArms('');
    setMThighs('');
  }

  // Prepare weight chart data (last 10 entries, chronological)
  const chartData = entries.slice(0).reverse().slice(-10);
  const weightValues = chartData.map((e) => e.weight);
  const minWeight = Math.min(...weightValues, 0) * 0.95 || 50;
  const maxWeight = Math.max(...weightValues, 0) * 1.05 || 100;
  const range = maxWeight - minWeight || 1;

  function getPoint(index: number, value: number): string {
    const x = CHART_PADDING + (index / Math.max(chartData.length - 1, 1)) * (CHART_WIDTH - CHART_PADDING * 2);
    const y = CHART_HEIGHT - CHART_PADDING - ((value - minWeight) / range) * (CHART_HEIGHT - CHART_PADDING * 2);
    return `${x},${y}`;
  }

  const points = chartData.map((e, i) => getPoint(i, e.weight)).join(' ');

  const latest = entries[0];

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
            Body tracking
          </KageText>
          <KageText variant="h3" letterSpacing={4}>MEASUREMENTS</KageText>
        </Animated.View>

        {/* Latest snapshot */}
        {latest && (
          <Animated.View entering={FadeInDown.delay(160).duration(600)} style={{ marginBottom: 12 }}>
            <GlassContainer accentTop accentColor={colors.accent.gold} padding={spacing.lg} style={{ borderRadius: 14 }}>
              <KageText variant="caption" letterSpacing={2} color={colors.accent.gold} style={{ fontSize: 7.5, textTransform: 'uppercase', marginBottom: 8 }}>
                Latest · {new Date(latest.date).toLocaleDateString()}
              </KageText>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                {[
                  { label: 'Weight', value: `${latest.weight} kg`, color: colors.accent.primary },
                  { label: 'Body Fat', value: latest.bodyFat ? `${latest.bodyFat}%` : '--', color: colors.status.warning },
                  { label: 'Chest', value: latest.chest ? `${latest.chest} cm` : '--', color: colors.accent.gold },
                  { label: 'Waist', value: latest.waist ? `${latest.waist} cm` : '--', color: colors.status.danger },
                  { label: 'Arms', value: latest.arms ? `${latest.arms} cm` : '--', color: colors.status.recovery },
                  { label: 'Thighs', value: latest.thighs ? `${latest.thighs} cm` : '--', color: colors.status.ready },
                ].map((stat) => (
                  <View key={stat.label} style={{ width: '28%', alignItems: 'center', paddingVertical: 4 }}>
                    <KageText variant="mono" color={stat.color} style={{ fontSize: 16 }}>{stat.value}</KageText>
                    <KageText variant="caption" style={{ fontSize: 7, letterSpacing: 1, color: colors.text.muted, textTransform: 'uppercase' }}>{stat.label}</KageText>
                  </View>
                ))}
              </View>
            </GlassContainer>
          </Animated.View>
        )}

        {/* Weight Trend Chart */}
        {chartData.length > 1 && (
          <Animated.View entering={FadeInDown.delay(240).duration(600)} style={{ marginBottom: 12 }}>
            <GlassContainer accentTop accentColor={colors.accent.primary} padding={spacing.lg} style={{ borderRadius: 14 }}>
              <KageText variant="caption" letterSpacing={2} color={colors.accent.gold} style={{ fontSize: 7.5, textTransform: 'uppercase', marginBottom: 8 }}>
                Weight Trend
              </KageText>
              <View style={{ alignItems: 'center' }}>
                <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
                  {/* Grid lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
                    const y = CHART_PADDING + (1 - frac) * (CHART_HEIGHT - CHART_PADDING * 2);
                    const val = (minWeight + frac * range).toFixed(1);
                    return (
                      <React.Fragment key={frac}>
                        <Line x1={CHART_PADDING} y1={y} x2={CHART_WIDTH - CHART_PADDING} y2={y} stroke={colors.glass.border} strokeWidth={0.5} />
                        <SvgText x={4} y={y + 3} fill={colors.text.muted} fontSize={8} fontFamily="monospace">{val}</SvgText>
                      </React.Fragment>
                    );
                  })}
                  {/* Line */}
                  {chartData.length > 1 && (
                    <Polyline points={points} fill="none" stroke={colors.accent.primary} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                  )}
                  {/* Dots */}
                  {chartData.map((e, i) => {
                    const [x, y] = getPoint(i, e.weight).split(',');
                    return <Circle key={e.id} cx={parseFloat(x)} cy={parseFloat(y)} r={3} fill={colors.accent.primary} />;
                  })}
                  {/* Date labels (first, middle, last) */}
                  {chartData.length > 0 && (
                    <>
                      <SvgText x={CHART_PADDING} y={CHART_HEIGHT - 4} fill={colors.text.muted} fontSize={7} fontFamily="monospace">
                        {new Date(chartData[0].date).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </SvgText>
                      {chartData.length > 2 && (
                        <SvgText x={CHART_WIDTH / 2 - 20} y={CHART_HEIGHT - 4} fill={colors.text.muted} fontSize={7} fontFamily="monospace">
                          {new Date(chartData[Math.floor(chartData.length / 2)].date).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </SvgText>
                      )}
                      <SvgText x={CHART_WIDTH - CHART_PADDING - 40} y={CHART_HEIGHT - 4} fill={colors.text.muted} fontSize={7} fontFamily="monospace">
                        {new Date(chartData[chartData.length - 1].date).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </SvgText>
                    </>
                  )}
                </Svg>
              </View>
            </GlassContainer>
          </Animated.View>
        )}

        {/* Log Button */}
        <Animated.View entering={FadeInDown.delay(320).duration(600)} style={{ marginBottom: 20 }}>
          <KageButton
            title={showForm ? 'CANCEL' : 'LOG MEASUREMENTS'}
            variant={showForm ? 'ghost' : 'primary'}
            size="md"
            fullWidth
            onPress={() => setShowForm(!showForm)}
          />
        </Animated.View>

        {/* Measurement Form */}
        {showForm && (
          <Animated.View entering={FadeInDown.delay(400).duration(600)} style={{ marginBottom: 20 }}>
            <GlassContainer accentTop accentColor={colors.accent.primary} padding={spacing.lg} style={{ borderRadius: 14 }}>
              <KageText variant="caption" letterSpacing={2} color={colors.accent.gold} style={{ fontSize: 7.5, textTransform: 'uppercase', marginBottom: 12 }}>
                New Entry
              </KageText>

              <FieldInput label="Weight (kg) *" value={mWeight} onChangeText={setMWeight} placeholder="70" colors={colors} />
              <FieldInput label="Body Fat %" value={mBodyFat} onChangeText={setMBodyFat} placeholder="15" colors={colors} />
              <FieldInput label="Chest (cm)" value={mChest} onChangeText={setMChest} placeholder="100" colors={colors} />
              <FieldInput label="Waist (cm)" value={mWaist} onChangeText={setMWaist} placeholder="80" colors={colors} />
              <FieldInput label="Arms (cm)" value={mArms} onChangeText={setMArms} placeholder="35" colors={colors} />
              <FieldInput label="Thighs (cm)" value={mThighs} onChangeText={setMThighs} placeholder="55" colors={colors} />

              <KageButton title="SAVE" variant="primary" size="md" fullWidth onPress={handleSubmit} style={{ marginTop: 12 }} />
            </GlassContainer>
          </Animated.View>
        )}

        {/* History */}
        {entries.length > 0 && (
          <Animated.View entering={FadeInDown.delay(480).duration(600)} style={{ marginBottom: 24 }}>
            <GlassContainer accentTop accentColor={colors.accent.gold} padding={spacing.lg} style={{ borderRadius: 14 }}>
              <KageText variant="caption" letterSpacing={2} color={colors.accent.gold} style={{ fontSize: 7.5, textTransform: 'uppercase', marginBottom: 12 }}>
                Measurement History
              </KageText>
              {entries.map((entry) => (
                <View key={entry.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: colors.glass.border }}>
                  <View style={{ flex: 1 }}>
                    <KageText variant="bodyBold" style={{ fontSize: 11 }}>{entry.weight} kg</KageText>
                    <KageText variant="caption" style={{ fontSize: 8, color: colors.text.muted }}>
                      {new Date(entry.date).toLocaleDateString()} · BF: {entry.bodyFat ?? '--'}% · Chest: {entry.chest ?? '--'} | Waist: {entry.waist ?? '--'} | Arms: {entry.arms ?? '--'} | Thighs: {entry.thighs ?? '--'}
                    </KageText>
                  </View>
                  <Pressable onPress={() => deleteEntry(entry.id)} style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: colors.glass.medium, borderWidth: 1, borderColor: colors.glass.border, alignItems: 'center', justifyContent: 'center' }}>
                    <KageText variant="caption" color={colors.status.danger} style={{ fontSize: 9 }}>✕</KageText>
                  </Pressable>
                </View>
              ))}
            </GlassContainer>
          </Animated.View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

function FieldInput({
  label,
  value,
  onChangeText,
  placeholder,
  colors,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder: string;
  colors: any;
}) {
  return (
    <View style={{ marginBottom: 10 }}>
      <KageText variant="caption" color={colors.text.secondary} style={{ fontSize: 9, letterSpacing: 1, marginBottom: 4 }}>
        {label}
      </KageText>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text.muted}
        keyboardType="decimal-pad"
        style={{
          fontFamily: 'Inter-Regular',
          fontSize: 14,
          color: colors.text.primary,
          backgroundColor: colors.glass.medium,
          borderWidth: 1,
          borderColor: colors.glass.border,
          borderRadius: 10,
          paddingHorizontal: 14,
          paddingVertical: 10,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
