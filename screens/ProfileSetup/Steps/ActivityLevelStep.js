import { StyleSheet, View } from "react-native";
import Button from "../../../components/buttons/Button";
import { StyleColors } from "../../../constants/colors";
import { useState } from "react";

function ActivityLevelStep({ formData, setFormData }) {
  const [selectedActivityLevel, setSelectedActivityLevel] = useState(
    formData?.activityLevel
  );
  const handleActivityLevelSelect = (activity) => {
    setSelectedActivityLevel(activity);
    setFormData({ ...formData, activityLevel: activity });
  };

  return (
    <View>
      <Button
        text="Sedentary"
        style={[
          styles.button,
          selectedActivityLevel === "sedentary" && styles.selectedButton,
        ]}
        onPress={() => handleActivityLevelSelect("sedentary")}
      />
      <Button
        text="Low Active"
        style={[
          styles.button,
          selectedActivityLevel === "low" && styles.selectedButton,
        ]}
        onPress={() => handleActivityLevelSelect("low")}
      />
      <Button
        text="Active"
        style={[
          styles.button,
          selectedActivityLevel === "active" && styles.selectedButton,
        ]}
        onPress={() => handleActivityLevelSelect("active")}
      />
      <Button
        text="Very Active"
        style={[
          styles.button,
          selectedActivityLevel === "veryactive" && styles.selectedButton,
        ]}
        onPress={() => handleActivityLevelSelect("veryactive")}
      />
    </View>
  );
}

export default ActivityLevelStep;

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
