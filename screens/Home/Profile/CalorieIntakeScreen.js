import { Text, View, StyleSheet } from "react-native";
import { StyleColors } from "../../../constants/colors";

function CalorieIntakeScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text>CalorieIntakeScreen</Text>
    </View>
  );
}

export default CalorieIntakeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: StyleColors.background,
  },
});
