import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");

function OnboardingSlideItem({ slide }) {
  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);
  const SvgComponent = slide.svg;
  return (
    <View style={styles.rootContainer}>
      <View style={styles.content}>
        <View style={styles.svgContainer}>
          <SvgComponent width={width * 0.733} height={height * 0.44} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.subtitle}>{slide.subtitle}</Text>
        </View>
      </View>
    </View>
  );
}

export default OnboardingSlideItem;

const getStyles = (StyleColors) =>
  StyleSheet.create({
    rootContainer: {
      justifyContent: "center",
      alignItems: "center",
      width: width,
    },
    content: {
      width: width,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 48,
    },
    svgContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    textContainer: {
      flexDirection: "column",
      alignItems: "center",
    },
    title: {
      fontFamily: "inter-medium",
      textAlign: "center",
      fontSize: 20,
      color: StyleColors.onBackground,
      marginBottom: 10,
    },
    subtitle: {
      fontFamily: "inter-regular",
      textAlign: "center",
      fontSize: 16,
      color: StyleColors.onBackgroundVariant,
      marginBottom: 20,
    },
  });
