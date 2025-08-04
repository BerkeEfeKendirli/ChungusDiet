import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

function SettingsButton({ icon, text, textColor, iconColor, onPress }) {
  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        color={iconColor || StyleColors.primary}
        size={20}
      />
      <Text
        style={[styles.text, { color: textColor || StyleColors.onBackground }]}
      >
        {text}
      </Text>
    </Pressable>
  );
}

export default SettingsButton;

const getStyles = (StyleColors) =>
  StyleSheet.create({
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
