import { Ionicons } from "@expo/vector-icons";
import { Image, Text, View, StyleSheet } from "react-native";
import { StyleColors } from "../../constants/colors";

function RecipeItem() {
  return (
    <View style={styles.rootContainer}>
      <Image
        source={require("../../assets/images/sushi.jpg")}
        style={styles.image}
      />
      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.mealText}>Sushi</Text>
          <Text style={styles.secondaryText}>244 Cal</Text>
        </View>
        <View style={styles.timeContainer}>
          <Ionicons
            name="time-outline"
            size={12.67}
            color={StyleColors.onSurfaceVariant}
          />
          <Text style={styles.secondaryText}>60 min</Text>
        </View>
      </View>
    </View>
  );
}

export default RecipeItem;

const styles = StyleSheet.create({
  rootContainer: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 164,
    resizeMode: "cover",
  },
  bottomContainer: {
    backgroundColor: StyleColors.surfacePrimary,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 4,
  },
  mealText: {
    fontFamily: "inter-medium",
    fontSize: 16,
    color: StyleColors.onSurfacePrimary,
  },
  secondaryText: {
    fontFamily: "inter-regular",
    fontSize: 12,
    color: StyleColors.onSurfaceVariant,
  },
});
