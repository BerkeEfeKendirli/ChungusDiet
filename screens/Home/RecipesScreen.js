import { View, Text, StyleSheet } from "react-native";
import Button from "../../components/buttons/Button";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { StyleColors } from "../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

function RecipesScreen({ userProfile }) {
  const logoutHandler = async () => {
    try {
      await signOut(auth);
    } catch (error) {}
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <Text>{userProfile?.profile?.targetCalories ?? "Bilinmiyor"}</Text>
      <Button text="logout" onPress={logoutHandler} />
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
