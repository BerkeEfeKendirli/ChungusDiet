import { View, StyleSheet, Text } from "react-native";
import { StyleColors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

function Meal() {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.timeContainer}>
        <Text style={styles.mealText}>Breakfast</Text>
        <View style={styles.time}>
          <Ionicons
            name="time-outline"
            color={StyleColors.onBackgroundVariant}
            size={12.67}
          />
          <Text style={styles.timeText}>10:45 AM</Text>
        </View>
      </View>
      <View style={styles.calorieContainer}>
        <Text style={styles.calText}>531 Cal</Text>
      </View>
    </View>
  );
}

export default Meal;

const styles = StyleSheet.create({
  rootContainer: {
    padding: 16,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: StyleColors.surfacePrimary,
    marginBottom: 2,
  },
  timeContainer: {
    gap: 21.5,
  },
  time: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  calorieContainer: {},
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
    fontFamily: "inter-medium",
    fontSize: 16,
    color: StyleColors.onSurfacePrimary,
  },
});
