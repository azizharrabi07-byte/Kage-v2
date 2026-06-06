import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { useColors } from '@/theme';
import { KageText } from './KageText';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface LoadingSpinnerProps {
  message?: string;
  size?: number;
}

export function LoadingSpinner({ message, size = 40 }: LoadingSpinnerProps) {
  const colors = useColors();
  const rotation = useSharedValue(0);
  const strokeOffset = useSharedValue(0);

  rotation.value = withRepeat(
    withTiming(360, { duration: 1200, easing: Easing.linear }),
    -1,
    false,
  );
  strokeOffset.value = withRepeat(
    withTiming(1, { duration: 800, easing: Easing.inOut(Easing.sin) }),
    -1,
    true,
  );

  const animProps = useAnimatedProps(() => ({
    strokeDashoffset: 150 * (1 - strokeOffset.value),
    rotation: rotation.value,
  }));

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox="0 0 60 60">
        <AnimatedCircle
          cx={30}
          cy={30}
          r={24}
          stroke={colors.accent.primary}
          strokeWidth={3}
          fill="none"
          strokeDasharray={150}
          strokeLinecap="round"
          animatedProps={animProps}
        />
      </Svg>
      {message && (
        <KageText
          variant="caption"
          align="center"
          color={colors.text.muted}
          style={{ marginTop: 12, letterSpacing: 2 }}
        >
          {message}
        </KageText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
});
