import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import InfoItem from "../../../components/profile/InfoItem";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Button from "../../../components/buttons/Button";
import TextButton from "../../../components/buttons/TextButton";
import { useTheme } from "../../../context/ThemeContext";

const { width } = Dimensions.get("window");

const MAX_VALUES = {
  calories: 9999,
  proteins: 9999,
  fats: 9999,
  carbs: 9999,
};

function CalorieIntakeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [calories, setCalories] = useState(0);
  const [proteins, setProteins] = useState(0);
  const [fats, setFats] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [resetModalVisible, setResetModalVisible] = useState(false);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [recommended, setRecommended] = useState({
    calories: 0,
    proteins: 0,
    fats: 0,
    carbs: 0,
  });
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const auth = getAuth();
      const uid = auth.currentUser.uid;
      const userRef = doc(db, "users", uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const profile = docSnap.data().profile;
        setRecommended({
          calories: profile.recCalories || 0,
          proteins: profile.recProtein || 0,
          fats: profile.recFat || 0,
          carbs: profile.recCarbs || 0,
        });
        setCalories(profile.targetCalories ?? profile.recCalories ?? 0);
        setProteins(profile.targetProtein ?? profile.recProtein ?? 0);
        setFats(profile.targetFat ?? profile.recFat ?? 0);
        setCarbs(profile.targetCarbs ?? profile.recCarbs ?? 0);
      }
    };
    fetchProfile();
  }, []);

  const handleSaveButton = async () => {
    try {
      const auth = getAuth();
      const uid = auth.currentUser.uid;
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        "profile.targetCalories": Number(calories),
        "profile.targetProtein": Number(proteins),
        "profile.targetFat": Number(fats),
        "profile.targetCarbs": Number(carbs),
      });
      navigation.goBack();
    } catch (err) {
      console.error("Failed to update targets:", err);
    }
  };

  const handleResetToDefault = () => {
    setCalories(recommended.calories);
    setProteins(recommended.proteins);
    setFats(recommended.fats);
    setCarbs(recommended.carbs);
    setResetModalVisible(false);
  };

  const handleNumberInput = (text) => {
    let cleaned = text.replace(/,/g, ".").replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) {
      cleaned = parts[0] + "." + parts.slice(1).join("");
    }
    if (parts.length === 2) {
      cleaned = parts[0] + "." + parts[1].slice(0, 2);
    }
    const max = MAX_VALUES[editField] || 9999;
    const [beforeDot, afterDot] = cleaned.split(".");
    if (beforeDot && Number(beforeDot) > max) {
      cleaned = max + (afterDot ? "." + afterDot : "");
    }
    setEditValue(cleaned);
  };

  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);

  return (
    <View
      style={[
        styles.rootContainer,
        { paddingBottom: insets.bottom, paddingTop: insets.top + 12 },
      ]}
    >
      <View>
        <View style={styles.headerContainer}>
          <Ionicons
            name="chevron-back"
            size={24}
            style={{ alignSelf: "flex-start" }}
            onPress={() => navigation.goBack()}
            color={StyleColors.onBackground}
          />
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={styles.headerText}>Calorie Intake</Text>
          </View>
          <Ionicons name="chevron-back" size={24} style={{ opacity: 0 }} />
        </View>
        <View>
          <InfoItem
            infoText="Calories"
            info={calories}
            infoSecondary="cal"
            onPress={() => {
              setEditField("calories");
              setEditValue(calories.toString());
              setModalVisible(true);
            }}
          />
          <InfoItem
            infoText="Proteins"
            info={proteins}
            infoSecondary="g"
            onPress={() => {
              setEditField("proteins");
              setEditValue(proteins.toString());
              setModalVisible(true);
            }}
          />
          <InfoItem
            infoText="Fats"
            info={fats}
            infoSecondary="g"
            onPress={() => {
              setEditField("fats");
              setEditValue(fats.toString());
              setModalVisible(true);
            }}
          />
          <InfoItem
            infoText="Carbs"
            info={carbs}
            infoSecondary="g"
            onPress={() => {
              setEditField("carbs");
              setEditValue(carbs.toString());
              setModalVisible(true);
            }}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text="Save"
          style={styles.button}
          textColor={StyleColors.onPrimary}
          onPress={() => setSaveModalVisible(true)}
        />
        <TextButton
          text="Reset to default"
          style={styles.textButton}
          onPress={() => setResetModalVisible(true)}
        />
      </View>
      <Modal
        visible={modalVisible}
        transparent
        statusBarTranslucent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={[styles.modalContainer, { paddingBottom: insets.bottom }]}
          >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" && "padding"}
                style={{ width: "100%" }}
              >
                <View style={styles.modalInnerContainer}>
                  <Text style={styles.modalTitle}>
                    Daily{" "}
                    {editField &&
                      (editField === "proteins"
                        ? "protein intake"
                        : editField === "fats"
                        ? "fat intake"
                        : editField === "carbs"
                        ? "carb intake"
                        : "calorie intake")}
                  </Text>
                  <View style={styles.inputContainer}>
                    <Text>
                      {editField &&
                        editField.charAt(0).toUpperCase() + editField.slice(1)}
                    </Text>
                    <TextInput
                      value={editValue}
                      onChangeText={(text) => {
                        setShowWarning(false);
                        handleNumberInput(text);
                      }}
                      keyboardType="numeric"
                      style={[
                        styles.input,
                        showWarning &&
                          (!editValue || isNaN(Number(editValue))) && {
                            borderBottomColor: StyleColors.danger,
                          },
                      ]}
                    />
                    {showWarning &&
                      (!editValue || isNaN(Number(editValue))) && (
                        <Text style={styles.errorText}>
                          Please enter a valid number.
                        </Text>
                      )}
                  </View>
                  <Text style={styles.recommendText}>{`Recommended: ${
                    recommended[editField]
                  } ${editField === "calories" ? "cal" : "g"}`}</Text>
                  <Button
                    text="Done"
                    style={styles.button}
                    textColor={StyleColors.onPrimary}
                    onPress={() => {
                      if (!editValue || isNaN(Number(editValue))) {
                        setShowWarning(true);
                        setTimeout(() => setShowWarning(false), 4000);
                        return;
                      }
                      const value = Number(editValue);
                      if (editField === "calories") setCalories(value);
                      if (editField === "proteins") setProteins(value);
                      if (editField === "fats") setFats(value);
                      if (editField === "carbs") setCarbs(value);
                      setModalVisible(false);
                    }}
                  />
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal
        visible={resetModalVisible}
        statusBarTranslucent
        transparent
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={() => setResetModalVisible(false)}>
          <View style={styles.resetModalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.resetModalInnerContainer}>
                <View style={styles.resetModalTextContainer}>
                  <Text style={styles.resetModalTitle}>Reset</Text>
                  <Text style={styles.resetModalDescription}>
                    Do you want to reset to recommended values?
                  </Text>
                </View>
                <View style={styles.resetButtonContainer}>
                  <TextButton
                    text="Cancel"
                    style={styles.resetButtonText}
                    onPress={() => setResetModalVisible(false)}
                  />
                  <TextButton
                    text="OK"
                    style={styles.resetButtonText}
                    onPress={handleResetToDefault}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal
        visible={saveModalVisible}
        statusBarTranslucent
        transparent
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={() => setSaveModalVisible(false)}>
          <View style={styles.resetModalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.resetModalInnerContainer}>
                <View style={styles.resetModalTextContainer}>
                  <Text style={styles.resetModalTitle}>Save</Text>
                  <Text style={styles.resetModalDescription}>
                    Do you want to save your changes?
                  </Text>
                </View>
                <View style={styles.resetButtonContainer}>
                  <TextButton
                    text="Cancel"
                    style={styles.resetButtonText}
                    onPress={() => setSaveModalVisible(false)}
                  />
                  <TextButton
                    text="OK"
                    style={styles.resetButtonText}
                    onPress={handleSaveButton}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

export default CalorieIntakeScreen;

const getStyles = (StyleColors) =>
  StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: StyleColors.background,
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
    },
    headerContainer: {
      paddingHorizontal: 16,
      width: width,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    headerText: {
      fontFamily: "inter-medium",
      fontSize: 22,
      color: StyleColors.onBackground,
    },
    buttonContainer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      width: "100%",
      backgroundColor: StyleColors.primary,
    },
    textButton: {
      fontFamily: "inter-medium",
      fontSize: 14,
      color: StyleColors.primary,
      marginBottom: 16,
    },
    inputContainer: {
      alignItems: "center",
    },
    input: {
      fontFamily: "inter-regular",
      fontSize: 16,
      color: StyleColors.onBackground,
      borderBottomColor: StyleColors.primary,
      borderBottomWidth: 2,
      paddingBottom: 8,
      width: 100,
      textAlign: "center",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "#0000004f",
    },
    modalInnerContainer: {
      backgroundColor: StyleColors.background,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      padding: 24,
      justifyContent: "center",
      alignItems: "center",
      gap: 34,
    },
    modalTitle: {
      fontFamily: "inter-medium",
      fontSize: 18,
      color: StyleColors.onSurfacePrimary,
    },
    errorText: {
      fontFamily: "inter-regular",
      fontSize: 14,
      color: StyleColors.danger,
      marginTop: 4,
    },
    recommendText: {
      fontFamily: "inter-medium",
      fontSize: 14,
      color: StyleColors.primary,
    },
    resetModalContainer: {
      flex: 1,
      backgroundColor: "#0000004f",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 16,
    },
    resetModalInnerContainer: {
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      backgroundColor: StyleColors.onPrimary,
      paddingTop: 16,
      paddingBottom: 24,
      paddingHorizontal: 24,
      borderRadius: 10,
      gap: 22,
    },
    resetModalTextContainer: {
      justifyContent: "center",
      alignItems: "center",
      gap: 12,
    },
    resetModalTitle: {
      fontFamily: "inter-medium",
      fontSize: 18,
      color: StyleColors.onSurfacePrimary,
    },
    resetModalDescription: {
      fontFamily: "inter-regular",
      fontSize: 16,
      color: StyleColors.onSurfacePrimary,
    },
    resetButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 32,
      alignSelf: "flex-end",
    },
    resetButtonText: {
      fontFamily: "inter-medium",
      fontSize: 14,
      color: StyleColors.primary,
    },
  });
