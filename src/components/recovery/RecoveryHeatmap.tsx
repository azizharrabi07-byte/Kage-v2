import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import { KageText } from '@/components/ui/KageText';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { useColors, spacing } from '@/theme';

interface MuscleGroup {
  id: string;
  name: string;
  path: string;
  recovery: number;
}

const MUSCLE_GROUPS: MuscleGroup[] = [
  { id: 'shoulders', name: 'Shoulders', recovery: 85, path: 'M130,110 Q150,95 170,110 Q165,120 150,125 Q135,120 130,110Z' },
  { id: 'chest', name: 'Chest', recovery: 60, path: 'M130,130 Q150,120 170,130 Q168,150 150,155 Q132,150 130,130Z' },
  { id: 'biceps_left', name: 'Left Arm', recovery: 70, path: 'M110,115 Q95,130 90,155 Q92,160 100,155 Q108,140 112,130Z' },
  { id: 'biceps_right', name: 'Right Arm', recovery: 70, path: 'M190,115 Q205,130 210,155 Q208,160 200,155 Q192,140 188,130Z' },
  { id: 'abs', name: 'Core', recovery: 45, path: 'M132,160 Q150,155 168,160 Q170,185 168,200 Q150,205 132,200 Q130,185 132,160Z' },
  { id: 'quads_left', name: 'Left Leg', recovery: 30, path: 'M125,210 Q138,210 140,230 Q138,270 130,290 Q125,290 120,270 Q115,240 118,220Z' },
  { id: 'quads_right', name: 'Right Leg', recovery: 30, path: 'M160,210 Q162,210 175,210 Q182,220 180,240 Q175,270 170,290 Q165,290 162,270 Q158,240 160,210Z' },
  { id: 'calves_left', name: 'Left Calf', recovery: 50, path: 'M122,295 Q130,295 132,315 Q130,335 125,345 Q120,345 118,330 Q115,310 122,295Z' },
  { id: 'calves_right', name: 'Right Calf', recovery: 50, path: 'M168,295 Q170,295 178,295 Q185,310 182,330 Q180,345 175,345 Q170,335 168,315Z' },
];

function getRecoveryColor(value: number): string {
  if (value >= 80) return '#00FF88';
  if (value >= 60) return '#FFAA00';
  if (value >= 40) return '#FF6600';
  return '#FF1A1A';
}

interface RecoveryHeatmapProps {
  muscleData?: MuscleGroup[];
}

export function RecoveryHeatmap({ muscleData = MUSCLE_GROUPS }: RecoveryHeatmapProps) {
  const colors = useColors();

  return (
    <View style={styles.container}>
      <Svg width="300" height="400" viewBox="0 0 300 400">
        {/* Body outline */}
        <Path
          d="M150,40 Q170,45 180,60 Q185,70 190,80 L200,90 Q215,100 220,115 Q225,130 225,150 Q225,170 220,185 L210,200 Q200,195 195,190 L200,210 Q205,230 205,250 Q205,270 200,290 L195,310 Q190,330 185,350 Q182,360 178,370 L175,380 Q170,385 165,385 L135,385 Q130,385 125,380 L122,370 Q118,360 115,350 Q110,330 105,310 Q100,290 100,270 Q95,250 95,230 L100,210 Q105,190 105,190 Q100,195 90,200 L80,185 Q75,170 75,150 Q75,130 80,115 Q85,100 100,90 L110,80 Q115,70 120,60 Q130,45 150,40Z"
          fill="none" stroke={colors.glass.border} strokeWidth={1.5} opacity={0.5}
        />
        {muscleData.map((mg) => (
          <Path
            key={mg.id}
            d={mg.path}
            stroke={getRecoveryColor(mg.recovery)}
            strokeWidth={1.5}
            fill={getRecoveryColor(mg.recovery)}
            fillOpacity={0.15}
          />
        ))}
      </Svg>
      <View style={styles.legend}>
        {[
          { label: '90-100%', color: '#00FF88' },
          { label: '60-80%', color: '#FFAA00' },
          { label: '40-60%', color: '#FF6600' },
          { label: '0-40%', color: '#FF1A1A' },
        ].map((l) => (
          <View key={l.label} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: l.color }} />
            <KageText variant="caption" style={{ fontSize: 9 }}>{l.label}</KageText>
          </View>
        ))}
      </View>
    </View>
  );
}

interface RecoveryStatsProps {
  muscleData?: MuscleGroup[];
}

export function RecoveryStats({ muscleData = MUSCLE_GROUPS }: RecoveryStatsProps) {
  const colors = useColors();
  const avgRecovery = Math.round(muscleData.reduce((a, g) => a + g.recovery, 0) / muscleData.length);

  return (
    <GlassContainer intensity="medium" padding={spacing.xl} style={{ borderRadius: 16 }}>
      <KageText variant="caption" letterSpacing={4} style={{ marginBottom: 16, opacity: 0.4 }}>RECOVERY STATUS</KageText>
      <KageText variant="display" color={getRecoveryColor(avgRecovery)} align="center" style={{ marginBottom: 16 }}>{avgRecovery}%</KageText>
      <View style={{ gap: 8 }}>
        {muscleData.map((mg) => (
          <View key={mg.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <KageText variant="caption" style={{ width: 80, fontSize: 10 }}>{mg.name}</KageText>
            <View style={{ flex: 1, height: 4, backgroundColor: colors.glass.border, borderRadius: 2, overflow: 'hidden' }}>
              <View style={{ width: `${mg.recovery}%`, height: '100%', backgroundColor: getRecoveryColor(mg.recovery), borderRadius: 2 }} />
            </View>
            <KageText variant="caption" style={{ width: 30, fontSize: 9, textAlign: 'right' }}>{mg.recovery}%</KageText>
          </View>
        ))}
      </View>
    </GlassContainer>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 12 },
  legend: { flexDirection: 'row', gap: 12 },
});