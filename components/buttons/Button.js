import { Pressable, StyleSheet, Text } from "react-native";
import { StyleColors } from "../../constants/colors";

function Button({ onPress, text }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: StyleColors.primary,
    borderRadius: 10,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    fontFamily: "inter-medium",
    textAlign: "center",
    fontSize: 16,
    paddingVertical: 16,
    color: StyleColors.onPrimary,
  },
});
