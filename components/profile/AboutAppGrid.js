import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

function AboutAppGrid({ icon = "", text = "" }) {
  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);
  return (
    <View style={styles.rootContainer}>
      <Ionicons name={icon} size={24} color={StyleColors.primary} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

export default AboutAppGrid;

const getStyles = (StyleColors) =>
  StyleSheet.create({
    rootContainer: {
      width: 93,
      height: 90,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: StyleColors.primary,
      borderRadius: 10,
    },
    text: {
      fontFamily: "inter-regular",
      fontSize: 12,
      color: StyleColors.primary,
    },
  });
