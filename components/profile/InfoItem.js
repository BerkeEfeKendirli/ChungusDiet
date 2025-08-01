import { Text, View, StyleSheet, Pressable } from "react-native";
import { StyleColors } from "../../constants/colors";

function InfoItem({ infoText = "", info, infoSecondary = "", onPress }) {
  return (
    <Pressable style={styles.rootContainer} onPress={onPress}>
      <Text style={styles.infoText}>{infoText}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>{info}</Text>
        <Text style={styles.infoSecondary}> {infoSecondary}</Text>
      </View>
    </Pressable>
  );
}

export default InfoItem;

const styles = StyleSheet.create({
  rootContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: StyleColors.outline,
  },
  infoText: {
    fontFamily: "inter-regular",
    fontSize: 14,
    color: StyleColors.onBackground,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    fontFamily: "inter-medium",
    fontSize: 14,
    color: StyleColors.primary,
    textTransform: "capitalize",
  },
  infoSecondary: {
    fontFamily: "inter-medium",
    fontSize: 14,
    color: StyleColors.primary,
  },
});
