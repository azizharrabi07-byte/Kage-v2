import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useColors, spacing } from '@/theme';

interface InkDividerProps {
  width?: number;
  color?: string;
  thickness?: 'thin' | 'medium' | 'thick';
  style?: Record<string, unknown>;
}

const PATH_VARIANTS = [
  (w: number, s: number) => `M0,1 Q${w * 0.15},${-s * 2} ${w * 0.25},${s} T${w * 0.5},${-s} T${w * 0.75},${s} T${w},${-s * 0.5}`,
  (w: number, s: number) => `M0,0 Q${w * 0.2},${s * 3} ${w * 0.35},${-s} T${w * 0.6},${s * 1.5} T${w * 0.85},${-s} T${w},0`,
  (w: number, s: number) => `M0,0.5 Q${w * 0.3},${-s} ${w * 0.5},${s * 0.5} T${w * 0.7},${-s * 0.5} T${w},0.5`,
  (w: number, s: number) => `M0,0 C${w * 0.25},${s * 2} ${w * 0.5},${-s * 2} ${w * 0.75},${s} C${w * 0.85},${s * 0.3} ${w * 0.95},${-s * 0.5} ${w},0`,
];

const InkDivider = React.memo(function InkDivider({
  width = 280,
  color: propColor,
  thickness = 'medium',
  style,
}: InkDividerProps) {
  const colors = useColors();
  const color = propColor || colors.accent.primary;
  const strokeWidth = { thin: 1, medium: 1.5, thick: 2.5 }[thickness];
  const pathIdx = useRef(Math.floor(Math.random() * PATH_VARIANTS.length));

  const mainPath = PATH_VARIANTS[pathIdx.current](width, strokeWidth);
  const subPath = PATH_VARIANTS[(pathIdx.current + 1) % PATH_VARIANTS.length](width, strokeWidth * 0.5);

  return (
    <View style={[styles.container, style]}>
      <Svg width={width} height={8} viewBox={`0 0 ${width} 8`}>
        <Path
          d={paths.mainPath}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          opacity={0.6}
          strokeLinecap="round"
        />
        <Path
          d={paths.subPath}
          stroke={color}
          strokeWidth={strokeWidth * 0.5}
          fill="none"
          opacity={0.3}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
});

export { InkDivider };

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
});