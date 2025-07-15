import { Pressable, Text, StyleSheet } from "react-native";
import { StyleColors } from "../../constants/colors";

function TextButton({ text, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

export default TextButton;

const styles = StyleSheet.create({
  text: {
    fontFamily: "inter-regular",
    fontSize: 16,
    color: StyleColors.onBackgroundVariant,
  },
  pressed: {
    opacity: 0.7,
  },
});
