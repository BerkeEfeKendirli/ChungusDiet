import { View, StyleSheet } from "react-native";
import NutrientBar from "./NutrientBar";
import { StyleColors } from "../../constants/colors";

function NutrientsIndicator() {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.pfcContainer}>
        <NutrientBar type="Proteins" fillColor={StyleColors.red} />
        <NutrientBar type="Fats" fillColor={StyleColors.orange} />
        <NutrientBar type="Carbs" fillColor={StyleColors.lightGreen} />
      </View>
      <View style={styles.calorieContainer}>
        <NutrientBar type="Calories" fillColor={StyleColors.primary} />
      </View>
    </View>
  );
}

export default NutrientsIndicator;

const styles = StyleSheet.create({
  rootContainer: {
    gap: 24,
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: StyleColors.surfacePrimary,
    borderRadius: 20,
  },
  pfcContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 24,
    width: "100%",
  },
  calorieContainer: {},
});
