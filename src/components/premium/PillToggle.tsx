import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useColors } from '@/theme';
import { KageText } from '@/components/ui/KageText';

interface PillToggleOption {
  key: string;
  label: string;
  dotColor: string;
}

interface PillToggleProps {
  options: PillToggleOption[];
  selected: string;
  onSelect: (key: string) => void;
}

export function PillToggle({ options, selected, onSelect }: PillToggleProps) {
  const colors = useColors();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: 'rgba(26,26,36,0.6)',
          borderColor: 'rgba(255,255,255,0.05)',
        },
      ]}
    >
      {options.map((opt) => {
        const isActive = selected === opt.key;
        return (
          <TouchableOpacity
            key={opt.key}
            onPress={() => onSelect(opt.key)}
            activeOpacity={0.7}
            style={[
              styles.pill,
              isActive && {
                backgroundColor: `${opt.dotColor}30`,
                borderColor: opt.dotColor,
              },
              !isActive && { borderColor: 'transparent' },
            ]}
          >
            <View style={[styles.dot, { backgroundColor: opt.dotColor }]} />
            <KageText
              variant="caption"
              style={{
                fontSize: 10,
                fontWeight: isActive ? '800' : '400',
                color: isActive ? '#FFFFFF' : '#8E9EAF',
                letterSpacing: 1,
              }}
            >
              {opt.label}
            </KageText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 100,
    borderWidth: 1,
    gap: 4,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
