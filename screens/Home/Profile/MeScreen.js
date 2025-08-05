import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../../components/buttons/Button";
import TextButton from "../../../components/buttons/TextButton";
import InfoItem from "../../../components/profile/InfoItem";
import ActivityLevelStep from "../../ProfileSetup/Steps/ActivityLevelStep";
import AgeStep from "../../ProfileSetup/Steps/AgeStep";
import GenderStep from "../../ProfileSetup/Steps/GenderStep";
import HeightStep from "../../ProfileSetup/Steps/HeightStep";
import WeightGoalStep from "../../ProfileSetup/Steps/WeightGoalStep";
import WeightStep from "../../ProfileSetup/Steps/WeightStep";
import { db } from "../../../config/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import TargetWeightStep from "../../ProfileSetup/Steps/TargetWeightStep";
import { useTheme } from "../../../context/ThemeContext";

const { width } = Dimensions.get("window");

function MeScreen({ userProfile }) {
  const insets = useSafeAreaInsets();
  const profile = userProfile?.profile;
  const [modalVisible, setModalVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(null);
  const [formData, setFormData] = useState(profile);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [isClosing, setIsClosing] = useState(false);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [updateEnabled, setUpdateEnabled] = useState(false);

  const goal = formData?.weightGoal;
  const age = formData?.age;
  const height = formData?.height?.total * 100;
  const weight = formData?.weight;
  const targetWeight = formData?.targetWeight;
  const gender = formData?.gender;
  const lifestyle = formData?.activityLevel;
  const navigation = useNavigation();

  function renderStep() {
    switch (activeStep) {
      case "weightGoal":
        return <WeightGoalStep formData={formData} setFormData={setFormData} />;
      case "age":
        return <AgeStep formData={formData} setFormData={setFormData} />;
      case "height":
        return <HeightStep formData={formData} setFormData={setFormData} />;
      case "weight":
        return <WeightStep formData={formData} setFormData={setFormData} />;
      case "gender":
        return <GenderStep formData={formData} setFormData={setFormData} />;
      case "activityLevel":
        return (
          <ActivityLevelStep formData={formData} setFormData={setFormData} />
        );
      case "targetWeight":
        return (
          <TargetWeightStep formData={formData} setFormData={setFormData} />
        );
      default:
        return null;
    }
  }

  const handleInfoItemPress = (step) => {
    setActiveStep(step);
    setModalVisible(true);
  };

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  // Kapatma fonksiyonu
  function closeHeightStep() {
    setIsClosing(true);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setActiveStep(null);
      setIsClosing(false);
    });
  }

  // Açılış animasyonu
  useEffect(() => {
    if (
      Platform.OS === "ios" &&
      activeStep === "height" &&
      modalVisible &&
      !isClosing
    ) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else if (!modalVisible) {
      fadeAnim.setValue(0);
    }
  }, [activeStep, modalVisible, isClosing]);

  function formatActivityLevel(level) {
    if (!level) return "";
    switch (level) {
      case "veryactive":
        return "Very Active";
      case "active":
        return "Active";
      case "low":
        return "Low Active";
      case "sedentary":
        return "Sedentary";
      default:
        return level
          .replace(/([a-z])([A-Z])/g, "$1 $2")
          .replace(/^./, (s) => s.toUpperCase());
    }
  }

  const handleSaveProfile = async () => {
    try {
      const userRef = doc(db, "users", userProfile.uid);
      const { calories, water, protein, fat, carbs } =
        calculateDailyNutrients(formData);

      await updateDoc(userRef, {
        profile: {
          ...formData,
          recCalories: calories,
          recWater: water,
          recProtein: protein,
          recFat: fat,
          recCarbs: carbs,
        },
      });

      if (updateEnabled) {
        await updateDoc(userRef, {
          "profile.targetCalories": calories,
          "profile.targetWater": water,
          "profile.targetProtein": protein,
          "profile.targetFat": fat,
          "profile.targetCarbs": carbs,
        });
      }

      setSaveModalVisible(false);
      navigation.goBack();
    } catch (err) {
      console.error("Profile couldn't updated:", err);
    }
  };

  const calculateDailyNutrients = (formData) => {
    const weight = formData?.weight; // kg
    const height = formData?.height?.total * 100; // cm
    const age = formData?.age;
    const gender = formData?.gender;
    const activityLevel = formData?.activityLevel;
    const weightGoal = formData?.weightGoal;

    let bmr = 0;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const activityMultipliers = {
      sedentary: 1.2,
      low: 1.375,
      active: 1.55,
      veryactive: 1.725,
    };
    const multiplier = activityMultipliers[activityLevel] || 1.2;
    let tdee = bmr * multiplier;

    let calories = tdee;
    if (weightGoal === "lose") {
      calories -= 500;
    } else if (weightGoal === "gain") {
      calories += 500;
    }
    calories = Math.round(calories);

    let proteinRatio = 0.2,
      fatRatio = 0.3,
      carbRatio = 0.5;
    if (weightGoal === "lose") {
      proteinRatio = 0.3;
      fatRatio = 0.3;
      carbRatio = 0.4;
    } else if (weightGoal === "gain") {
      proteinRatio = 0.2;
      fatRatio = 0.25;
      carbRatio = 0.55;
    }

    const protein = Math.round((calories * proteinRatio) / 4);
    const fat = Math.round((calories * fatRatio) / 9);
    const carbs = Math.round((calories * carbRatio) / 4);

    const water = Math.round(weight * 33);

    return {
      calories,
      water,
      protein,
      fat,
      carbs,
    };
  };

  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);

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
            <Text style={styles.headerText}>Me</Text>
          </View>
          <Ionicons name="chevron-back" size={24} style={{ opacity: 0 }} />
        </View>
        <View style={styles.infoContainer}>
          <InfoItem
            infoText="Goal"
            info={goal}
            infoSecondary="weight"
            onPress={() => handleInfoItemPress("weightGoal")}
          />
          <InfoItem
            infoText="Age"
            info={age}
            infoSecondary="years"
            onPress={() => handleInfoItemPress("age")}
          />
          <InfoItem
            infoText="Height"
            info={height}
            infoSecondary="cm"
            onPress={() => handleInfoItemPress("height")}
          />
          <InfoItem
            infoText="Initial Weight"
            info={weight}
            infoSecondary="kg"
            onPress={() => handleInfoItemPress("weight")}
          />
          <InfoItem
            infoText="Target Weight"
            info={targetWeight}
            infoSecondary="kg"
            onPress={() => handleInfoItemPress("targetWeight")}
          />
          <InfoItem
            infoText="Gender"
            info={gender}
            onPress={() => handleInfoItemPress("gender")}
          />
          <InfoItem
            infoText="Lifestyle"
            info={formatActivityLevel(lifestyle)}
            onPress={() => handleInfoItemPress("activityLevel")}
          />
        </View>
      </View>
      <Button
        text="Save"
        textColor={StyleColors.onPrimary}
        style={styles.button}
        onPress={() => setSaveModalVisible(true)}
      />

      {activeStep === "height" && modalVisible ? (
        Platform.OS === "ios" ? (
          <TouchableWithoutFeedback onPress={closeHeightStep}>
            <Animated.View
              style={[styles.heightStepContainer, { opacity: fadeAnim }]}
            >
              <TouchableWithoutFeedback onPress={() => {}}>
                <View style={styles.heightStepInnerContainer}>
                  <HeightStep formData={formData} setFormData={setFormData} />
                  <Button
                    text="Done"
                    onPress={closeHeightStep}
                    style={styles.button}
                    textColor={StyleColors.onPrimary}
                  />
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </TouchableWithoutFeedback>
        ) : (
          <Modal
            visible={modalVisible}
            animationType="fade"
            transparent
            onRequestClose={() => setModalVisible(false)}
            statusBarTranslucent
          >
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss();
                setModalVisible(false);
              }}
            >
              <View style={styles.modalContainer}>
                <TouchableWithoutFeedback onPress={() => {}}>
                  <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ width: "100%" }}
                  >
                    <View style={styles.modalInnerContainer}>
                      <HeightStep
                        formData={formData}
                        setFormData={setFormData}
                      />
                      <Button
                        text="Done"
                        onPress={() => setModalVisible(false)}
                        style={styles.button}
                        textColor={StyleColors.onPrimary}
                      />
                    </View>
                  </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )
      ) : (
        <Modal
          visible={modalVisible}
          animationType="fade"
          transparent
          onRequestClose={() => setModalVisible(false)}
          statusBarTranslucent
        >
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
              setModalVisible(false);
            }}
          >
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={{ width: "100%" }}
                >
                  <View style={styles.modalInnerContainer}>
                    {renderStep()}
                    <Button
                      text="Done"
                      onPress={() => setModalVisible(false)}
                      style={styles.button}
                      textColor={StyleColors.onPrimary}
                    />
                  </View>
                </KeyboardAvoidingView>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
      <Modal
        visible={saveModalVisible}
        statusBarTranslucent
        transparent
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={() => setSaveModalVisible(false)}>
          <View style={styles.saveModalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.saveModalInnerContainer}>
                <Text style={styles.saveModalTitle}>Save</Text>
                <TouchableOpacity
                  style={styles.checkButtonContainer}
                  onPress={() => {
                    setUpdateEnabled((prev) => !prev);
                  }}
                >
                  <Ionicons
                    name={updateEnabled ? "checkbox-outline" : "square-outline"}
                    size={20}
                    color={StyleColors.primary}
                  />
                  <Text style={styles.checkButtonText}>
                    Update daily nutrients
                  </Text>
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                  <TextButton
                    text="Cancel"
                    style={styles.buttonText}
                    onPress={() => setSaveModalVisible(false)}
                  />
                  <TextButton
                    text="OK"
                    style={styles.buttonText}
                    onPress={handleSaveProfile}
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

export default MeScreen;

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
    button: {
      width: "100%",
      backgroundColor: StyleColors.primary,
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
    },
    heightStepContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "#0000004f",
      justifyContent: "flex-end",
      zIndex: 9999,
    },
    heightStepInnerContainer: {
      backgroundColor: StyleColors.background,
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
      padding: 24,
    },
    saveModalContainer: {
      flex: 1,
      backgroundColor: "#0000004f",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 16,
    },
    saveModalInnerContainer: {
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      backgroundColor: StyleColors.onPrimary,
      paddingTop: 16,
      paddingBottom: 24,
      paddingHorizontal: 24,
      borderRadius: 10,
      gap: 44,
    },
    checkButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    saveModalTitle: {
      fontFamily: "inter-medium",
      fontSize: 18,
      color: StyleColors.onSurfacePrimary,
    },
    checkButtonText: {
      fontFamily: "inter-regular",
      fontSize: 16,
      color: StyleColors.onSurfacePrimary,
    },
    buttonContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 32,
      alignSelf: "flex-end",
    },
    buttonText: {
      fontFamily: "inter-medium",
      fontSize: 14,
      color: StyleColors.primary,
    },
  });
