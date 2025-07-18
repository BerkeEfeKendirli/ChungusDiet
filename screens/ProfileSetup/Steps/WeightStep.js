import { Text, TextInput, View, StyleSheet } from "react-native";
import { StyleColors } from "../../../constants/colors";
import { useState } from "react";

function WeightStep({ formData, setFormData }) {
  const [weight, setWeight] = useState(formData?.weight?.toString() || "");

  const handleWeightChange = (value) => {
    const normalizedValue = value.replace(",", ".");
    const cleanValue = normalizedValue.replace(/[^0-9.]/g, "");
    const parts = cleanValue.split(".");

    let validValue;
    if (parts.length > 2) {
      validValue = parts[0] + "." + parts[1];
    } else if (parts.length === 2 && parts[1].length > 2) {
      validValue = parts[0] + "." + parts[1].substring(0, 2);
    } else {
      validValue = cleanValue;
    }

    const numValue = parseFloat(validValue);

    if (
      validValue === "" ||
      (!isNaN(numValue) && numValue > 0 && numValue <= 500)
    ) {
      setWeight(validValue);
      if (!isNaN(numValue) && numValue > 0) {
        setFormData({ ...formData, weight: numValue });
      }
    }
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          inputMode="decimal"
          value={weight}
          onChangeText={handleWeightChange}
          placeholder="70"
          placeholderTextColor={StyleColors.onBackgroundVariant}
        />
        <Text style={styles.text}>kg</Text>
      </View>
    </View>
  );
}

export default WeightStep;

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
