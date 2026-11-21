import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

export default function SwipeAction({ translation, distance, children }) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX: interpolate(
        translation.value,
        [-distance, 0],
        [0, distance],
        Extrapolation.CLAMP
      ),
    }],
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
