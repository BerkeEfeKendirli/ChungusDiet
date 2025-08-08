import { View, StyleSheet } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import ProfilePictureButton from "../../../components/profile/ProfilePictureButton";
import Button from "../../../components/buttons/Button";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function ProfilePictureScreen({ userProfile }) {
  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (userProfile?.profileImage) {
      setSelected(userProfile?.profileImage);
    }
  }, [userProfile?.profileImage]);

  const handleSave = async () => {
    try {
      const auth = getAuth();
      const db = getFirestore();
      const user = auth.currentUser;
      if (!user) return;
      await updateDoc(doc(db, "users", user.uid), {
        profileImage: selected,
      });
      navigation.goBack();
    } catch (err) {}
  };

  return (
    <View style={[styles.rootContainer, { paddingBottom: insets.bottom }]}>
      <View style={styles.profileButtonsContainer}>
        <ProfilePictureButton
          isSvg={true}
          isSelected={selected === "default"}
          onPress={() => setSelected("default")}
        />
        <ProfilePictureButton
          isSvg={false}
          png="pp1"
          isSelected={selected === "pp1"}
          onPress={() => setSelected("pp1")}
        />
        <ProfilePictureButton
          isSvg={false}
          png="pp2"
          isSelected={selected === "pp2"}
          onPress={() => setSelected("pp2")}
        />
        <ProfilePictureButton
          isSvg={false}
          png="pp3"
          isSelected={selected === "pp3"}
          onPress={() => setSelected("pp3")}
        />
        <ProfilePictureButton
          isSvg={false}
          png="pp4"
          isSelected={selected === "pp4"}
          onPress={() => setSelected("pp4")}
        />
        <ProfilePictureButton
          isSvg={false}
          png="pp5"
          isSelected={selected === "pp5"}
          onPress={() => setSelected("pp5")}
        />
        <ProfilePictureButton
          isSvg={false}
          png="pp6"
          isSelected={selected === "pp6"}
          onPress={() => setSelected("pp6")}
        />
        <ProfilePictureButton
          isSvg={false}
          png="pp7"
          isSelected={selected === "pp7"}
          onPress={() => setSelected("pp7")}
        />
        <ProfilePictureButton
          isSvg={false}
          png="pp8"
          isSelected={selected === "pp8"}
          onPress={() => setSelected("pp8")}
        />
      </View>
      <Button
        text="Save"
        textColor={StyleColors.onPrimary}
        style={styles.button}
        onPress={handleSave}
      />
    </View>
  );
}

export default ProfilePictureScreen;

const getStyles = (StyleColors) =>
  StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: StyleColors.background,
      justifyContent: "space-between",
    },
    profileButtonsContainer: {
      marginTop: 24,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 10,
    },
    button: {
      backgroundColor: StyleColors.primary,
      marginHorizontal: 16,
      marginBottom: 24,
    },
  });
