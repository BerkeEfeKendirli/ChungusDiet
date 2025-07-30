import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
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
import { StyleColors } from "../../../constants/colors";
import { DetailNutrition } from "./../../../components/diary/DetailNutrition";
import Button from "../../../components/buttons/Button";

const { width } = Dimensions.get("window");

function NewMealScreen({ navigation, route }) {
  const [calories, setCalories] = useState(0);
  const [proteins, setProteins] = useState(0);
  const [fats, setFats] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [meals, setMeals] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
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
      // Toplamları güncellemek için önce eski değeri çıkar, sonra yeni değeri ekle
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

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.mealHeaderContainer}>
        <Ionicons
          name="close"
          size={24}
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
        <Ionicons name="add" size={24} onPress={() => setModalVisible(true)} />
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
          {meals.map((meal, idx) => (
            <View key={idx} style={{ position: "relative" }}>
              <MealFood
                meal={meal.mealName}
                calories={meal.calories}
                proteins={meal.protein}
                fats={meal.fat}
                carbs={meal.carbs}
                onPress={() => setSelectedIndex(idx)}
              />
              {selectedIndex === idx && (
                <>
                  <TouchableOpacity
                    style={styles.overlayTouchable}
                    activeOpacity={1}
                    onPress={() => setSelectedIndex(null)}
                  />
                  <View style={styles.popupMenu}>
                    <TouchableOpacity
                      onPress={() => {
                        setEditIndex(idx);
                        setModalVisible(true);
                        setSelectedIndex(null);
                      }}
                      style={styles.popupButton}
                    >
                      <Text style={styles.popupEditText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleDeleteMeal(idx);
                        setSelectedIndex(null);
                      }}
                      style={styles.popupButton}
                    >
                      <Text style={styles.popupDeleteText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
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
  popupMenu: {
    position: "absolute",
    right: 40,
    top: 10,
    backgroundColor: "#fff",
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
