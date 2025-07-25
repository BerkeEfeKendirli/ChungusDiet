import { View, Pressable, Text, StyleSheet, Linking } from "react-native";
import YoutubeSvg from "./../../assets/images/svg/youtube";
import { StyleColors } from "./../../constants/colors";

function YoutubeDirector({ link }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={() => link && Linking.openURL(link)}
    >
      <Text style={styles.description}>Watch the recipe video ⬇</Text>
      <View style={styles.youtubeContainer}>
        <YoutubeSvg width={20} height={20} />
        <Text style={styles.link}>{link}</Text>
      </View>
    </Pressable>
  );
}

export default YoutubeDirector;

const styles = StyleSheet.create({
  button: {
    gap: 4,
  },
  description: {
    fontFamily: "inter-regular",
    fontSize: 14,
    color: StyleColors.onBackgroundVariant,
  },
  youtubeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  link: {
    fontFamily: "inter-regular",
    fontSize: 12,
    color: StyleColors.red,
  },
});
