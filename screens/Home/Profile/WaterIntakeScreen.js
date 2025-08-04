import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import InfoItem from "../../../components/profile/InfoItem";
import { db } from "./../../../config/firebaseConfig";
import { Modal, TextInput, TouchableWithoutFeedback } from "react-native";
import Button from "./../../../components/buttons/Button";
import TextButton from "../../../components/buttons/TextButton";
import { useTheme } from "../../../context/ThemeContext";

const { width } = Dimensions.get("window");

function WaterIntakeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [water, setWater] = useState(0);
  const [waterStep, setWaterStep] = useState(100);
  const [recommendedWater, setRecommendedWater] = useState(2000);
  const [modalVisible, setModalVisible] = useState(false);
  const [resetModalVisible, setResetModalVisible] = useState(false);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);

  useEffect(() => {
    const fetchProfile = async () => {
      const auth = getAuth();
      const uid = auth.currentUser.uid;
      const userRef = doc(db, "users", uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const profile = docSnap.data().profile;
        setWater(profile.targetWater ?? 0);
        setWaterStep(profile.waterStep ?? 100);
        setRecommendedWater(profile.recWater ?? 2000);
      }
    };
    fetchProfile();
  }, []);

  const MAX_WATER = 10000; // 10 Litre
  const MAX_STEP = 1000; // 1 Litre

  // Sadece tam sayı ve nokta/virgül silme
  const handleNumberInput = (text) => {
    let cleaned = text.replace(/[.,]/g, "").replace(/[^0-9]/g, "");
    if (editField === "water" && Number(cleaned) > MAX_WATER)
      cleaned = MAX_WATER.toString();
    if (editField === "step" && Number(cleaned) > MAX_STEP)
      cleaned = MAX_STEP.toString();
    setEditValue(cleaned);
  };

  const handleResetToDefault = () => {
    setWater(recommendedWater);
    setWaterStep(100);
    setResetModalVisible(false);
  };

  const handleSaveButton = async () => {
    try {
      const auth = getAuth();
      const uid = auth.currentUser.uid;
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        "profile.targetWater": Number(water),
        "profile.waterStep": Number(waterStep),
      });
      setSaveModalVisible(false);
      navigation.goBack();
    } catch (err) {
      console.error("Failed to save water settings:", err);
    }
  };

  return (
    <View
      style={[
        styles.rootContainer,
        {
          paddingBottom: insets.bottom,
          paddingTop: insets.top + 12,
          position: "relative",
        },
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
            <Text style={styles.headerText}>Water Intake</Text>
          </View>
          <Ionicons name="chevron-back" size={24} style={{ opacity: 0 }} />
        </View>
        <View style={styles.infoContainer}>
          <InfoItem
            infoText="Water"
            info={water}
            infoSecondary="mL"
            onPress={() => {
              setEditField("water");
              setEditValue(water.toString());
              setModalVisible(true);
            }}
          />
          <InfoItem
            infoText="Amount per Tap"
            info={waterStep}
            infoSecondary="mL"
            onPress={() => {
              setEditField("step");
              setEditValue(waterStep.toString());
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
      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" && "padding"}
                style={{ width: "100%" }}
              >
                <View style={styles.modalInnerContainer}>
                  <Text style={styles.modalTitle}>
                    {editField === "water"
                      ? "Edit Daily Water Target"
                      : "Edit Amount Per Tap"}
                  </Text>
                  <View style={{ alignItems: "center" }}>
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
                      placeholder={
                        editField === "water" ? "e.g. 2500" : "e.g. 100"
                      }
                      maxLength={5}
                    />
                    {showWarning &&
                      (!editValue || isNaN(Number(editValue))) && (
                        <Text style={styles.errorText}>
                          Please enter a valid number.
                        </Text>
                      )}
                  </View>
                  <Button
                    text="Done"
                    style={styles.button}
                    textColor={StyleColors.onPrimary}
                    onPress={() => {
                      if (!editValue || isNaN(Number(editValue))) {
                        setShowWarning(true);
                        setTimeout(() => setShowWarning(false), 3000);
                        return;
                      }
                      if (editField === "water") setWater(Number(editValue));
                      if (editField === "step") setWaterStep(Number(editValue));
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

export default WaterIntakeScreen;

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
    infoContainer: {
      width: width,
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
      color: StyleColors.onBackground,
      marginBottom: 12,
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
    errorText: {
      color: StyleColors.danger,
      fontFamily: "inter-regular",
      fontSize: 14,
      marginBottom: 12,
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
    errorText: {
      fontFamily: "inter-regular",
      fontSize: 14,
      color: StyleColors.danger,
      marginTop: 4,
    },
  });
