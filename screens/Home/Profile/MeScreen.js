import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Animated,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../../components/buttons/Button";
import MeInfoItem from "../../../components/profile/MeInfoItem";
import { StyleColors } from "../../../constants/colors";
import ActivityLevelStep from "../../ProfileSetup/Steps/ActivityLevelStep";
import AgeStep from "../../ProfileSetup/Steps/AgeStep";
import GenderStep from "../../ProfileSetup/Steps/GenderStep";
import HeightStep from "../../ProfileSetup/Steps/HeightStep";
import WeightGoalStep from "../../ProfileSetup/Steps/WeightGoalStep";
import WeightStep from "../../ProfileSetup/Steps/WeightStep";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

function MeScreen({ userProfile }) {
  const insets = useSafeAreaInsets();
  const profile = userProfile?.profile;
  const [modalVisible, setModalVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(null);
  const [formData, setFormData] = useState(profile);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [isClosing, setIsClosing] = useState(false);

  const goal = formData?.weightGoal;
  const age = formData?.age;
  const height = formData?.height?.total * 100;
  const weight = formData?.weight;
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
          />
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={styles.headerText}>Me</Text>
          </View>
          <Ionicons name="chevron-back" size={24} style={{ opacity: 0 }} />
        </View>
        <View style={styles.infoContainer}>
          <MeInfoItem
            infoText="Goal"
            info={goal}
            infoSecondary="weight"
            onPress={() => handleInfoItemPress("weightGoal")}
          />
          <MeInfoItem
            infoText="Age"
            info={age}
            infoSecondary="years"
            onPress={() => handleInfoItemPress("age")}
          />
          <MeInfoItem
            infoText="Height"
            info={height}
            infoSecondary="cm"
            onPress={() => handleInfoItemPress("height")}
          />
          <MeInfoItem
            infoText="Weight"
            info={weight}
            infoSecondary="kg"
            onPress={() => handleInfoItemPress("weight")}
          />
          <MeInfoItem
            infoText="Gender"
            info={gender}
            onPress={() => handleInfoItemPress("gender")}
          />
          <MeInfoItem
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
              <TouchableWithoutFeedback onPress={() => {}}>
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
    </View>
  );
}

export default MeScreen;

const styles = StyleSheet.create({
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
    backgroundColor: "white",
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
});
