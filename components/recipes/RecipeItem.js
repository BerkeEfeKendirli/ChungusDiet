import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Image, Text, View, StyleSheet, Pressable } from "react-native";
import { StyleColors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

function RecipeItem({ title, area, category, image, onPress }) {
  return (
    <Pressable style={styles.rootContainer} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.mealText} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          <Text style={styles.secondaryText}>{area}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Ionicons
            name="pricetag-outline"
            size={12.67}
            color={StyleColors.onBackgroundVariant}
          />
          <Text style={styles.secondaryText}>{category}</Text>
        </View>
      </View>
    </Pressable>
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
    maxWidth: 230,
  },
  secondaryText: {
    fontFamily: "inter-regular",
    fontSize: 12,
    color: StyleColors.onSurfaceVariant,
  },
});
