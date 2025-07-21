import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { StyleColors } from "../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

function LoadingScreen() {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <ActivityIndicator color={StyleColors.primary} size={"large"} />
      <Text style={styles.text}>Loading...</Text>
    </SafeAreaView>
  );
}

export default LoadingScreen;

const styles = StyleSheet.create({
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
