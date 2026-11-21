import SwipeAction from "../ui/SwipeAction";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";

function ReportItem({ date, weight, onEdit, onDelete }) {
  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);
  const [swiped, setSwiped] = useState(false);

  const renderRightActions = (progress, dragX) => {
    return (
      <View style={styles.rectButtonsContainer}>
        <SwipeAction translation={dragX} distance={96}>
          <RectButton style={styles.editButton} onPress={onEdit}>
            <Ionicons name="pencil" size={24} color={StyleColors.background} />
          </RectButton>
        </SwipeAction>
        <SwipeAction translation={dragX} distance={96}>
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
    <Swipeable
      renderRightActions={renderRightActions}
      onSwipeableOpen={() => setSwiped(true)}
      onSwipeableClose={() => setSwiped(false)}
    >
      <View style={styles.rootContainer}>
        <Text style={styles.text}>{date}</Text>
        <Text style={styles.text}>{weight} kg</Text>
      </View>
    </Swipeable>
  );
}

export default ReportItem;

const getStyles = (StyleColors) =>
  StyleSheet.create({
    rootContainer: {
      backgroundColor: StyleColors.surfacePrimary,
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      padding: 12,
      borderRadius: 10,
    },
    text: {
      fontFamily: "inter-semibold",
      fontSize: 12,
      color: StyleColors.onBackground,
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
