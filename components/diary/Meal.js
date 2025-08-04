import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

function Meal({ title, time, calorie, proteins, fats, carbs }) {
  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.timeContainer}>
        <Text style={styles.mealText}>{title}</Text>
        <View style={styles.time}>
          <Ionicons
            name="time-outline"
            color={StyleColors.onBackgroundVariant}
            size={12.67}
          />
          <Text style={styles.timeText}>{time}</Text>
        </View>
      </View>
      <View style={styles.calorieContainer}>
        <Text style={styles.calText}>{calorie} Cal</Text>
        <Text style={styles.nutritionText}>
          {proteins} g protein • {fats} g fat • {carbs} g carb
        </Text>
      </View>
    </View>
  );
}

export default Meal;

const getStyles = (StyleColors) =>
  StyleSheet.create({
    rootContainer: {
      padding: 16,
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: StyleColors.surfacePrimary,
    },
    timeContainer: {
      gap: 21.5,
    },
    time: {
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
    },
    calorieContainer: {
      justifyContent: "space-between",
      alignItems: "center",
    },
    mealText: {
      fontFamily: "inter-regular",
      fontSize: 14,
      color: StyleColors.onSurfacePrimary,
    },
    timeText: {
      fontFamily: "inter-regular",
      fontSize: 12,
      color: StyleColors.onSurfaceVariant,
    },
    calText: {
      alignSelf: "flex-end",
      fontFamily: "inter-medium",
      fontSize: 16,
      color: StyleColors.onSurfacePrimary,
    },
    nutritionText: {
      fontFamily: "inter-regular",
      fontSize: 12,
      color: StyleColors.onBackgroundVariant,
    },
  });
