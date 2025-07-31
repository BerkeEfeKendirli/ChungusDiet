import { StyleSheet, View } from "react-native";
import Button from "../../../components/buttons/Button";
import { StyleColors } from "../../../constants/colors";
import { useState } from "react";

function WeightGoalStep({ formData, setFormData, onDone, showDone }) {
  const [selectedGoal, setSelectedGoal] = useState(formData?.weightGoal);
  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal);
    setFormData({ ...formData, weightGoal: goal });
  };

  return (
    <View>
      <Button
        text="Lose weight"
        style={[
          styles.button,
          selectedGoal === "lose" && styles.selectedButton,
        ]}
        onPress={() => handleGoalSelect("lose")}
      />
      <Button
        text="Maintain weight"
        style={[
          styles.button,
          selectedGoal === "maintain" && styles.selectedButton,
        ]}
        onPress={() => handleGoalSelect("maintain")}
      />
      <Button
        text="Gain weight"
        style={[
          styles.button,
          selectedGoal === "gain" && styles.selectedButton,
        ]}
        onPress={() => handleGoalSelect("gain")}
      />
    </View>
  );
}

export default WeightGoalStep;

const styles = StyleSheet.create({
  button: {
    backgroundColor: StyleColors.background,
    elevation: 0,
    shadowOpacity: 0,
    borderColor: StyleColors.outline,
    borderWidth: 1,
  },
  selectedButton: {
    borderColor: StyleColors.primary,
    borderWidth: 1,
    elevation: 0,
    shadowOpacity: 0,
  },
});
