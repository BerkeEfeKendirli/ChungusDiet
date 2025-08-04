import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BottomBar from "./components/ui/BottomBar/BottomBar";
import { auth } from "./config/firebaseConfig";
import LoginScreen from "./screens/Auth/LoginScreen";
import SignUpScreen from "./screens/Auth/SignUpScreen";
import DiaryScreen from "./screens/Home/Diary/DiaryScreen";
import NewMealScreen from "./screens/Home/Diary/NewMealScreen";
import ProfileScreen from "./screens/Home/Profile/ProfileScreen";
import RecipeDetailScreen from "./screens/Home/Recipes/RecipeDetailScreen";
import RecipesScreen from "./screens/Home/Recipes/RecipesScreen";
import ReportsScreen from "./screens/Home/Reports/ReportsScreen";
import LoadingScreen from "./screens/Onboarding/LoadingScreen";
import OnboardingSlideScreen from "./screens/Onboarding/OnboardingSlideScreen";
import WelcomeScreen from "./screens/Onboarding/WelcomeScreen";
import ProfileSetupNavigatorScreen from "./screens/ProfileSetup/ProfileSetupNavigatorScreen";
import RecommendedCaloriesScreen from "./screens/ProfileSetup/RecommendedCaloriesScreen";
import { listenUserProfile } from "./services/userService";
import MeScreen from "./screens/Home/Profile/MeScreen";
import CalorieIntakeScreen from "./screens/Home/Profile/CalorieIntakeScreen";
import WaterIntakeScreen from "./screens/Home/Profile/WaterIntakeScreen";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import AboutAppScreen from "./screens/Home/Profile/AboutAppScreen";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function CustomBackButton({ navigation, icon = "chevron-back", tintColor }) {
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <Ionicons name={icon} size={24} color={tintColor} />
    </Pressable>
  );
}

function BottomTabNavigator({ userProfile }) {
  const StyleColors = useTheme();
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <BottomBar {...props} />}
      initialRouteName="Diary"
      contentStyle={{ backgroundColor: StyleColors.background }}
    >
      <BottomTab.Screen name="Recipes" component={RecipesScreen} />
      <BottomTab.Screen name="Diary" component={DiaryScreen} />
      <BottomTab.Screen name="Reports" component={ReportsScreen} />
    </BottomTab.Navigator>
  );
}

function AppContent({ user, userProfile, isAppReady }) {
  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);

  if (!isAppReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={StyleColors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style={StyleColors.mode === "dark" ? "light" : "dark"} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: StyleColors.background },
          }}
        >
          {user ? (
            !userProfile ? (
              <Stack.Screen name="Loading" component={LoadingScreen} />
            ) : userProfile.isProfileComplete ? (
              <>
                <Stack.Screen
                  name="Home"
                  children={() => (
                    <BottomTabNavigator userProfile={userProfile} />
                  )}
                />
                <>
                  <Stack.Screen
                    name="Profile"
                    children={() => <ProfileScreen userProfile={userProfile} />}
                    options={({ navigation }) => ({
                      headerTitleAlign: "center",
                      headerShown: true,
                      headerShadowVisible: false,
                      headerStyle: {
                        backgroundColor: StyleColors.background,
                      },
                      headerLeft: () => (
                        <CustomBackButton
                          navigation={navigation}
                          tintColor={StyleColors.onBackground}
                        />
                      ),
                      headerTitleStyle: styles.headerTitle,
                    })}
                  />
                  <Stack.Screen
                    name="Me"
                    children={() => <MeScreen userProfile={userProfile} />}
                  />
                  <Stack.Screen
                    name="CalorieIntake"
                    component={CalorieIntakeScreen}
                  />
                  <Stack.Screen
                    name="WaterIntake"
                    component={WaterIntakeScreen}
                  />
                  <Stack.Screen
                    name="AboutApp"
                    component={AboutAppScreen}
                    options={({ navigation }) => ({
                      title: "About app",
                      headerShown: true,
                      headerTitleAlign: "center",
                      headerStyle: { backgroundColor: StyleColors.background },
                      headerShadowVisible: false,
                      headerLeft: () => (
                        <CustomBackButton
                          navigation={navigation}
                          tintColor={StyleColors.onBackground}
                        />
                      ),
                      headerTitleStyle: styles.headerTitle,
                    })}
                  />
                  <Stack.Screen
                    name="RecipeDetail"
                    component={RecipeDetailScreen}
                  />
                  <Stack.Screen name="NewMeal" component={NewMealScreen} />
                </>
              </>
            ) : (
              <>
                <Stack.Screen
                  name="ProfileSetup"
                  component={ProfileSetupNavigatorScreen}
                />
                <Stack.Screen
                  name="RecommendedCaloriesScreen"
                  component={RecommendedCaloriesScreen}
                />
              </>
            )
          ) : (
            <>
              <Stack.Screen
                name="Onboarding"
                component={OnboardingSlideScreen}
              />
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={({ navigation }) => ({
                  title: "Sign Up",
                  headerTitleAlign: "center",
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: StyleColors.background,
                  },
                  headerShadowVisible: false,
                  headerLeft: () => (
                    <CustomBackButton
                      navigation={navigation}
                      tintColor={StyleColors.onBackground}
                    />
                  ),
                  headerTitleStyle: styles.headerTitle,
                })}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={({ navigation }) => ({
                  title: "Sign In",
                  headerShown: true,
                  headerShadowVisible: false,
                  headerStyle: {
                    backgroundColor: StyleColors.background,
                  },
                  headerTitleAlign: "center",
                  headerLeft: () => (
                    <CustomBackButton
                      navigation={navigation}
                      tintColor={StyleColors.onBackground}
                    />
                  ),
                  headerTitleStyle: styles.headerTitle,
                })}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    "inter-regular": require("./assets/fonts/Inter-Regular.ttf"),
    "inter-medium": require("./assets/fonts/Inter-Medium.ttf"),
    "inter-semibold": require("./assets/fonts/Inter-SemiBold.ttf"),
  });
  const [user, setUser] = useState(undefined);
  const [userProfile, setUserProfile] = useState(null);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    let unsubscribeProfile;
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);

      if (user) {
        unsubscribeProfile = listenUserProfile(user.uid, (profile) => {
          setUserProfile(profile);
        });
      } else {
        setUserProfile(null);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  useEffect(() => {
    if (fontsLoaded && user !== undefined && (!user || userProfile)) {
      setIsAppReady(true);
    }
  }, [fontsLoaded, user, userProfile]);

  return (
    <ThemeProvider>
      <AppContent
        user={user}
        userProfile={userProfile}
        isAppReady={isAppReady}
      />
    </ThemeProvider>
  );
}

const getStyles = (StyleColors) =>
  StyleSheet.create({
    headerTitle: {
      fontFamily: "inter-medium",
      fontSize: 18,
      color: StyleColors.onBackground,
    },
  });
