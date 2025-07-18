import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecipesScreen from "./screens/Home/RecipesScreen";
import DiaryScreen from "./screens/Home/DiaryScreen";
import ReportsScreen from "./screens/Home/ReportsScreen";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingSlideScreen from "./screens/Onboarding/OnboardingSlideScreen";
import WelcomeScreen from "./screens/Onboarding/WelcomeScreen";
import SignUpScreen from "./screens/Auth/SignUpScreen";
import LoginScreen from "./screens/Auth/LoginScreen";
import { StyleColors } from "./constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebaseConfig";
import { useEffect, useState } from "react";
import { listenUserProfile } from "./services/userService";
import ProfileSetupNavigatorScreen from "./screens/ProfileSetup/ProfileSetupNavigatorScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RecommendedCaloriesScreen from "./screens/ProfileSetup/RecommendedCaloriesScreen";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function CustomBackButton({ navigation }) {
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <Ionicons name="chevron-back" size={24} />
    </Pressable>
  );
}

function BottomTabNavigator({ userProfile }) {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="Recipes"
        children={() => <RecipesScreen userProfile={userProfile} />}
      />
      <BottomTab.Screen name="Diary" component={DiaryScreen} />
      <BottomTab.Screen name="Reports" component={ReportsScreen} />
    </BottomTab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    "inter-regular": require("./assets/fonts/Inter-Regular.ttf"),
    "inter-medium": require("./assets/fonts/Inter-Medium.ttf"),
    "inter-semibold": require("./assets/fonts/Inter-SemiBold.ttf"),
  });
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile;
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        // Profil değişimini canlı dinle
        unsubscribeProfile = listenUserProfile(user.uid, (profile) => {
          setUserProfile(profile);
          setIsLoading(false);
        });
      } else {
        setUserProfile(null);
        setIsLoading(false);
      }
    });
    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  if (!fontsLoaded || isLoading) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: StyleColors.background },
          }}
        >
          {user ? (
            userProfile?.isProfileComplete ? (
              <Stack.Screen
                name="Home"
                children={() => (
                  <BottomTabNavigator userProfile={userProfile} />
                )}
              />
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
                  headerLeft: () => (
                    <CustomBackButton
                      navigation={navigation}
                      tintColor={StyleColors.onBackground}
                    />
                  ),
                  headerTitleStyle: styles.signUpTitle,
                })}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={({ navigation }) => ({
                  title: "Login",
                  headerShown: true,
                  headerTitleAlign: "center",
                  headerLeft: () => (
                    <CustomBackButton
                      navigation={navigation}
                      tintColor={StyleColors.onBackground}
                    />
                  ),
                  headerTitleStyle: styles.signUpTitle,
                })}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  signUpTitle: {
    fontFamily: "inter-medium",
    fontSize: 18,
    color: StyleColors.onBackground,
  },
});
