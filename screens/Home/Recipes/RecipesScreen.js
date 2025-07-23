import { StyleSheet, View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RecipeItem from "../../../components/recipes/RecipeItem";
import { StyleColors } from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import SearchField from "../../../components/textField/SearchField";
import { useNavigation } from "@react-navigation/native";

function RecipesScreen() {
  const auth = getAuth();
  const email = auth.currentUser?.email;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView>
        <View style={styles.profile}>
          <Ionicons
            name="person-circle-outline"
            size={40}
            color={StyleColors.onBackgroundVariant}
          />
          <Text style={styles.profileText}>{email}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.searchContainer}>
            <SearchField />
            <Ionicons
              name="options-outline"
              size={22}
              color={StyleColors.primary}
            />
          </View>
          <RecipeItem
            title="Sushi"
            calories={244}
            time={60}
            image={require("../../../assets/images/sushi.jpg")}
            onPress={() =>
              navigation.navigate("RecipeDetail", {
                title: "Sushi",
                calories: 244,
                time: 60,
                image: require("../../../assets/images/sushi.jpg"),
              })
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RecipesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: StyleColors.background,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 9,
  },
  profileText: {
    fontFamily: "inter-medium",
    fontSize: 18,
    color: StyleColors.onBackground,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 20,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 20,
  },
});
