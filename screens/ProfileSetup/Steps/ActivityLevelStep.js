import { StyleSheet, View } from "react-native";
import Button from "../../../components/buttons/Button";
import { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";

function ActivityLevelStep({ formData, setFormData }) {
  const [selectedActivityLevel, setSelectedActivityLevel] = useState(
    formData?.activityLevel
  );
  const handleActivityLevelSelect = (activity) => {
    setSelectedActivityLevel(activity);
    setFormData({ ...formData, activityLevel: activity });
  };

  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);

  return (
    <View>
      <Button
        text="Sedentary"
        style={[
          styles.button,
          selectedActivityLevel === "sedentary" && styles.selectedButton,
        ]}
        onPress={() => handleActivityLevelSelect("sedentary")}
        textColor={StyleColors.onBackground}
      />
      <Button
        text="Low Active"
        style={[
          styles.button,
          selectedActivityLevel === "low" && styles.selectedButton,
        ]}
        onPress={() => handleActivityLevelSelect("low")}
        textColor={StyleColors.onBackground}
      />
      <Button
        text="Active"
        style={[
          styles.button,
          selectedActivityLevel === "active" && styles.selectedButton,
        ]}
        onPress={() => handleActivityLevelSelect("active")}
        textColor={StyleColors.onBackground}
      />
      <Button
        text="Very Active"
        style={[
          styles.button,
          selectedActivityLevel === "veryactive" && styles.selectedButton,
        ]}
        onPress={() => handleActivityLevelSelect("veryactive")}
        textColor={StyleColors.onBackground}
      />
    </View>
  );
}

export default ActivityLevelStep;

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
