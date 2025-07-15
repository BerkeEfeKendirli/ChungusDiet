import { StyleSheet, View, Animated } from "react-native";
import { StyleColors } from "../../constants/colors";
import { useEffect, useRef } from "react";

function OnboardingNavigation({ slides, currentSlide }) {
  const animatedValues = useRef(
    slides.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    animatedValues.forEach((animValue, index) => {
      Animated.timing(animValue, {
        toValue: index === currentSlide ? 1 : 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
    });
  }, [currentSlide]);

  return (
    <View style={styles.pagination}>
      {slides.map((_, index) => {
        const width = animatedValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [8, 24],
        });
        const backgroundColor = animatedValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [StyleColors.outline, StyleColors.primary],
        });

        return (
          <Animated.View
            key={index}
            style={[styles.dot, { width, backgroundColor }]}
          ></Animated.View>
        );
      })}
    </View>
  );
}

export default OnboardingNavigation;

const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
