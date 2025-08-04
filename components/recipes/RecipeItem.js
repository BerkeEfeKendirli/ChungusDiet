import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
function RecipeItem({ title, area, category, image, onPress }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);
  return (
    <Pressable style={styles.rootContainer} onPress={onPress}>
      <View>
        {!imageLoaded && (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Loading...</Text>
          </View>
        )}
        <Image
          source={image}
          style={styles.image}
          onLoad={() => setImageLoaded(true)}
        />
      </View>
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

const getStyles = (StyleColors) =>
  StyleSheet.create({
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
    placeholder: {
      position: "absolute",
      width: "100%",
      height: 164,
      backgroundColor: StyleColors.surfaceVariant,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1,
    },
    placeholderText: {
      fontFamily: "inter-regular",
      fontSize: 13,
      color: StyleColors.onSurfaceVariant,
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
