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

function SignUpScreen({ navigation }) {
  const startTextHandler = () => {
    navigation.replace("Login");
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
            />
            <OutlinedTextField
              keyboardType="default"
              placeholder="Password"
              leftIcon="lock-closed-outline"
              rightIcon="eye-off"
              textContentType="none"
              autoComplete="off"
            />
            <OutlinedTextField
              keyboardType="default"
              placeholder="Confirm Password"
              leftIcon="lock-closed-outline"
              rightIcon="eye-off"
              textContentType="none" // Aynı şekilde
              autoComplete="off"
            />
          </View>
          <View style={styles.authOptions}>
            <Button
              style={styles.signButton}
              text="Sign Up"
              textColor={StyleColors.onPrimary}
            />
            <Button
              text="Sign up with Google"
              style={styles.googleButton}
              textColor={StyleColors.onSurfacePrimary}
              icon={<GoogleSvg size={16} />}
            />
            <View style={styles.loginDirectorContainer}>
              <Text>Already have an account?</Text>
              <TextButton
                style={styles.loginDirectorButton}
                text="Login instead"
                onPress={startTextHandler}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SignUpScreen;

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
