import { View, Text, StyleSheet } from "react-native";

function RecipesScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text>Recipes Screen</Text>
    </View>
  );
}

export default RecipesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
