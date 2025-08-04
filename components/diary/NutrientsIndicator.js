import { View, StyleSheet } from "react-native";
import NutrientBar from "./NutrientBar";
import { useTheme } from "../../context/ThemeContext";

function NutrientsIndicator({ proteins, fats, carbs, calories }) {
  const getPercentage = (completed, total) => {
    return total > 0 ? Math.min((completed / total) * 100, 100) : 0;
  };

  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);
  return (
    <View style={styles.rootContainer}>
      <View style={styles.pfcContainer}>
        <NutrientBar
          type="Proteins"
          fillColor={StyleColors.red}
          completed={proteins.completed}
          total={proteins.total}
          percentage={getPercentage(proteins.completed, proteins.total)}
        />
        <NutrientBar
          type="Fats"
          fillColor={StyleColors.orange}
          completed={fats.completed}
          total={fats.total}
          percentage={getPercentage(fats.completed, fats.total)}
        />
        <NutrientBar
          type="Carbs"
          fillColor={StyleColors.lightGreen}
          completed={carbs.completed}
          total={carbs.total}
          percentage={getPercentage(carbs.completed, carbs.total)}
        />
      </View>
      <View style={styles.calorieContainer}>
        <NutrientBar
          type="Calories"
          fillColor={StyleColors.primary}
          completed={calories.completed}
          total={calories.total}
          percentage={getPercentage(calories.completed, calories.total)}
        />
      </View>
    </View>
  );
}

export default NutrientsIndicator;

const getStyles = (StyleColors) =>
  StyleSheet.create({
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
