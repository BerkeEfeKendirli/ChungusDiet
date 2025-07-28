import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { StyleColors } from "../../constants/colors";

function MealFood({ onPress, meal = "", grams, calories }) {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.mealText}>{meal}</Text>
        <Text style={styles.nutritionText}>
          {grams} g • {calories} Cal
        </Text>
      </View>
      <Ionicons
        name="ellipsis-vertical"
        size={14}
        color={StyleColors.onBackground}
        onPress={onPress}
      />
    </View>
  );
}

export default MealFood;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textContainer: {
    gap: 4,
  },
  mealText: {
    fontFamily: "inter-semibold",
    fontSize: 12,
    color: StyleColors.onBackground,
  },
  nutritionText: {
    fontFamily: "inter-regular",
    fontSize: 12,
    color: StyleColors.onBackgroundVariant,
  },
});
