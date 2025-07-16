import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import OutlinedTextField from "../../components/textField/OutlinedTextField";
import Button from "../../components/buttons/Button";
import { StyleColors } from "../../constants/colors";
import GoogleSvg from "../../assets/images/svg/google";
import TextButton from "../../components/buttons/TextButton";

function LoginScreen({ navigation }) {
  const startTextHandler = () => {
    navigation.replace("SignUp");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.rootContainer}>
          <View style={styles.textFieldContainer}>
            <OutlinedTextField
              keyboardType="email-address"
              placeholder="Email"
              leftIcon="mail-outline"
              autoComplete="off"
            />
            <OutlinedTextField
              keyboardType="default"
              placeholder="Password"
              leftIcon="lock-closed-outline"
              rightIcon="eye-off"
              autoComplete="off"
            />
            <TextButton
              style={styles.forgotPasswordButton}
              text="Forgot your password?"
            />
          </View>
          <View style={styles.authOptions}>
            <Button
              style={styles.signButton}
              text="Login"
              textColor={StyleColors.onPrimary}
            />
            <Button
              text="Sign in with Google"
              style={styles.googleButton}
              textColor={StyleColors.onSurfacePrimary}
              icon={<GoogleSvg size={16} />}
            />
            <View style={styles.loginDirectorContainer}>
              <Text>Don't you have an account?</Text>
              <TextButton
                style={styles.loginDirectorButton}
                text="Sign Up"
                onPress={startTextHandler}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
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
});
