import { View, Text, StyleSheet } from "react-native";
import { StyleColors } from "../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

function ReportsScreen() {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <Text>Reports Screen</Text>
    </SafeAreaView>
  );
}

export default ReportsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: StyleColors.background,
  },
});
