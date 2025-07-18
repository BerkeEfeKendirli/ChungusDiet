import { View, Text, StyleSheet } from "react-native";
import Button from "../../components/buttons/Button";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

function RecipesScreen() {
  const logoutHandler = async () => {
    try {
      await signOut(auth);
    } catch (error) {}
  };

  return (
    <View style={styles.rootContainer}>
      <Button text="logout" onPress={logoutHandler} />
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
