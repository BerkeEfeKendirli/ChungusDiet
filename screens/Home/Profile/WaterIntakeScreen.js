import { Text, View, StyleSheet } from "react-native";
import { StyleColors } from "../../../constants/colors";

function WaterIntakeScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text>WaterIntakeScreen</Text>
    </View>
  );
}

export default WaterIntakeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: StyleColors.background,
  },
});
