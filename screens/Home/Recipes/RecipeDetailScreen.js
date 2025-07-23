import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import RecipeDetailNutrition from "../../../components/recipes/RecipeDetailNutrition";
import { StyleColors } from "../../../constants/colors";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

function RecipeDetailScreen({ navigation }) {
  const route = useRoute();
  const { title, calories, time, image } = route.params;
  const insets = useSafeAreaInsets();

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
          <Text style={styles.secondaryText}>{calories} Cal</Text>
        </View>
        <View style={styles.timeContainer}>
          <Ionicons
            name="time-outline"
            size={12.67}
            color={StyleColors.onBackgroundVariant}
          />
          <Text style={styles.secondaryText}>{time} min</Text>
        </View>
      </View>
      <View style={styles.nutritionContainer}>
        <RecipeDetailNutrition number="300" text="Calories" />
        <RecipeDetailNutrition number="20g" text="Proteins" />
        <RecipeDetailNutrition number="15g" text="Fats" />
        <RecipeDetailNutrition number="15g" text="Carbs" />
      </View>
      <View style={styles.divider}></View>
      <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet consectetur. Fringilla mauris est lorem
            et amet. Vestibulum tristique volutpat massa aliquet ultrices eu
            pretium. Ultrices risus blandit at id nibh euismod. In sit commodo
            ornare felis tincidunt faucibus nunc a. Nisl sagittis leo velit
            pharetra dolor nibh fermentum adipiscing adipiscing.Lorem ipsum
            dolor sit amet consectetur. Fringilla mauris est lorem et amet.
            Vestibulum tristique volutpat massa aliquet ultrices eu pretium.
            Ultrices risus blandit at id nibh euismod. In sit commodo ornare
            felis tincidunt faucibus nunc a. Nisl sagittis leo velit pharetra
            dolor nibh fermentum adipiscing adipiscing.Lorem ipsum dolor sit
            amet consectetur. Fringilla mauris est lorem et amet. Vestibulum
            tristique volutpat massa aliquet ultrices eu pretium. Ultrices risus
            blandit at id nibh euismod. In sit commodo ornare felis tincidunt
            faucibus nunc a. Nisl sagittis leo velit pharetra dolor nibh
            fermentum adipiscing adipiscing.Lorem ipsum dolor sit amet
            consectetur. Fringilla mauris est lorem et amet. Vestibulum
            tristique volutpat massa aliquet ultrices eu pretium. Ultrices risus
            blandit at id nibh euismod. In sit commodo ornare felis tincidunt
            faucibus nunc a. Nisl sagittis leo velit pharetra dolor nibh
            fermentum adipiscing adipiscing.Lorem ipsum dolor sit amet
            consectetur. Fringilla mauris est lorem et amet. Vestibulum
            tristique volutpat massa aliquet ultrices eu pretium. Ultrices risus
            blandit at id nibh euismod. In sit commodo ornare felis tincidunt
            faucibus nunc a. Nisl sagittis leo velit pharetra dolor nibh
            fermentum adipiscing adipiscing.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default RecipeDetailScreen;

const styles = StyleSheet.create({
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
    marginBottom: 24,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 4,
  },
  nutritionContainer: {
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
    textAlign: "center",
  },
});
