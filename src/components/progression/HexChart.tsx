import React from 'react';
import { View } from 'react-native';
import Svg, { Polygon, Text as SvgText, Line } from 'react-native-svg';
import { KageText } from '@/components/ui/KageText';
import { useColors } from '@/theme';

interface HexChartProps {
  values: Record<string, number>;
  maxValue?: number;
  size?: number;
}

const AXES = [
  { key: 'strength', label: 'STR', color: '#C8102E' },
  { key: 'discipline', label: 'DIS', color: '#00CC88' },
  { key: 'endurance', label: 'END', color: '#C9A84C' },
  { key: 'focus', label: 'FOC', color: '#3B82F6' },
  { key: 'recovery', label: 'REC', color: '#E83030' },
];

export function HexChart({ values, maxValue = 100, size = 180 }: HexChartProps) {
  const colors = useColors();
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.38;
  const sides = 5;

  const getPoint = (i: number, r: number) => {
    const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const rings = [0.25, 0.5, 0.75, 1];
  const dataPoints = AXES.map((axis, i) => {
    const val = Math.min((values[axis.key] || 0) / maxValue, 1);
    return getPoint(i, radius * val);
  });

  return (
    <View style={{ alignItems: 'center', gap: 8 }}>
      <Svg width={size} height={size}>
        {rings.map((ring) => {
          const points = Array.from({ length: sides }, (_, i) => getPoint(i, radius * ring));
          return (
            <Polygon
              key={ring}
              points={points.map((p) => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke={colors.glass.border}
              strokeWidth={0.5}
              opacity={0.5}
            />
          );
        })}

        {Array.from({ length: sides }).map((_, i) => {
          const p = getPoint(i, radius);
          return (
            <Line
              key={i}
              x1={cx} y1={cy} x2={p.x} y2={p.y}
              stroke={colors.glass.border}
              strokeWidth={0.5}
              opacity={0.3}
            />
          );
        })}

        <Polygon
          points={dataPoints.map((p) => `${p.x},${p.y}`).join(' ')}
          fill={colors.accent.primary + '22'}
          stroke={colors.accent.primary}
          strokeWidth={1.5}
        />

        {AXES.map((axis, i) => {
          const p = getPoint(i, radius * 1.15);
          return (
            <SvgText
              key={axis.key}
              x={p.x}
              y={p.y}
              fill={axis.color}
              fontSize={9}
              fontWeight="bold"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {axis.label}
            </SvgText>
          );
        })}

        {dataPoints.map((p, i) => (
          <SvgText
            key={i}
            x={p.x}
            y={p.y + 14}
            fill={AXES[i].color}
            fontSize={7}
            textAnchor="middle"
          >
            {values[AXES[i].key] || 0}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
}
