import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet, Animated } from "react-native";
import { StyleColors } from "../../constants/colors";

function CustomSwitch({ value = false, onValueChange }) {
  const [animatedValue] = useState(new Animated.Value(value ? 1 : 0));
  const toggleSwitch = () => {
    Animated.timing(animatedValue, {
      toValue: value ? 0 : 1,
      duration: 180,
      useNativeDriver: false,
    }).start();
    onValueChange(!value);
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggleSwitch}
      style={[
        styles.switchContainer,
        { backgroundColor: value ? StyleColors.primary : "transparent" },
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          { transform: [{ translateX }] },
          {
            backgroundColor: value
              ? StyleColors.onPrimary
              : StyleColors.primary,
          },
          {
            width: value ? 16 : 14,
          },
          {
            height: value ? 16 : 14,
          },
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    width: 40,
    height: 24,
    borderRadius: 12,
    padding: 2,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: StyleColors.primary,
  },
  circle: {
    borderRadius: 10,
    position: "absolute",
    left: 3,
  },
});

export default CustomSwitch;
