import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

function NutrientBar({ type, percentage = 0, fillColor, completed, total }) {
  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.numberText}>
        {completed} / {total}
      </Text>
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

const getStyles = (StyleColors) =>
  StyleSheet.create({
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
