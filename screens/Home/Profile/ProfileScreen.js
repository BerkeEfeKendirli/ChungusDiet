import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomSwitch from "../../../components/buttons/CustomSwitch";
import ProfileButton from "../../../components/buttons/ProfileButton";
import SettingsButton from "../../../components/buttons/SettingsButton";
import TextButton from "../../../components/buttons/TextButton";
import { useTheme } from "../../../context/ThemeContext";
import ProfileSvg from "../../../assets/images/svg/profile";

function ProfileScreen({ userProfile }) {
  const { mode, setMode } = useTheme();
  const navigation = useNavigation();
  const auth = getAuth();
  const email = auth.currentUser?.email;
  const calories = userProfile?.profile?.targetCalories;
  const water = userProfile?.profile?.targetWater;
  const [modalVisible, setModalVisible] = useState(false);

  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);

  const profileImages = {
    default: <ProfileSvg width={40} height={40} />,
    pp1: require("../../../assets/images/png/pp1.png"),
    pp2: require("../../../assets/images/png/pp2.png"),
    pp3: require("../../../assets/images/png/pp3.png"),
    pp4: require("../../../assets/images/png/pp4.png"),
    pp5: require("../../../assets/images/png/pp5.png"),
    pp6: require("../../../assets/images/png/pp6.png"),
    pp7: require("../../../assets/images/png/pp7.png"),
    pp8: require("../../../assets/images/png/pp8.png"),
  };

  const profileImageKey = userProfile?.profileImage || "default";

  return (
    <View style={styles.rootContainer}>
      <View style={styles.userContainer}>
        {profileImageKey === "default" ? (
          <ProfileSvg size={90} />
        ) : (
          <Image
            source={profileImages[profileImageKey]}
            style={{ width: 90, height: 90, borderRadius: 45 }}
          />
        )}
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
          onPress={() => navigation.navigate("Me")}
        />
        <ProfileButton
          text="Calorie Intake"
          backgroundColor={StyleColors.surfaceSecondary}
          textColor={StyleColors.onSurfaceSecondary}
          object={<Text style={styles.calorieText}>{calories} Cal</Text>}
          onPress={() => navigation.navigate("CalorieIntake")}
        />
        <ProfileButton
          text="Water Intake"
          backgroundColor={StyleColors.surfaceSecondary}
          textColor={StyleColors.onSurfaceSecondary}
          object={<Text style={styles.calorieText}>{water} mL</Text>}
          onPress={() => navigation.navigate("WaterIntake")}
        />
      </View>
      <View style={styles.divider}></View>
      <View style={styles.themeButtonContainer}>
        <SettingsButton text="Dark theme" icon="contrast-outline" />
        <CustomSwitch
          value={mode === "dark"}
          onValueChange={(val) => setMode(val ? "dark" : "light")}
        />
      </View>
      <SettingsButton text="Contact us" icon="mail-outline" />
      <SettingsButton
        text="About app"
        icon="information-circle-outline"
        onPress={() => navigation.navigate("AboutApp")}
      />
      <SettingsButton
        text="Settings"
        icon="settings-outline"
        onPress={() => navigation.navigate("Settings")}
      />
      <SettingsButton
        text="Sign Out"
        icon="log-out-outline"
        iconColor={StyleColors.danger}
        textColor={StyleColors.danger}
        onPress={() => setModalVisible(true)}
      />
      {modalVisible && (
        <Modal transparent statusBarTranslucent animationType="fade">
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback onPress={() => {}}>
                <View style={styles.modalInnerContainer}>
                  <Text style={styles.modalText}>
                    Do you really want to sign out?
                  </Text>
                  <View style={styles.modalButtonContainer}>
                    <TextButton
                      text="Cancel"
                      style={[styles.button, { color: StyleColors.primary }]}
                      onPress={() => setModalVisible(false)}
                    />
                    <TextButton
                      text="Sign Out"
                      style={[styles.button, { color: StyleColors.danger }]}
                      onPress={async () => {
                        await signOut(auth);
                      }}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
}

export default ProfileScreen;

const getStyles = (StyleColors) =>
  StyleSheet.create({
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
    modalContainer: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#0000004f",
      paddingHorizontal: 32,
    },
    modalInnerContainer: {
      width: "100%",
      backgroundColor: StyleColors.surfacePrimary,
      paddingHorizontal: 24,
      paddingVertical: 16,
      borderRadius: 10,
      alignItems: "center",
      elevation: 2,
      shadowColor: "black",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    modalButtonContainer: {
      flexDirection: "row",
      gap: 32,
      marginTop: 36,
    },
    modalText: {
      fontFamily: "inter-medium",
      fontSize: 18,
      color: StyleColors.onBackground,
    },
    button: {
      fontFamily: "inter-regular",
      fontSize: 14,
    },
  });
