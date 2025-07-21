import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { StyleColors } from "../../constants/colors";

function LoadingScreen() {
  return (
    <View style={styles.rootContainer}>
      <ActivityIndicator color={StyleColors.primary} size={"large"} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

export default LoadingScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: StyleColors.background,
  },
  text: {
    fontFamily: "inter-regular",
    fontSize: 16,
    color: StyleColors.primary,
    marginTop: 8,
  },
});
