import { Ionicons } from "@expo/vector-icons";
import { getAuth, signOut } from "firebase/auth";
import { Alert, StyleSheet, Text, View } from "react-native";
import { StyleColors } from "../../constants/colors";
import ProfileButton from "./../../components/buttons/ProfileButton";
import SettingsButton from "../../components/buttons/SettingsButton";
import CustomSwitch from "./../../components/buttons/CustomSwitch";
import { useState } from "react";

function ProfileScreen({ userProfile }) {
  const auth = getAuth();
  const email = auth.currentUser?.email;
  const calories = userProfile?.profile?.targetCalories;
  const [darkMode, setDarkMode] = useState(false);

  const logoutHandler = () => {
    try {
      Alert.alert("Do you really want to sign out?", "", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            await signOut(auth);
          },
        },
      ]);
    } catch (error) {}
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.userContainer}>
        <Ionicons
          name="person-circle-outline"
          size={90}
          color={StyleColors.onBackgroundVariant}
        />
        <Text style={styles.mailText}>{email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <ProfileButton
          text="Me"
          backgroundColor={StyleColors.primary}
          textColor={StyleColors.onPrimary}
          object={
            <Ionicons
              name="chevron-forward"
              color={StyleColors.onPrimary}
              size={12}
            />
          }
        />
        <ProfileButton
          text="Calorie Intake"
          backgroundColor={StyleColors.surfaceSecondary}
          textColor={StyleColors.onSurfaceSecondary}
          object={<Text style={styles.calorieText}>{calories} Cal</Text>}
        />
        <ProfileButton
          text="Water Intake"
          backgroundColor={StyleColors.surfaceSecondary}
          textColor={StyleColors.onSurfaceSecondary}
          object={<Text style={styles.calorieText}>{calories} Cal</Text>}
        />
      </View>
      <View style={styles.divider}></View>
      <View style={styles.themeButtonContainer}>
        <SettingsButton text="Dark theme" icon="contrast-outline" />
        <CustomSwitch value={darkMode} onValueChange={setDarkMode} />
      </View>
      <SettingsButton text="Contact us" icon="mail-outline" />
      <SettingsButton text="About app" icon="information-circle-outline" />
      <SettingsButton text="Settings" icon="settings-outline" />
      <SettingsButton
        text="Sign Out"
        icon="log-out-outline"
        iconColor={StyleColors.danger}
        textColor={StyleColors.danger}
        onPress={logoutHandler}
      />
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  userContainer: {
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  mailText: {
    fontFamily: "inter-medium",
    fontSize: 16,
    color: StyleColors.primary,
  },
  infoContainer: {
    width: "100%",
    gap: 8,
  },
  calorieText: {
    fontFamily: "inter-medium",
    fontSize: 14,
    color: StyleColors.primary,
  },
  divider: {
    width: "100%",
    height: 1,
    borderRadius: 1,
    backgroundColor: StyleColors.outlineVariant,
    marginTop: 24,
    marginBottom: 12,
  },
  themeButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
