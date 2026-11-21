import SwipeAction from "../ui/SwipeAction";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { useTheme } from "../../context/ThemeContext";

function Meal({
  title,
  time,
  calorie,
  proteins,
  fats,
  carbs,
  onEdit,
  onDelete,
}) {
  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);

  const renderRightActions = (progress, dragX) => {
    return (
      <View style={styles.rectButtonsContainer}>
        <SwipeAction translation={dragX} distance={128}>
          <RectButton style={styles.editButton} onPress={onEdit}>
            <Ionicons name="pencil" size={24} color={StyleColors.background} />
          </RectButton>
        </SwipeAction>
        <SwipeAction translation={dragX} distance={128}>
          <RectButton style={styles.deleteButton} onPress={onDelete}>
            <Ionicons
              name="trash-outline"
              size={24}
              color={StyleColors.background}
            />
          </RectButton>
        </SwipeAction>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
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
    </Swipeable>
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
    rectButtonsContainer: {
      alignItems: "center",
      flexDirection: "row",
    },
    deleteButton: {
      backgroundColor: StyleColors.danger,
      justifyContent: "center",
      alignItems: "center",
      width: 64,
      height: "100%",
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    },
    editButton: {
      backgroundColor: StyleColors.orange,
      justifyContent: "center",
      alignItems: "center",
      width: 64,
      height: "100%",
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    },
  });
