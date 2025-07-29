import { useEffect, useState } from "react";
import {
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { StyleColors } from "../../constants/colors";
import TextButton from "../buttons/TextButton";
import { DetailNutritionInput } from "./DetailNutrition";

function AddFoodModal({ visible, onClose, onSave, initialValues }) {
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState("");
  const [carbs, setCarbs] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    setMealName(initialValues?.mealName || "");
    setCalories(initialValues?.calories?.toString() || "");
    setCarbs(initialValues?.carbs?.toString() || "");
    setProtein(initialValues?.protein?.toString() || "");
    setFat(initialValues?.fat?.toString() || "");
  }, [initialValues, visible]);

  const MAX_VALUE = 9999;

  const handleNumberInput = (setter) => (text) => {
    let cleaned = text.replace(/,/g, ".").replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) {
      cleaned = parts[0] + "." + parts.slice(1).join("");
    }
    if (parts.length === 2) {
      cleaned = parts[0] + "." + parts[1].slice(0, 2);
    }
    if (cleaned && Number(cleaned) > MAX_VALUE) {
      cleaned = MAX_VALUE.toString();
    }
    setter(cleaned);
  };

  const isInvalid =
    !mealName.trim() ||
    !calories ||
    !protein ||
    !fat ||
    !carbs ||
    Number(calories) > MAX_VALUE ||
    Number(protein) > MAX_VALUE ||
    Number(fat) > MAX_VALUE ||
    Number(carbs) > MAX_VALUE;

  const handleSave = () => {
    if (isInvalid) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
      return;
    }
    onSave &&
      onSave({
        mealName,
        calories: Number(calories),
        carbs: Number(carbs),
        protein: Number(protein),
        fat: Number(fat),
      });
    setMealName("");
    setCalories("");
    setCarbs("");
    setProtein("");
    setFat("");
    onClose && onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.rootContainer}>
          <View style={styles.modalContainer}>
            <View style={styles.foodNameContainer}>
              <Text style={styles.foodText}>Add Food :</Text>
              <TextInput
                placeholder="e.g. Boiled eggs"
                value={mealName}
                onChangeText={setMealName}
                style={[
                  styles.mealNameInput,
                  showWarning && !mealName.trim() && styles.warningColor,
                ]}
              />
            </View>
            <View style={styles.nutritionContainer}>
              <DetailNutritionInput
                value={calories}
                onChangeText={handleNumberInput(setCalories)}
                text="Calories"
                keyboardType="decimal-pad"
                placeholder="230 kcal"
                borderColor={
                  showWarning && !calories
                    ? StyleColors.danger
                    : StyleColors.primary
                }
              />
              <DetailNutritionInput
                value={protein}
                onChangeText={handleNumberInput(setProtein)}
                text="Proteins"
                keyboardType="decimal-pad"
                placeholder="20 g"
                borderColor={
                  showWarning && !protein ? StyleColors.danger : StyleColors.red
                }
              />
              <DetailNutritionInput
                value={fat}
                onChangeText={handleNumberInput(setFat)}
                text="Fats"
                keyboardType="decimal-pad"
                placeholder="20 g"
                borderColor={
                  showWarning && !fat ? StyleColors.danger : StyleColors.orange
                }
              />
              <DetailNutritionInput
                value={carbs}
                onChangeText={handleNumberInput(setCarbs)}
                text="Carbs"
                keyboardType="decimal-pad"
                placeholder="20 g"
                borderColor={
                  showWarning && !carbs
                    ? StyleColors.danger
                    : StyleColors.lightGreen
                }
              />
            </View>
            {showWarning && (
              <Text style={styles.errorText}>Please fill in all fields.</Text>
            )}
            <View style={styles.buttonContainer}>
              <TextButton
                text="Cancel"
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
              />
              <TextButton
                text="OK"
                style={[styles.button, styles.okButton]}
                onPress={handleSave}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default AddFoodModal;

const styles = StyleSheet.create({
  rootContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0000004f",
    paddingHorizontal: 16,
  },
  modalContainer: {
    width: "100%",
    backgroundColor: StyleColors.surfacePrimary,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  nutritionContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    gap: 32,
    marginTop: 36,
  },
  button: {
    fontFamily: "inter-medium",
    fontSize: 14,
  },
  cancelButton: {
    color: StyleColors.danger,
  },
  okButton: {
    color: StyleColors.primary,
  },
  foodText: {
    fontFamily: "inter-medium",
    fontSize: 18,
    color: StyleColors.onBackground,
  },
  foodNameContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  mealNameInput: {
    fontFamily: "inter-medium",
    fontSize: 16,
    color: StyleColors.onBackground,
    borderRadius: 8,
    paddingVertical: 4,
    width: 200,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: StyleColors.onSurfacePrimary,
  },
  warningColor: {
    borderBottomColor: StyleColors.danger,
  },
  errorText: {
    marginTop: 16,
    fontFamily: "inter-regular",
    fontSize: 16,
    color: StyleColors.danger,
    textAlign: "center",
  },
});
