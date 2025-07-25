import { StyleSheet, View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RecipeItem from "../../../components/recipes/RecipeItem";
import { StyleColors } from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import SearchField from "../../../components/textField/SearchField";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import LoadingScreen from "../../Onboarding/LoadingScreen";
import { DebugInstructions } from "react-native/Libraries/NewAppScreen";

function RecipesScreen() {
  const auth = getAuth();
  const email = auth.currentUser?.email;
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialRecipes, setInitialRecipes] = useState([]);

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      setLoading(true);
      try {
        let meals = [];
        for (let i = 0; i < 10; i++) {
          const r = await fetch(
            "https://www.themealdb.com/api/json/v1/1/random.php"
          );
          const d = await r.json();
          if (d.meals && d.meals[0]) meals.push(d.meals[0]);
        }
        setRecipes(meals);
        setInitialRecipes(meals); // İlk random tarifleri sakla
      } catch (error) {}
      setLoading(false);
    };
    fetchRandomRecipes();
  }, []);

  const handleSearch = async (text) => {
    setSearch(text);
    setLoading(true);
    if (!text) {
      // Arama kutusu boşsa ilk random tarifleri geri getir
      setRecipes(initialRecipes);
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`
      );
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (err) {}
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.rootContainer} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            <SearchField value={search} onChangeText={handleSearch} />
          </View>
          {loading && <LoadingScreen />}
          {recipes.map((recipe) => (
            <RecipeItem
              key={recipe.idMeal}
              title={recipe.strMeal}
              area={recipe.strArea}
              category={recipe.strCategory}
              time={"?"}
              image={{ uri: recipe.strMealThumb }}
              onPress={() =>
                navigation.navigate("RecipeDetail", {
                  id: recipe.idMeal,
                  title: recipe.strMeal,
                  image: { uri: recipe.strMealThumb },
                  instructions: recipe.strInstructions,
                  area: recipe.strArea,
                  category: recipe.strCategory,
                  youtube: recipe.strYoutube,
                })
              }
            />
          ))}
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
