import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import OutlinedTextField from "../../components/textField/OutlinedTextField";
import Button from "../../components/buttons/Button";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

function ForgotPasswordScreen({ userProfile }) {
  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendCode = async () => {
    setError("");
    setSuccess("");
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("A reset link has been sent to your email.");
    } catch (err) {
      setError("Failed to send reset email. Please check your email address.");
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
          <View></View>
          <View style={styles.formContainer}>
            <Text style={styles.formText}>
              We will send a password reset code to your email account.
            </Text>
            <View>
              <OutlinedTextField
                keyboardType="email-address"
                placeholder="Email"
                leftIcon="mail-outline"
                autoComplete="off"
                value={email}
                onChangeText={setEmail}
              />
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              {success ? (
                <Text style={styles.successText}>{success}</Text>
              ) : null}
            </View>
          </View>
          <View style={{ marginBottom: 16, width: "100%" }}>
            <Button
              text="Send Code"
              style={styles.button}
              textColor={StyleColors.onPrimary}
              onPress={handleSendCode}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default ForgotPasswordScreen;

const getStyles = (StyleColors) =>
  StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    rootContainer: {
      flex: 1,
      backgroundColor: StyleColors.background,
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 24,
    },
    formContainer: {
      gap: 36,
    },
    formText: {
      fontFamily: "inter-regular",
      fontSize: 16,
      color: StyleColors.onBackgroundVariant,
      textAlign: "center",
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
    successText: {
      color: StyleColors.primary,
      fontFamily: "inter-regular",
      textAlign: "center",
      fontSize: 16,
    },
  });
