import { Pressable, Text, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
function SearchItem({ foodName, cal, servings, onPress }) {
  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);
  return (
    <Pressable style={styles.rootContainer} onPress={onPress}>
      <Text style={styles.foodText}>{foodName}</Text>
      <Text style={styles.calorieText}>
        {cal} cal / {servings}
      </Text>
    </Pressable>
  );
}

export default SearchItem;

const getStyles = (StyleColors) =>
  StyleSheet.create({
    rootContainer: {
      gap: 4,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    foodText: {
      fontFamily: "inter-regular",
      fontSize: 14,
      color: StyleColors.onBackground,
    },
    calorieText: {
      fontFamily: "inter-regular",
      fontSize: 12,
      color: StyleColors.onBackgroundVariant,
    },
  });
