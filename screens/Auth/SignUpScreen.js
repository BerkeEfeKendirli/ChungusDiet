import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/buttons/Button";
import TextButton from "../../components/buttons/TextButton";
import OutlinedTextField from "../../components/textField/OutlinedTextField";
import { auth } from "../../config/firebaseConfig";
import { useTheme } from "../../context/ThemeContext";
import { createUserProfile } from "../../services/userService";

function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateForm = () => {
    const newErrors = {};

    const isEmailEmpty = email.trim() === "";
    const isEmailValid = validateEmail(email);

    if (isEmailEmpty) {
      newErrors.email = "Email is required";
    } else if (!isEmailValid) {
      newErrors.email = "Enter a valid email address.";
    }

    const isPasswordEmpty = password.trim() === "";
    const isPasswordValid = validatePassword(password);

    if (isPasswordEmpty) {
      newErrors.password = "Password is required";
    } else if (!isPasswordValid) {
      newErrors.password = "Password must be atleast 8 characters";
    }

    const isConfirmPasswordEmpty = confirmPassword.trim() === "";
    const passwordsMatch = password === confirmPassword;

    if (isConfirmPasswordEmpty) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (!passwordsMatch) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    const isFormValid = Object.keys(newErrors).length === 0;

    return isFormValid;
  };

  const startTextHandler = () => {
    navigation.replace("Login");
  };

  const handleSignUp = async () => {
    if (validateForm()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await createUserProfile(userCredential.user.uid, {
          email: userCredential.user.email,
        });
      } catch (error) {
        setErrors({ general: error.message });
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      enabled={Platform.OS === "ios"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView style={styles.rootContainer}>
          <View style={styles.textFieldContainer}>
            <OutlinedTextField
              keyboardType="email-address"
              placeholder="Email"
              leftIcon="mail-outline"
              value={email}
              onChangeText={handleEmailChange}
              error={errors.email}
            />
            <OutlinedTextField
              keyboardType="default"
              placeholder="Password"
              leftIcon="lock-closed-outline"
              rightIcon="eye-off"
              textContentType="none"
              autoComplete="off"
              value={password}
              onChangeText={handlePasswordChange}
              error={errors.password}
            />
            <OutlinedTextField
              keyboardType="default"
              placeholder="Confirm Password"
              leftIcon="lock-closed-outline"
              rightIcon="eye-off"
              textContentType="none" // Aynı şekilde
              autoComplete="off"
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              error={errors.confirmPassword}
            />
            {Object.keys(errors).length > 0 && (
              <Text style={styles.errorText}>
                Please enter valid information.
              </Text>
            )}
          </View>
          <View style={styles.authOptions}>
            <Button
              style={styles.signButton}
              text="Sign Up"
              textColor={StyleColors.onPrimary}
              onPress={handleSignUp}
            />
            <View style={styles.loginDirectorContainer}>
              <Text style={styles.loginDirectorText}>
                Already have an account?
              </Text>
              <TextButton
                style={styles.loginDirectorButton}
                text="Sign in instead"
                onPress={startTextHandler}
              />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SignUpScreen;

const getStyles = (StyleColors) =>
  StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      backgroundColor: StyleColors.background,
    },
    rootContainer: {
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 24,
      paddingVertical: 40,
    },
    textFieldContainer: {
      width: "100%",
    },
    errorText: {
      fontFamily: "inter-medium",
      fontSize: 14,
      color: StyleColors.danger,
      marginTop: -12,
    },
    authOptions: {
      width: "100%",
    },
    signButton: {
      backgroundColor: StyleColors.primary,
    },
    googleButton: {
      backgroundColor: StyleColors.onPrimary,
      borderColor: StyleColors.outline,
      borderWidth: 1,
    },
    loginDirectorContainer: {
      flexDirection: "row",
      alignSelf: "center",
    },
    loginDirectorButton: {
      fontFamily: "inter-medium",
      fontSize: 14,
      color: StyleColors.primary,
      marginLeft: 6,
    },
    loginDirectorText: {
      fontFamily: "inter-regular",
      fontSize: 14,
      color: StyleColors.onBackground,
    },
  });
