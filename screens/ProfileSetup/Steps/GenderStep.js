import { StyleSheet, View } from "react-native";
import Button from "../../../components/buttons/Button";
import { StyleColors } from "../../../constants/colors";
import { useState } from "react";

function GenderStep({ formData, setFormData }) {
  const [selectedGender, setSelectedGender] = useState(formData?.gender);
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setFormData({ ...formData, gender: gender });
  };

  return (
    <View>
      <Button
        text="Male"
        style={[
          styles.button,
          selectedGender === "male" && styles.selectedButton,
        ]}
        onPress={() => handleGenderSelect("male")}
      />
      <Button
        text="Female"
        style={[
          styles.button,
          selectedGender === "female" && styles.selectedButton,
        ]}
        onPress={() => handleGenderSelect("female")}
      />
    </View>
  );
}

export default GenderStep;

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
