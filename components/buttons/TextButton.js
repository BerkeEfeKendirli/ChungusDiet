import { Pressable, Text, StyleSheet } from "react-native";
import { StyleColors } from "../../constants/colors";

function TextButton({ text, onPress, style }) {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onPress}
    >
      <Text style={style}>{text}</Text>
    </Pressable>
  );
}

export default TextButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
