import { Image, StyleSheet, TouchableOpacity } from "react-native";
import ProfileSvg from "../../assets/images/svg/profile";
import { useTheme } from "../../context/ThemeContext";

const profileImages = {
  pp1: require("../../assets/images/png/pp1.png"),
  pp2: require("../../assets/images/png/pp2.png"),
  pp3: require("../../assets/images/png/pp3.png"),
  pp4: require("../../assets/images/png/pp4.png"),
  pp5: require("../../assets/images/png/pp5.png"),
  pp6: require("../../assets/images/png/pp6.png"),
  pp7: require("../../assets/images/png/pp7.png"),
  pp8: require("../../assets/images/png/pp8.png"),
};

function ProfilePictureButton({ png, isSvg, isSelected, onPress }) {
  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isSelected && { borderColor: StyleColors.primary },
      ]}
      onPress={onPress}
    >
      {isSvg ? (
        <ProfileSvg size={90} />
      ) : (
        <Image
          source={profileImages[png]}
          style={{ width: 80, height: 80, borderRadius: 40 }}
          resizeMode="cover"
        />
      )}
    </TouchableOpacity>
  );
}

export default ProfilePictureButton;

const getStyles = (StyleColors) =>
  StyleSheet.create({
    button: {
      height: 100,
      width: 100,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 3,
      borderColor: StyleColors.outlineVariant,
    },
  });
