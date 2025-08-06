import { View, StyleSheet, Text, Dimensions } from "react-native";
import Onboarding4 from "../../assets/images/svg/Onboarding4";
import Button from "../../components/buttons/Button";
import TextButton from "../../components/buttons/TextButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

function WelcomeScreen({ navigation }) {
  const startButtonHandler = () => {
    navigation.navigate("SignUp");
  };

  const startTextHandler = () => {
    navigation.navigate("Login");
  };
  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.content}>
        <View style={styles.svgContainer}>
          <Onboarding4 color={StyleColors.primary} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Start or sign in to your account</Text>
        </View>
      </View>
      <View style={styles.startContainer}>
        <View style={styles.button}>
          <Button
            text="Sign Up"
            onPress={startButtonHandler}
            style={{ backgroundColor: StyleColors.primary }}
            textColor={StyleColors.onPrimary}
          />
        </View>
        <View style={styles.startTextContainer}>
          <Text style={styles.startText}>Already have an account?</Text>
          <TextButton
            text="Sign In"
            color={StyleColors.primary}
            style={styles.startTextButton}
            onPress={startTextHandler}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default WelcomeScreen;

const getStyles = (StyleColors) =>
  StyleSheet.create({
    rootContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: StyleColors.background,
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    svgContainer: {
      marginBottom: 15,
    },
    textContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontFamily: "inter-medium",
      fontSize: 20,
      color: StyleColors.onBackground,
      marginBottom: 4,
    },
    subtitle: {
      fontFamily: "inter-regular",
      fontSize: 16,
      color: StyleColors.onBackgroundVariant,
    },
    startContainer: {
      width: "100%",
      paddingHorizontal: 24,
      paddingBottom: 40,
    },
    button: {
      marginBottom: 20,
    },
    startTextContainer: {
      flexDirection: "row",
      justifyContent: "center",
    },
    startText: {
      fontFamily: "inter-regular",
      fontSize: 14,
      color: StyleColors.onBackground,
      marginRight: 6,
    },
    startTextButton: {
      fontFamily: "inter-medium",
      fontSize: 14,
      color: StyleColors.primary,
    },
  });
