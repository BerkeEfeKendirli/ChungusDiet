import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import TextButton from "../../components/buttons/TextButton";
import FloatingActionButton from "../../components/buttons/FloatingActionButton";
import { StyleColors } from "../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import WeightGoalStep from "./Steps/WeightGoalStep";
import GenderStep from "./Steps/GenderStep";
import ActivityLevelStep from "./Steps/ActivityLevelStep";
import HeightStep from "./Steps/HeightStep";
import WeightStep from "./Steps/WeightStep";
import TargetWeightStep from "./Steps/TargetWeightStep";
import AgeStep from "./Steps/AgeStep";
import { updateUserProfile } from "../../services/userService";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../config/firebaseConfig";

const { width } = Dimensions.get("window");

function ProfileSetupNavigatorScreen() {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(0);
  const [showValidationError, setShowValidationError] = useState(false);
  const [formData, setFormData] = useState({
    weightGoal: null,
    gender: null,
    activityLevel: null,
    height: null,
    weight: null,
    age: null,
    targetWeight: null,
  });

  const pages = [
    {
      title: "What is your goal?",
      subtitle: "We will calculate daily calories according to your goal",
      type: "weightGoal",
    },
    {
      title: "What is your gender?",
      subtitle: "Male bodies need more calories",
      type: "gender",
    },
    {
      title: "How active are you?",
      subtitle: "A sedentary person burns fewer calories than an active person",
      type: "activityLevel",
    },
    {
      title: "How tall are you?",
      subtitle: "The taller you are, the more calories your body needs",
      type: "height",
    },
    {
      title: "What is your weight?",
      subtitle: "The more you weigh, the more calories your body burns",
      type: "weight",
    },
    {
      title: "What's your target weight?",
      subtitle: "Set a realistic goal to track your progress",
      type: "targetWeight",
    },
    {
      title: "What is your age?",
      subtitle: "Required number of calories varies with age",
      type: "age",
    },
  ];

  const renderCurrentStep = () => {
    switch (pages[currentPage].type) {
      case "weightGoal":
        return <WeightGoalStep formData={formData} setFormData={setFormData} />;
      case "gender":
        return <GenderStep formData={formData} setFormData={setFormData} />;
      case "activityLevel":
        return (
          <ActivityLevelStep formData={formData} setFormData={setFormData} />
        );
      case "height":
        return <HeightStep formData={formData} setFormData={setFormData} />;
      case "weight":
        return <WeightStep formData={formData} setFormData={setFormData} />;
      case "targetWeight":
        return (
          <TargetWeightStep formData={formData} setFormData={setFormData} />
        );
      case "age":
        return <AgeStep formData={formData} setFormData={setFormData} />;
    }
  };

  const isCurrentStepValid = () => {
    const currentStepType = pages[currentPage].type;
    switch (currentStepType) {
      case "weightGoal":
        return formData.weightGoal !== null;
      case "gender":
        return formData.gender !== null;
      case "activityLevel":
        return formData.activityLevel !== null;
      case "height":
        return formData.height !== null;
      case "weight":
        return formData.weight !== null && formData.weight > 0;
      case "age":
        return formData.age !== null && formData.age >= 10;
      case "targetWeight":
        return formData.targetWeight !== null && formData.targetWeight > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!isCurrentStepValid()) {
      setShowValidationError(true);
      setTimeout(() => setShowValidationError(false), 3000);
      return;
    }

    setShowValidationError(false);

    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      handleFormSubmit();
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFormSubmit = async () => {
    const heightObj = formData.height || {
      total: null,
      meters: null,
      centimeters: null,
    };

    try {
      const profileData = {
        weightGoal: formData.weightGoal,
        gender: formData.gender,
        activityLevel: formData.activityLevel,
        height: formData.height.total,
        heightMeters: formData.height.meters,
        heightCentimeters: formData.height.centimeters,
        weight: formData.weight,
        age: formData.age,
        targetWeight: formData.targetWeight,
        isProfileComplete: false,
      };

      console.log("Saving profile data:", profileData);

      await updateUserProfile(auth.currentUser.uid, profileData, false);

      navigation.navigate("RecommendedCaloriesScreen", { formData });
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.rootContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{pages[currentPage].title}</Text>
          <Text style={styles.subtitle}>{pages[currentPage].subtitle}</Text>
        </View>
        <View style={styles.stepContainer}>
          {renderCurrentStep()}
          {showValidationError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                Please complete this step to continue
              </Text>
            </View>
          )}
        </View>
        <View style={styles.navigation}>
          {currentPage > 0 ? (
            <TextButton
              text="Back"
              style={styles.textButton}
              onPress={handleBack}
              disabled={currentPage === 0}
            />
          ) : (
            <TextButton />
          )}

          <FloatingActionButton icon="chevron-forward" onPress={handleNext} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default ProfileSetupNavigatorScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 36,
    paddingHorizontal: 35,
    gap: 10,
  },
  title: {
    fontFamily: "inter-medium",
    fontSize: 20,
    color: StyleColors.onBackground,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "inter-regular",
    fontSize: 16,
    color: StyleColors.onBackgroundVariant,
    textAlign: "center",
  },
  stepContainer: {
    width: width,
    paddingHorizontal: 24,
    gap: 8,
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontFamily: "inter-regular",
    fontSize: 16,
    color: StyleColors.danger,
    textAlign: "center",
  },
  navigation: {
    width: width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 40,
    paddingHorizontal: 24,
  },
  textButton: {
    fontFamily: "inter-regular",
    fontSize: 16,
    color: StyleColors.onBackgroundVariant,
  },
});
