import { Pressable, Text, StyleSheet } from "react-native";
import { StyleColors } from "../../constants/colors";

function SearchItem({ foodName, cal, servings, onPress }) {
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

const styles = StyleSheet.create({
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
