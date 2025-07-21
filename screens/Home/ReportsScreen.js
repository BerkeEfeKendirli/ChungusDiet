import { View, Text, StyleSheet } from "react-native";
import { StyleColors } from "../../constants/colors";

function ReportsScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text>Reports Screen</Text>
    </View>
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
