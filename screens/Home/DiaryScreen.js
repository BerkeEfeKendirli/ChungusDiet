import { View, Text, StyleSheet, Dimensions } from "react-native";
import { StyleColors } from "../../constants/colors";
import WaterIntake from "../../components/diary/WaterIntake";
import NutrientsIndicator from "../../components/diary/NutrientsIndicator";

const { width } = Dimensions.get("window");

function DiaryScreen() {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.content}>
        <View style={styles.indicatorContainer}>
          <Text style={styles.title}>Nutrients Indicator</Text>
          <NutrientsIndicator />
        </View>
        <View style={styles.indicatorContainer}>
          <Text style={styles.title}>Water Intake</Text>
          <WaterIntake percentage={69} />
        </View>
      </View>
    </View>
  );
}

export default DiaryScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: StyleColors.background,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 20,
  },
  title: {
    fontFamily: "inter-semibold",
    fontSize: 12,
  },
  indicatorContainer: {
    width: "100%",
    gap: 10,
  },
});
