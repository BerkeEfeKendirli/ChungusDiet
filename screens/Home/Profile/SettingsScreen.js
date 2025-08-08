import { useNavigation } from "@react-navigation/native";
import { deleteUser, getAuth, signOut } from "firebase/auth";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ProfileSvg from "../../../assets/images/svg/profile";
import SettingsButton from "../../../components/buttons/SettingsButton";
import TextButton from "../../../components/buttons/TextButton";
import { useTheme } from "../../../context/ThemeContext";

function SettingsScreen({ userProfile }) {
  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);
  const email = userProfile?.email;
  const auth = getAuth();
  const navigation = useNavigation();
  const [outModaLVisible, setOutModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const profileImages = {
    default: <ProfileSvg size={90} />,
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

  const handleDeleteAccount = async () => {
    try {
      const auth = getAuth();
      const db = getFirestore();
      const user = auth.currentUser;
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);
    } catch (err) {}
    console.log("Delete account error:", err);
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.profileContainer}>
        {profileImageKey === "default" ? (
          <ProfileSvg size={90} />
        ) : (
          <Image
            source={profileImages[profileImageKey]}
            style={{ width: 80, height: 80, borderRadius: 50 }}
          />
        )}
        <Text style={styles.emailText}>{email}</Text>
      </View>
      <SettingsButton
        text="Change profile picture"
        icon="person-circle-outline"
        onPress={() => navigation.navigate("ProfilePicture")}
      />
      <View style={styles.divider}></View>
      <View style={styles.accountButtons}>
        <SettingsButton
          text="Change password"
          icon="key-outline"
          onPress={() => navigation.navigate("ChangePassword")}
        />
        <SettingsButton
          text="Sign Out"
          textColor={StyleColors.danger}
          icon="log-out-outline"
          iconColor={StyleColors.danger}
          onPress={() => setOutModalVisible(true)}
        />
        <SettingsButton
          text="Delete Account"
          textColor={StyleColors.danger}
          icon="trash-outline"
          iconColor={StyleColors.danger}
          onPress={() => setDeleteModalVisible(true)}
        />
      </View>
      <Modal
        visible={outModaLVisible}
        transparent
        statusBarTranslucent
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={() => setOutModalVisible(false)}>
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
                    onPress={() => setOutModalVisible(false)}
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
      <Modal
        visible={deleteModalVisible}
        transparent
        statusBarTranslucent
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={() => setDeleteModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalInnerContainer}>
                <Text style={styles.modalText}>
                  Do you really want to delete your account?
                </Text>
                <View style={styles.modalButtonContainer}>
                  <TextButton
                    text="Cancel"
                    style={[styles.button, { color: StyleColors.primary }]}
                    onPress={() => setDeleteModalVisible(false)}
                  />
                  <TextButton
                    text="DELETE"
                    style={[
                      styles.button,
                      { color: StyleColors.danger, fontSize: 18 },
                    ]}
                    onPress={handleDeleteAccount}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

export default SettingsScreen;

const getStyles = (StyleColors) =>
  StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: StyleColors.background,
    },
    profileContainer: {
      marginTop: 24,
      marginBottom: 24,
      justifyContent: "center",
      alignItems: "center",
      gap: 16,
    },
    emailText: {
      fontFamily: "inter-medium",
      fontSize: 16,
      color: StyleColors.primary,
    },
    divider: {
      height: 1,
      backgroundColor: StyleColors.outlineVariant,
      marginHorizontal: 10,
      marginTop: 6,
    },
    saveButton: {
      backgroundColor: StyleColors.primary,
      marginHorizontal: 16,
      marginBottom: 24,
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
      alignItems: "center",
      gap: 32,
      marginTop: 36,
    },
    modalText: {
      fontFamily: "inter-medium",
      fontSize: 18,
      color: StyleColors.onBackground,
      textAlign: "center",
    },
  });
