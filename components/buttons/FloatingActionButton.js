import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

function FloatingActionButton({
  icon,
  onPress,
  size,
  backgroundColor,
  iconColor,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: backgroundColor,
        },
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={13} color={iconColor} />
    </Pressable>
  );
}

export default FloatingActionButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
