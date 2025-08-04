import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import YoutubeDirector from "../../../components/recipes/YoutubeDirector";
import { useTheme } from "../../../context/ThemeContext";

function RecipeDetailScreen({ navigation }) {
  const route = useRoute();
  const { title, area, category, image, instructions, youtube } = route.params;
  const insets = useSafeAreaInsets();

  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);

  return (
    <View style={[styles.rootContainer, { paddingBottom: insets.bottom }]}>
      <Image source={image} style={styles.image} />
      <Ionicons
        name="close"
        size={24}
        color={StyleColors.onSurfacePrimary}
        style={styles.closeIcon}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.mealInfoContainer}>
        <View>
          <Text style={styles.title}>{title}</Text>
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
      <View style={styles.youtubeContainer}>
        {youtube ? (
          <YoutubeDirector link={youtube} title={title} />
        ) : (
          <Text style={styles.secondaryText}>
            No video available for this recipe.
          </Text>
        )}
      </View>
      <View style={styles.divider}></View>
      <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{instructions}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default RecipeDetailScreen;

const getStyles = (StyleColors) =>
  StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: StyleColors.background,
    },
    closeIcon: {
      position: "absolute",
      left: 20,
      top: 28,
    },
    image: {
      height: 250,
      width: "100%",
      resizeMode: "cover",
    },
    mealInfoContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      marginTop: 16,
      marginBottom: 12,
    },
    timeContainer: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      gap: 4,
    },
    youtubeContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 18,
      marginBottom: 15,
    },
    descriptionContainer: {
      paddingHorizontal: 16,
      paddingTop: 19,
      marginBottom: 10,
    },
    divider: {
      height: 1,
      backgroundColor: StyleColors.outline,
    },
    title: {
      fontFamily: "inter-medium",
      fontSize: 16,
      color: StyleColors.onBackground,
      maxWidth: 279,
    },
    secondaryText: {
      fontFamily: "inter-regular",
      fontSize: 12,
      color: StyleColors.onBackgroundVariant,
    },
    description: {
      fontFamily: "inter-regular",
      fontSize: 14,
      color: StyleColors.onBackground,
    },
  });
