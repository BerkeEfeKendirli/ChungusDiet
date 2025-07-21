import { View, Text, StyleSheet, Dimensions } from "react-native";
import { StyleColors } from "../../constants/colors";
import WaterIntake from "../../components/diary/WaterIntake";

const { width } = Dimensions.get("window");

function DiaryScreen() {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.content}>
        <View style={styles.waterIndicator}>
          <Text>Water Intake</Text>
          <WaterIntake percentage={50} />
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
  },
  waterIndicator: {
    width: "100%",
    gap: 10,
  },
});
