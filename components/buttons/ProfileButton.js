import { Pressable, StyleSheet, Text } from "react-native";

function ProfileButton({ text, onPress, backgroundColor, textColor, object }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        { backgroundColor: backgroundColor },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
      {object}
    </Pressable>
  );
}

export default ProfileButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 10,
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
    fontSize: 14,
  },
});
