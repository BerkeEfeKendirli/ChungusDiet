import { signInWithEmailAndPassword } from "firebase/auth";
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

function LoginScreen({ navigation }) {
  const startTextHandler = () => {
    navigation.replace("SignUp");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);

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
      newErrors.email = "Enter a valid email address";
    }

    const isPasswordEmpty = password.trim() === "";

    if (isPasswordEmpty) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
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
              autoComplete="off"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
            />
            <OutlinedTextField
              keyboardType="default"
              placeholder="Password"
              leftIcon="lock-closed-outline"
              rightIcon="eye-off"
              autoComplete="off"
              value={password}
              onChangeText={setPassword}
              error={errors.password}
            />
            <TextButton
              style={styles.forgotPasswordButton}
              text="Forgot your password?"
              onPress={() => navigation.navigate("ForgotPassword")}
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
              text="Sign In"
              textColor={StyleColors.onPrimary}
              onPress={handleLogin}
            />
            <View style={styles.loginDirectorContainer}>
              <Text style={styles.loginDirectorText}>
                Don't you have an account?
              </Text>
              <TextButton
                style={styles.loginDirectorButton}
                text="Sign Up"
                onPress={startTextHandler}
              />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;

const getStyles = (StyleColors) =>
  StyleSheet.create({
    scrollContainer: {
      flex: 1,
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
    forgotPasswordButton: {
      fontFamily: "inter-medium",
      fontSize: 14,
      color: StyleColors.primary,
      alignSelf: "flex-end",
      marginTop: -12,
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
