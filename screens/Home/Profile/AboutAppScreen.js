import { View, StyleSheet, Text, Linking } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import AboutAppGrid from "../../../components/profile/AboutAppGrid";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function AboutAppScreen() {
  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.rootContainer, { paddingBottom: insets.bottom }]}>
      <View style={styles.appDescriptionContainer}>
        <Text style={{ textAlign: "center" }}>
          <Text style={styles.appName}>Chungus Diet</Text>
          <Text style={styles.appDescription}>
            {" "}
            - a mobile app developed and designed by a single developer to
            assist you on your journey to achieving dream physique.
          </Text>
        </Text>
      </View>
      <View style={styles.appFeaturesContainer}>
        <Text style={[styles.appDescription, { textAlign: "center" }]}>
          We provide with all the necessary features such as:
        </Text>
        <View style={styles.appFeaturesDecriptionContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.appDescription}>{"\u2022"} </Text>
            <Text style={styles.appDescription}>
              Diary to log your meals and water intake
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.appDescription}>{"\u2022"} </Text>
            <Text style={styles.appDescription}>
              Reports to keep a track on your weight
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.appDescription}>{"\u2022"} </Text>
            <Text style={styles.appDescription}>
              Recipes to quickly come up with something to cook
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.gridContainer}>
        <AboutAppGrid icon="pie-chart-outline" text="Diary" />
        <AboutAppGrid icon="bar-chart-outline" text="Reports" />
        <AboutAppGrid icon="book-outline" text="Recipes" />
      </View>
      <View style={styles.sourceCodeContainer}>
        <Text style={styles.sourceCodeText}>Visit source code</Text>
        <Feather
          name="github"
          size={32}
          color={StyleColors.primary}
          onPress={() => Linking.openURL("https://github.com/BerkeEfeKendirli")}
        />
      </View>
    </View>
  );
}

export default AboutAppScreen;

const getStyles = (StyleColors) =>
  StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: StyleColors.background,
      paddingHorizontal: 16,
    },
    appDescriptionContainer: {
      marginTop: 42,
    },
    appName: {
      fontFamily: "inter-medium",
      fontSize: 16,
      color: StyleColors.primary,
    },
    appDescription: {
      fontFamily: "inter-regular",
      fontSize: 16,
      color: StyleColors.onBackground,
    },
    appFeaturesContainer: {
      marginTop: 44,
      marginBottom: 38,
      gap: 24,
      paddingHorizontal: 8,
    },
    appFeaturesDecriptionContainer: {
      gap: 24,
    },
    gridContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 8,
    },
    sourceCodeContainer: {
      alignItems: "center",
      gap: 16,
      marginTop: "auto",
      marginBottom: 40,
    },
    sourceCodeText: {
      fontFamily: "inter-regular",
      fontSize: 14,
      color: StyleColors.onBackgroundVariant,
    },
  });
