import { Text, TextInput, View, StyleSheet } from "react-native";
import { StyleColors } from "../../../constants/colors";
import { useState } from "react";

function AgeStep({ formData, setFormData }) {
  const [age, setAge] = useState(formData?.age?.toString() || "");

  const handleAgeChange = (value) => {
    const cleanValue = value.replace(/[^0-9]/g, "");

    const numValue = parseInt(cleanValue);

    if (cleanValue === "" || (!isNaN(numValue) && numValue <= 120)) {
      setAge(cleanValue);
      if (!isNaN(numValue) && numValue >= 10) {
        setFormData({ ...formData, age: numValue });
      }
    }
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          inputMode="numeric"
          value={age}
          onChangeText={handleAgeChange}
          placeholder="25"
          placeholderTextColor={StyleColors.onBackgroundVariant}
        />
        <Text style={styles.text}>years</Text>
      </View>
    </View>
  );
}

export default AgeStep;

const styles = StyleSheet.create({
  rootContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  input: {
    fontFamily: "inter-regular",
    fontSize: 16,
    color: StyleColors.onBackground,
    borderBottomColor: StyleColors.primary,
    borderBottomWidth: 2,
    paddingBottom: 8,
    width: 100,
    textAlign: "center",
  },
  text: {
    fontFamily: "inter-regular",
    fontSize: 16,
    color: StyleColors.primary,
  },
});
