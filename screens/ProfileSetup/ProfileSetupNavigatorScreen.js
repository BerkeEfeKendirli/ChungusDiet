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

const { width } = Dimensions.get("window");

function ProfileSetupNavigatorScreen() {
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState({
    weightGoal: null,
    gender: null,
    activityLevel: null,
    height: null,
    weight: null,
    age: null,
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
      title: "What is your age?",
      subtitle: "Required number of calories varies with age",
      type: "age",
    },
    {
      title: "What's your target weight?",
      subtitle: "Set a realistic goal to track your progress",
      type: "targetWeight",
    },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.rootContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{pages[currentPage].title}</Text>
          <Text style={styles.subtitle}>{pages[currentPage].subtitle}</Text>
        </View>
        <View style={styles.stepContainer}>
          <AgeStep formData={formData} setFormData={setFormData} />
        </View>
        <View style={styles.navigation}>
          <TextButton text="Back" style={styles.textButton} />
          <FloatingActionButton icon="chevron-forward" />
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
