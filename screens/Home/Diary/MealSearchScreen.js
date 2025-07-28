import { View, Text, StyleSheet } from "react-native";
import { StyleColors } from "../../../constants/colors";

function MealSearchScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text>Meal Search Screen</Text>
    </View>
  );
}

export default MealSearchScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: StyleColors.background,
  },
});
