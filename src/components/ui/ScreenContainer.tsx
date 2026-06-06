import React from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/theme';

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  safeTop?: boolean;
  safeBottom?: boolean;
}

export function ScreenContainer({
  children,
  style,
  safeTop = true,
  safeBottom = true,
}: ScreenContainerProps) {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        { flex: 1, backgroundColor: colors.bg.primary },
        safeTop && { paddingTop: insets.top + 8 },
        safeBottom && { paddingBottom: insets.bottom + 8 },
        style,
      ]}
    >
      {children}
    </View>
  );
}