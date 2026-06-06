import React from 'react';
import { FlatList, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';
import { useColors } from '@/theme';
import { KageText } from '@/components/ui/KageText';
import { Card } from '@/components/premium/Card';
import type { WorkoutTemplate } from '@/store/types';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.75;
const CARD_SPACING = 15;

interface ProgramCardProps {
  item: WorkoutTemplate;
  accentColor: string;
  onSelect?: (program: WorkoutTemplate) => void;
}

function ProgramCard({ item, accentColor, onSelect }: ProgramCardProps) {
  const colors = useColors();
  const scale = useSharedValue(1);
  const elevation = useSharedValue(8);

  const onPressIn = () => {
    scale.value = withTiming(0.97, { duration: 100 });
    elevation.value = withTiming(4, { duration: 100 });
  };
  const onPressOut = () => {
    scale.value = withSpring(1, { damping: 12, stiffness: 100 });
    elevation.value = withSpring(8, { damping: 12, stiffness: 100 });
  };

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    elevation: elevation.value,
    shadowRadius: elevation.value,
  }));

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={() => onSelect?.(item)}
      style={styles.cardWrapper}
    >
      <Card style={[styles.programCard, animatedCardStyle]} accentColor={accentColor}>
        <View style={styles.overlay}>
          <KageText variant="kanji" style={{ fontSize: 24, color: '#FFFFFF', marginBottom: 4 }}>{item.kanji}</KageText>
          <KageText variant="bodyBold" style={{ fontSize: 18, color: colors.text.primary, marginBottom: 5 }}>{item.name}</KageText>
          <View style={styles.detailsRow}>
            <KageText variant="caption" color={colors.text.muted}>{item.duration}min</KageText>
            <KageText variant="caption" color={colors.text.muted}>{item.exercises.length} workouts</KageText>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

interface EquipmentCarouselProps {
  programs: WorkoutTemplate[];
  accentColor?: string;
  onSelect?: (program: WorkoutTemplate) => void;
}

export function EquipmentCarousel({ programs, accentColor, onSelect }: EquipmentCarouselProps) {
  const colors = useColors();

  return (
    <FlatList
      data={programs}
      renderItem={({ item }) => (
        <ProgramCard item={item} accentColor={accentColor || colors.accent.primary} onSelect={onSelect} />
      )}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD_WIDTH + CARD_SPACING}
      decelerationRate="fast"
      contentContainerStyle={styles.carouselContentContainer}
    />
  );
}

const styles = StyleSheet.create({
  carouselContentContainer: { paddingHorizontal: 16, paddingBottom: 10 },
  cardWrapper: { width: CARD_WIDTH, marginRight: CARD_SPACING },
  programCard: { height: 200, width: '100%' },
  overlay: {
    flex: 1,
    borderRadius: 16,
    padding: 15,
    justifyContent: 'flex-end',
  },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
});
