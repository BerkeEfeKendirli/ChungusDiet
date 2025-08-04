import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

function LoadingScreen() {
  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ActivityIndicator color={StyleColors.primary} size={"large"} />
      <Text style={styles.text}>Loading...</Text>
    </SafeAreaView>
  );
}

export default LoadingScreen;

const getStyles = (StyleColors) =>
  StyleSheet.create({
    rootContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: StyleColors.background,
    },
    text: {
      fontFamily: "inter-regular",
      fontSize: 16,
      color: StyleColors.primary,
      marginTop: 8,
    },
  });
