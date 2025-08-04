import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../context/ThemeContext";

function ReportsScreen() {
  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);

  return (
    <SafeAreaView style={styles.rootContainer} edges={["top"]}>
      <Text>Reports Screen</Text>
    </SafeAreaView>
  );
}

export default ReportsScreen;

const getStyles = (StyleColors) =>
  StyleSheet.create({
    rootContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: StyleColors.background,
    },
  });
