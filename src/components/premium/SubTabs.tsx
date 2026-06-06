import React from 'react';
import { View, TouchableOpacity, StyleSheet, LayoutChangeEvent } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useColors } from '@/theme';
import { KageText } from '@/components/ui/KageText';

interface SubTabsProps {
  tabs: { label: string; dotColor?: string }[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export function SubTabs({ tabs, selectedIndex, onSelect }: SubTabsProps) {
  const colors = useColors();
  const translateX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);
  const tabWidths = React.useRef<number[]>(new Array(tabs.length).fill(0));

  const onLayoutTab = (event: LayoutChangeEvent, index: number) => {
    tabWidths.current[index] = event.nativeEvent.layout.width;
    if (tabWidths.current.every(w => w > 0) && index === tabs.length - 1) {
      updateIndicator(selectedIndex, false);
    }
  };

  const updateIndicator = (index: number, animate: boolean = true) => {
    const newWidth = tabWidths.current[index];
    const newTranslateX = tabWidths.current.slice(0, index).reduce((sum, w) => sum + w, 0);
    if (animate) {
      translateX.value = withSpring(newTranslateX, { damping: 15, stiffness: 100 });
      indicatorWidth.value = withSpring(newWidth, { damping: 15, stiffness: 100 });
    } else {
      translateX.value = newTranslateX;
      indicatorWidth.value = newWidth;
    }
  };

  React.useEffect(() => {
    if (tabWidths.current.every(w => w > 0)) {
      updateIndicator(selectedIndex);
    }
  }, [selectedIndex]);

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    width: indicatorWidth.value,
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={[styles.container, { backgroundColor: '#1A1A24' }]}>
      <Animated.View style={[styles.activeIndicator, { backgroundColor: colors.accent.primary }, animatedIndicatorStyle]} />
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          onLayout={(event) => onLayoutTab(event, index)}
          onPress={() => onSelect(index)}
          style={styles.tabButton}
        >
          <KageText
            variant="bodyBold"
            style={{
              fontSize: 14,
              color: selectedIndex === index ? '#FFFFFF' : '#8E9EAF',
            }}
          >
            {tab.label}
          </KageText>
          {tab.dotColor && (
            <View style={[styles.dot, { backgroundColor: tab.dotColor }]} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    height: 50,
    alignItems: 'center',
    padding: 4,
    justifyContent: 'space-around',
  },
  activeIndicator: {
    position: 'absolute',
    height: '100%',
    borderRadius: 10,
    zIndex: 0,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    zIndex: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
});
