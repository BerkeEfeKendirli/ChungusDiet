import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { StyleColors } from "../../constants/colors";

function FloatingActionButton({ icon, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={13} color={StyleColors.onPrimary} />
    </Pressable>
  );
}

export default FloatingActionButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: StyleColors.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
