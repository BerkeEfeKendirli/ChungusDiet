import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import OutlinedTextField from "../../../components/textField/OutlinedTextField";
import Button from "../../../components/buttons/Button";
import { useState } from "react";
import { auth } from "./../../../config/firebaseConfig";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

function ChangePasswordScreen({ userProfile }) {
  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);
  const insets = useSafeAreaInsets();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = async () => {
    setError("");
    setSuccess("");
    if (!oldPass || !newPass || !repeatPass) {
      setError("Please fill all fields.");
      return;
    }
    if (newPass !== repeatPass) {
      setError("New passwords do not match.");
      return;
    }
    if (newPass.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, oldPass);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPass);
      setSuccess("Password changed succesfully.");
      setOldPass("");
      setNewPass("");
      setRepeatPass("");
    } catch (err) {
      setError(
        "Password change failed. Please make sure your current password is correct."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      enabled={Platform.OS === "ios"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.rootContainer, { paddingBottom: insets.bottom }]}>
          <Text style={styles.description}>
            Please enter your old and new passwords to continue
          </Text>
          <View style={styles.inputContainer}>
            <OutlinedTextField
              keyboardType="default"
              placeholder="Old password"
              leftIcon="lock-closed-outline"
              rightIcon="eye-off"
              autoComplete="off"
              value={oldPass}
              onChangeText={setOldPass}
            />
            <OutlinedTextField
              keyboardType="default"
              placeholder="New password"
              leftIcon="lock-closed-outline"
              rightIcon="eye-off"
              autoComplete="off"
              value={newPass}
              onChangeText={setNewPass}
            />
            <OutlinedTextField
              keyboardType="default"
              placeholder="Repeat new password"
              leftIcon="lock-closed-outline"
              rightIcon="eye-off"
              autoComplete="off"
              value={repeatPass}
              onChangeText={setRepeatPass}
            />
            <View style={{ alignItems: "center" }}>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              {success ? (
                <Text style={styles.succesText}>{success}</Text>
              ) : null}
            </View>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Button
              text="Change"
              style={styles.button}
              textColor={StyleColors.onPrimary}
              onPress={handleChangePassword}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default ChangePasswordScreen;

const getStyles = (StyleColors) =>
  StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    rootContainer: {
      flex: 1,
      backgroundColor: StyleColors.background,
      justifyContent: "space-between",
      paddingHorizontal: 16,
    },
    description: {
      fontFamily: "inter-regular",
      textAlign: "center",
      color: StyleColors.onBackgroundVariant,
      fontSize: 16,
      marginTop: 42,
      marginHorizontal: 16,
    },
    button: {
      backgroundColor: StyleColors.primary,
    },
    errorText: {
      color: StyleColors.danger,
      fontFamily: "inter-regular",
      textAlign: "center",
      fontSize: 16,
    },
    succesText: {
      color: StyleColors.primary,
      fontFamily: "inter-regular",
      textAlign: "center",
      fontSize: 16,
    },
  });
