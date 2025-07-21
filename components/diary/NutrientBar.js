import { StyleSheet, Text, View } from "react-native";
import { StyleColors } from "./../../constants/colors";

function NutrientBar({ type, percentage = 66, fillColor }) {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.numberText}>150/225</Text>
      <View style={styles.barContainer}>
        <View style={styles.barBackground}></View>
        <View
          style={[
            styles.barFill,
            { width: `${percentage}%` },
            { backgroundColor: fillColor },
          ]}
        ></View>
      </View>
      <Text style={styles.pfcText}>{type}</Text>
    </View>
  );
}

export default NutrientBar;

const styles = StyleSheet.create({
  rootContainer: {
    flexGrow: 1,
    gap: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    fontFamily: "inter-regular",
    fontSize: 12,
    color: StyleColors.onSurfacePrimary,
  },
  barContainer: {
    width: "100%",
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "transparent",
    position: "relative",
    overflow: "hidden",
  },
  barBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: StyleColors.surfaceVariant,
    borderRadius: 2.5,
  },
  barFill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 2.5,
  },
  pfcText: {
    fontFamily: "inter-regular",
    fontSize: 14,
    color: StyleColors.onSurfacePrimary,
  },
});
