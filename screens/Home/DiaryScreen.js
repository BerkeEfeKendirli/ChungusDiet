import { View, Text, StyleSheet } from "react-native";

function DiaryScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text>Diary Screen</Text>
    </View>
  );
}

export default DiaryScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
