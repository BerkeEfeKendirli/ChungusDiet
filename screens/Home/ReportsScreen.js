import { View, Text, StyleSheet } from "react-native";

function ReportsScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text>Reports Screen</Text>
    </View>
  );
}

export default ReportsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
