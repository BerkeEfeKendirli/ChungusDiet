import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { StyleColors } from "../../../constants/colors";

function HeightStep({ formData, setFormData }) {
  const [selectedMeters, setSelectedMeters] = useState(
    formData?.height?.meters || 1
  );
  const [selectedCentimeters, setSelectedCentimeters] = useState(
    formData?.height?.centimeters || 70
  );

  useEffect(() => {
    if (!formData?.height) {
      handleHeightChange(selectedMeters, selectedCentimeters);
    }
  }, []);

  const handleHeightChange = (newMeters, newCentimeters) => {
    setFormData({
      ...formData,
      height: {
        meters: newMeters,
        centimeters: newCentimeters,
        total: newMeters + newCentimeters / 100,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickersContainer}>
        <View style={styles.pickerSection}>
          <Picker
            selectedValue={selectedMeters}
            style={styles.picker}
            mode="dropdown"
            onValueChange={(value) => {
              setSelectedMeters(value);
              handleHeightChange(value, selectedCentimeters);
            }}
          >
            <Picker.Item label="1" value={1} />
            <Picker.Item label="2" value={2} />
          </Picker>
          <Text style={styles.unit}>m</Text>
        </View>

        <View style={styles.pickerSection}>
          <Picker
            selectedValue={selectedCentimeters}
            style={styles.picker}
            mode="dropdown"
            onValueChange={(value) => {
              setSelectedCentimeters(value);
              handleHeightChange(selectedMeters, value);
            }}
          >
            {Array.from({ length: 100 }, (_, i) => (
              <Picker.Item
                key={i}
                label={i.toString().padStart(2, "0")}
                value={i}
              />
            ))}
          </Picker>
          <Text style={styles.unit}>cm</Text>
        </View>
      </View>
    </View>
  );
}

export default HeightStep;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  pickersContainer: {
    flexDirection: "row",
    gap: 10,
  },
  pickerSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  picker: {
    width: 100,
  },
  unit: {
    fontSize: 16,
    color: StyleColors.primary,
    fontFamily: "inter-regular",
  },
});
