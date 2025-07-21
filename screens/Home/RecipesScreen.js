import { View, Text, StyleSheet } from "react-native";
import Button from "../../components/buttons/Button";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { StyleColors } from "../../constants/colors";

function RecipesScreen({ userProfile }) {
  const logoutHandler = async () => {
    try {
      await signOut(auth);
    } catch (error) {}
  };

  return (
    <View style={styles.rootContainer}>
      <Text>{userProfile?.profile?.targetCalories ?? "Bilinmiyor"}</Text>
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
    backgroundColor: StyleColors.background,
  },
});
