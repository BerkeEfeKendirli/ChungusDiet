import { Ionicons } from "@expo/vector-icons";
import { useLayoutEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { StyleColors } from "../../../constants/colors";
import DetailNutrition from "./../../../components/diary/DetailNutrition";
import { SafeAreaView } from "react-native-safe-area-context";
import MealFood from "../../../components/diary/MealFood";

const { width } = Dimensions.get("window");

function NewMealScreen({ navigation }) {
  const [calories, setCalories] = useState(0);
  const [proteins, setProteins] = useState(0);
  const [fats, setFats] = useState(0);
  const [carbs, setCarbs] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="add"
          size={24}
          onPress={() => navigation.navigate("MealSearch")}
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.mealHeaderContainer}>
        <Ionicons name="close" size={24} onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Meal #1</Text>
        <Ionicons
          name="add"
          size={24}
          onPress={() => navigation.navigate("MealSearch")}
        />
      </View>
      <View style={styles.nutritionDetailsContainer}>
        <DetailNutrition text="Calories" number={calories} />
        <DetailNutrition text="Proteins" number={proteins} />
        <DetailNutrition text="Fats" number={fats} />
        <DetailNutrition text="Carbs" number={carbs} />
      </View>
      <View style={styles.divider}></View>
      <View>
        <MealFood calories={23} grams={123} meal="Fried Eggs" />
        <MealFood calories={23} grams={123} meal="Boiled Eggs" />
      </View>
    </SafeAreaView>
  );
}

export default NewMealScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: StyleColors.background,
  },
  mealHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  headerText: {
    fontFamily: "inter-medium",
    fontSize: 18,
    color: StyleColors.onBackground,
  },
  nutritionDetailsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    marginTop: 24,
    paddingHorizontal: 24,
  },
  divider: {
    height: 1,
    backgroundColor: StyleColors.outline,
    width: width,
    marginBottom: 10,
  },
});
