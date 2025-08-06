import { Ionicons } from "@expo/vector-icons";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { RectButton, Swipeable } from "react-native-gesture-handler";

function MealFood({
  onEdit,
  onDelete,
  meal = "",
  calories,
  proteins,
  fats,
  carbs,
}) {
  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);

  const renderRightActions = (progress, dragX) => {
    const translateX = dragX.interpolate({
      inputRange: [-96, 0],
      outputRange: [0, 96],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.rectButtonsContainer}>
        <Animated.View style={{ transform: [{ translateX }] }}>
          <RectButton style={styles.editButton} onPress={onEdit}>
            <Ionicons name="pencil" size={24} color={StyleColors.background} />
          </RectButton>
        </Animated.View>
        <Animated.View style={{ transform: [{ translateX }] }}>
          <RectButton style={styles.deleteButton} onPress={onDelete}>
            <Ionicons
              name="trash-outline"
              size={24}
              color={StyleColors.background}
            />
          </RectButton>
        </Animated.View>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.rootContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.mealText}>{meal}</Text>
          <Text style={styles.nutritionText}>
            {calories} cal • {proteins} g protein • {fats} g fat • {carbs} g
            carb
          </Text>
        </View>
      </View>
    </Swipeable>
  );
}

export default MealFood;

const getStyles = (StyleColors) =>
  StyleSheet.create({
    rootContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
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
    rectButtonsContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    deleteButton: {
      backgroundColor: StyleColors.danger,
      justifyContent: "center",
      alignItems: "center",
      width: 48,
      height: "100%",
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    },
    editButton: {
      backgroundColor: StyleColors.orange,
      justifyContent: "center",
      alignItems: "center",
      width: 48,
      height: "100%",
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    },
  });
