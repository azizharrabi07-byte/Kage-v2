import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { KageText } from '@/components/ui/KageText';
import { useColors } from '@/theme';

const { width } = Dimensions.get('window');

interface Milestone {
  rank: string;
  kanji: string;
  title: string;
  desc: string;
  xpRequired: number;
  unlocked: boolean;
}

const MILESTONES: Milestone[] = [
  { rank: 'E-', kanji: '足軽', title: 'Ashigaru', desc: 'The first step on the warrior path', xpRequired: 0, unlocked: true },
  { rank: 'D', kanji: '侍', title: 'Samurai', desc: 'Discipline begins to take shape', xpRequired: 1000, unlocked: true },
  { rank: 'C', kanji: '武者', title: 'Musha', desc: 'Your blade has found its edge', xpRequired: 3000, unlocked: true },
  { rank: 'B', kanji: '将', title: 'Shogun', desc: 'You command respect on the battlefield', xpRequired: 6000, unlocked: false },
  { rank: 'A', kanji: '達人', title: 'Tatsujin', desc: 'Mastery is no longer a distant dream', xpRequired: 10000, unlocked: false },
  { rank: 'S', kanji: '影', title: 'Kage', desc: 'You have become the shadow itself', xpRequired: 20000, unlocked: false },
];

function PathNode({ milestone, index, isLast, isCurrent }: {
  milestone: Milestone; index: number; isLast: boolean; isCurrent: boolean;
}) {
  const colors = useColors();
  const pulse = useSharedValue(1);

  React.useEffect(() => {
    if (isCurrent) {
      pulse.value = withRepeat(
        withSequence(
          withTiming(1.4, { duration: 800, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        ),
        -1, true,
      );
    }
  }, [isCurrent]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));
  const unlocked = milestone.unlocked;
  const nodeColor = unlocked ? colors.accent.primary : colors.text.muted;
  const lineColor = unlocked ? colors.accent.primary + '44' : colors.glass.border;

  return (
    <View style={styles.nodeRow}>
      <View style={styles.nodeColumn}>
        <Animated.View style={[styles.node, { borderColor: nodeColor, backgroundColor: unlocked ? colors.accent.primary + '22' : colors.glass.medium }, isCurrent && pulseStyle]}>
          <View style={[styles.nodeInner, { backgroundColor: nodeColor }]} />
        </Animated.View>
        {!isLast && (
          <View style={[styles.nodeLine, { backgroundColor: lineColor }]} />
        )}
      </View>
      <View style={[styles.nodeContent, { opacity: unlocked ? 1 : 0.4 }]}>
        <View style={styles.nodeHeader}>
          <KageText variant="mono" style={{ fontSize: 9, color: nodeColor, letterSpacing: 2 }}>
            {milestone.rank}
          </KageText>
          <KageText variant="kanji" style={{ fontSize: 14, color: unlocked ? colors.accent.neon : colors.text.muted }}>
            {milestone.kanji}
          </KageText>
        </View>
        <KageText variant="bodyBold" style={{ fontSize: 14, color: unlocked ? colors.text.primary : colors.text.muted, marginTop: 2 }}>
          {milestone.title}
        </KageText>
        <KageText variant="caption" style={{ fontSize: 10, color: colors.text.muted, marginTop: 2 }}>
          {milestone.desc}
        </KageText>
        {isCurrent && (
          <View style={[styles.currentBadge, { backgroundColor: colors.accent.primary + '22', borderColor: colors.accent.primary }]}>
            <KageText variant="mono" style={{ fontSize: 7, color: colors.accent.primary, letterSpacing: 1 }}>
              CURRENT
            </KageText>
          </View>
        )}
      </View>
    </View>
  );
}

export function ShadowPath() {
  const colors = useColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.kage.sumi, borderColor: colors.glass.border }]}>
      <View style={styles.header}>
        <KageText variant="mono" style={{ fontSize: 9, color: colors.accent.primary, letterSpacing: 3 }}>
          SHADOW PATH
        </KageText>
        <KageText variant="kanji" style={{ fontSize: 12, color: colors.text.muted, letterSpacing: 2 }}>
          影の道
        </KageText>
      </View>
      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        {MILESTONES.map((m, i) => (
          <PathNode
            key={m.rank}
            milestone={m}
            index={i}
            isLast={i === MILESTONES.length - 1}
            isCurrent={i === 2}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    maxHeight: 320,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scrollArea: {
    flexGrow: 0,
  },
  nodeRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 0,
  },
  nodeColumn: {
    alignItems: 'center',
    width: 28,
  },
  node: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  nodeLine: {
    width: 2,
    flex: 1,
    minHeight: 40,
    marginVertical: 4,
  },
  nodeContent: {
    flex: 1,
    paddingBottom: 24,
  },
  nodeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currentBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    marginTop: 6,
  },
});
