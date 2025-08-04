import { StyleSheet, View } from "react-native";
import Button from "../../../components/buttons/Button";
import { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";

function WeightGoalStep({ formData, setFormData, onDone, showDone }) {
  const [selectedGoal, setSelectedGoal] = useState(formData?.weightGoal);
  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal);
    setFormData({ ...formData, weightGoal: goal });
  };
  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);

  return (
    <View>
      <Button
        text="Lose weight"
        style={[
          styles.button,
          selectedGoal === "lose" && styles.selectedButton,
        ]}
        onPress={() => handleGoalSelect("lose")}
        textColor={StyleColors.onBackground}
      />
      <Button
        text="Maintain weight"
        style={[
          styles.button,
          selectedGoal === "maintain" && styles.selectedButton,
        ]}
        onPress={() => handleGoalSelect("maintain")}
        textColor={StyleColors.onBackground}
      />
      <Button
        text="Gain weight"
        style={[
          styles.button,
          selectedGoal === "gain" && styles.selectedButton,
        ]}
        onPress={() => handleGoalSelect("gain")}
        textColor={StyleColors.onBackground}
      />
    </View>
  );
}

export default WeightGoalStep;

const getStyles = (StyleColors) =>
  StyleSheet.create({
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
