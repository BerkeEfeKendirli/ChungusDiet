import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { StyleColors } from "./../../constants/colors";

function SettingsButton({
  icon,
  text,
  textColor = StyleColors.onBackground,
  iconColor = StyleColors.primary,
  onPress,
}) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={icon} color={iconColor} size={20} />
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </Pressable>
  );
}

export default SettingsButton;

const styles = StyleSheet.create({
  button: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: StyleColors.background,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    fontFamily: "inter-regular",
    fontSize: 14,
  },
});
