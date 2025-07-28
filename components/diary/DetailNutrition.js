import { View, Text, StyleSheet } from "react-native";
import { StyleColors } from "../../constants/colors";

function DetailNutrition({ number, text }) {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

export default DetailNutrition;

const styles = StyleSheet.create({
  rootContainer: {
    gap: 4,
    alignItems: "center",
  },
  number: {
    fontFamily: "inter-medium",
    fontSize: 16,
    color: StyleColors.onBackground,
  },
  text: {
    fontFamily: "inter-regular",
    fontSize: 14,
    color: StyleColors.onBackground,
  },
});
