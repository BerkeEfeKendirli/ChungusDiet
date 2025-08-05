import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";

function ReportItem({ date, weight }) {
  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);

  return (
    <Pressable style={styles.rootContainer}>
      <Text style={styles.text}>{date}</Text>
      <Text style={styles.text}>{weight} kg</Text>
    </Pressable>
  );
}

export default ReportItem;

const getStyles = (StyleColors) =>
  StyleSheet.create({
    rootContainer: {
      backgroundColor: StyleColors.surfacePrimary,
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      padding: 12,
      borderRadius: 10,
    },
    text: {
      fontFamily: "inter-semibold",
      fontSize: 12,
      color: StyleColors.onBackground,
    },
  });
