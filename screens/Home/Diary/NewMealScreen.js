import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddFoodModal from "../../../components/diary/AddFoodModal";
import MealFood from "../../../components/diary/MealFood";
import { DetailNutrition } from "./../../../components/diary/DetailNutrition";
import Button from "../../../components/buttons/Button";
import { useTheme } from "../../../context/ThemeContext";

const { width } = Dimensions.get("window");

function NewMealScreen({ navigation, route }) {
  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);
  const [calories, setCalories] = useState(0);
  const [proteins, setProteins] = useState(0);
  const [fats, setFats] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [meals, setMeals] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const mealNumber = route.params?.mealNumber || 1;
  const [showSaveWarning, setShowSaveWarning] = useState(false);

  const handleDeleteMeal = (index) => {
    setMeals((prev) => {
      const mealToDelete = prev[index];
      setCalories((c) => c - (mealToDelete.calories || 0));
      setProteins((p) => p - (mealToDelete.protein || 0));
      setFats((f) => f - (mealToDelete.fat || 0));
      setCarbs((c) => c - (mealToDelete.carbs || 0));
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleAddMeal = (meal) => {
    if (editIndex !== null) {
      // Edit mode
      setMeals((prev) =>
        prev.map((item, i) => (i === editIndex ? meal : item))
      );

      const old = meals[editIndex];
      setCalories((c) => c - (old.calories || 0) + (meal.calories || 0));
      setProteins((p) => p - (old.protein || 0) + (meal.protein || 0));
      setFats((f) => f - (old.fat || 0) + (meal.fat || 0));
      setCarbs((c) => c - (old.carbs || 0) + (meal.carbs || 0));
      setEditIndex(null);
    } else {
      // Add mode
      setMeals((prev) => [...prev, meal]);
      setCalories((c) => c + (meal.calories || 0));
      setProteins((p) => p + (meal.protein || 0));
      setFats((f) => f + (meal.fat || 0));
      setCarbs((c) => c + (meal.carbs || 0));
    }
    setModalVisible(false);
  };
  const selectedDate = route.params?.date
    ? new Date(route.params.date)
    : new Date();

  useEffect(() => {
    if (
      route.params?.editIndex !== null &&
      route.params?.editIndex !== undefined
    ) {
      setMeals(route.params.foods || []);
      setCalories(route.params.calories || 0);
      setProteins(route.params.proteins || 0);
      setFats(route.params.fats || 0);
      setCarbs(route.params.carbs || 0);
    }
  }, [route.params?.editIndex]);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.mealHeaderContainer}>
        <Ionicons
          name="close"
          size={24}
          color={StyleColors.onBackground}
          onPress={() =>
            navigation.replace("Home", {
              screen: "Diary",
              params: {
                allMeals: route.params?.allMeals || [],
              },
            })
          }
        />
        <Text style={styles.headerText}>Meal #{mealNumber}</Text>
        <Ionicons
          name="add"
          size={24}
          onPress={() => setModalVisible(true)}
          color={StyleColors.onBackground}
        />
      </View>
      <View style={styles.nutritionDetailsContainer}>
        <DetailNutrition text="Calories" number={calories} />
        <DetailNutrition text="Proteins" number={proteins} />
        <DetailNutrition text="Fats" number={fats} />
        <DetailNutrition text="Carbs" number={carbs} />
      </View>
      <View style={styles.divider}></View>
      <View style={{ flex: 1 }}>
        <ScrollView>
          {meals.map((food, idx) => (
            <View
              key={idx}
              style={{ position: "relative", paddingHorizontal: 16 }}
            >
              <MealFood
                meal={food.mealName || food.name} // Firestore'da mealName var!
                calories={food.calories}
                proteins={food.protein}
                fats={food.fat}
                carbs={food.carbs}
                onEdit={() => {
                  setEditIndex(idx);
                  setModalVisible(true);
                }}
                onDelete={() => handleDeleteMeal(idx)}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      <AddFoodModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setEditIndex(null);
        }}
        onSave={handleAddMeal}
        initialValues={editIndex !== null ? meals[editIndex] : undefined}
      />
      {showSaveWarning && (
        <View style={{ alignItems: "center", marginBottom: 8 }}>
          <Text style={styles.errorText}>No food added yet.</Text>
        </View>
      )}
      <Button
        text="Save"
        style={styles.saveButton}
        textColor={StyleColors.onPrimary}
        onPress={() => {
          if (meals.length === 0) {
            setShowSaveWarning(true);
            setTimeout(() => setShowSaveWarning(false), 3000);
            return;
          }
          const now = new Date();
          const mealTime = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
          const updatedMeals = (route.params?.allMeals || []).concat([
            {
              foods: meals,
              calories,
              proteins,
              fats,
              carbs,
              mealTitle: `Meal #${mealNumber}`,
              mealTime,
            },
          ]);
          navigation.replace("Home", {
            screen: "Diary",
            params: {
              allMeals: updatedMeals,
              fromNewMeal: true,
              date: selectedDate.toISOString(),
            },
          });
        }}
      />
    </SafeAreaView>
  );
}

export default NewMealScreen;

const getStyles = (StyleColors) =>
  StyleSheet.create({
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
    popupMenu: {
      position: "absolute",
      right: 40,
      top: 10,
      backgroundColor: StyleColors.surfacePrimary,
      borderRadius: 8,
      elevation: 4,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      padding: 8,
      flexDirection: "row",
      zIndex: 10,
    },
    popupButton: {
      marginHorizontal: 8,
    },
    popupEditText: {
      color: StyleColors.primary,
      fontSize: 16,
      fontFamily: "inter-regular",
    },
    popupDeleteText: {
      color: StyleColors.danger,
      fontSize: 16,
      fontFamily: "inter-regular",
    },
    overlayTouchable: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 9,
    },
    saveButton: {
      backgroundColor: StyleColors.primary,
      marginHorizontal: 16,
      marginBottom: 24,
    },
    errorText: {
      fontFamily: "inter-regular",
      fontSize: 16,
      color: StyleColors.danger,
      textAlign: "center",
    },
  });
