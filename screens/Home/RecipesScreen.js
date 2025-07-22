import { signOut } from "firebase/auth";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/buttons/Button";
import { auth } from "../../config/firebaseConfig";
import { StyleColors } from "../../constants/colors";

function RecipesScreen() {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <Text>Recipes Screen</Text>
    </SafeAreaView>
  );
}

export default RecipesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: StyleColors.background,
  },
});
