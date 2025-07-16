import { Pressable, StyleSheet, Text } from "react-native";
import { StyleColors } from "../../constants/colors";

function Button({ onPress, text, style, textColor, icon }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
    >
      {icon && icon}
      <Text
        style={[styles.text, { color: textColor, marginLeft: icon ? 8 : 0 }]}
      >
        {text}
      </Text>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    fontFamily: "inter-medium",
    textAlign: "center",
    fontSize: 16,
    paddingVertical: 16,
  },
});
