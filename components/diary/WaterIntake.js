import { View, Text, StyleSheet } from "react-native";
import { StyleColors } from "../../constants/colors";
import FloatingActionButton from "./../buttons/FloatingActionButton";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

function WaterIntake({ percentage, time, completed, total, onAdd, onRemove }) {
  const fillHeight = 100 * (percentage / 100);
  return (
    <View style={styles.rootContainer}>
      <View style={styles.summaryContainer}>
        <View style={styles.waterTextContainer}>
          <Text style={styles.title}>Water</Text>
          <View style={styles.literTextContainer}>
            <Text style={styles.currentLiterText}>{completed} / </Text>
            <Text style={styles.targetLiterText}>{total}L</Text>
          </View>
        </View>
        <View style={styles.time}>
          <Ionicons
            name="time-outline"
            color={StyleColors.onBackgroundVariant}
            size={12.67}
          />
          <Text style={styles.timeText}>Last time {time}</Text>
        </View>
      </View>
      <View style={styles.waterInput}>
        <View style={styles.buttons}>
          <FloatingActionButton
            icon="add"
            size={24}
            backgroundColor={StyleColors.surfaceVariant}
            iconColor={StyleColors.onSurfacePrimary}
            onPress={onAdd}
          />
          <FloatingActionButton
            icon="remove"
            size={24}
            backgroundColor={StyleColors.surfaceVariant}
            iconColor={StyleColors.onSurfacePrimary}
            onPress={onRemove}
          />
        </View>
        <View style={styles.waterIndicator}>
          <View style={[styles.percentageIndicator, { height: fillHeight }]}>
            <LinearGradient
              colors={[
                StyleColors.blueGradientStart,
                StyleColors.blueGradientEnd,
              ]}
              style={styles.gradientFill}
            />
          </View>
          <View style={[styles.emptyContainer, { height: 100 - fillHeight }]} />
          <View style={styles.percentTextContainer}>
            <Text style={styles.percentText}>{percentage}%</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default WaterIntake;

const styles = StyleSheet.create({
  rootContainer: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: StyleColors.surfacePrimary,
    borderRadius: 20,
  },
  summaryContainer: {
    justifyContent: "space-between",
    marginBottom: 6,
  },
  waterTextContainer: {
    justifyContent: "center",
  },
  literTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "inter-regular",
    fontSize: 12,
    color: StyleColors.onBackground,
  },
  currentLiterText: {
    fontFamily: "inter-semibold",
    fontSize: 16,
    color: StyleColors.onBackground,
  },
  targetLiterText: {
    fontFamily: "inter-regular",
    fontSize: 12,
    color: StyleColors.onBackground,
  },
  time: {
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  timeText: {
    fontFamily: "inter-regular",
    fontSize: 12,
    color: StyleColors.onBackgroundVariant,
  },
  waterInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  buttons: {
    gap: 24,
  },
  waterIndicator: {
    width: 40,
    height: 100,
    borderRadius: 30,
    backgroundColor: StyleColors.surfaceVariant,
    overflow: "hidden",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "relative",
  },
  percentageIndicator: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  gradientFill: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "transparent",
  },
  percentTextContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  percentText: {
    fontFamily: "inter-regular",
    fontSize: 12,
    color: StyleColors.onSurfacePrimary,
  },
});
