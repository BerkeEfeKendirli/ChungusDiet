import { useNavigation } from "@react-navigation/native";
import { Dimensions, View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/buttons/Button";
import { StyleColors } from "../../constants/colors";
import { updateUserProfile } from "../../services/userService";
import { auth } from "../../config/firebaseConfig";

const { width } = Dimensions.get("window");

function RecommendedCaloriesScreen({ route }) {
  const navigation = useNavigation();
  const { formData } = route.params;

  const calculateRecommendedCalories = () => {
    const { weight, height, age, gender, activityLevel, weightGoal } = formData;
    let bmr;
    const heightInCm = height.total * 100;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * heightInCm + 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * heightInCm + 5 * age - 161;
    }

    const activityMultipliers = {
      sedentary: 1.2,
      low: 1.375,
      active: 1.55,
      veryactive: 1.725,
    };

    const tdee = bmr * activityMultipliers[activityLevel];
    let targetCalories;
    if (weightGoal === "lose") {
      targetCalories = tdee - 500;
    } else if (weightGoal === "gain") {
      targetCalories = tdee + 500;
    } else {
      targetCalories = tdee;
    }
    return Math.round(targetCalories);
  };

  const recommendedCalories = calculateRecommendedCalories();

  const calculatePFC = (calories, weightGoal) => {
    let proteinRatio, fatRatio, carbRatio;
    if (weightGoal === "lose") {
      proteinRatio = 0.3;
      fatRatio = 0.3;
      carbRatio = 0.4;
    } else if (weightGoal === "gain") {
      proteinRatio = 0.2;
      fatRatio = 0.25;
      carbRatio = 0.55;
    } else {
      proteinRatio = 0.2;
      fatRatio = 0.3;
      carbRatio = 0.5;
    }

    const proteinGrams = Math.round((calories * proteinRatio) / 4);
    const fatGrams = Math.round((calories * fatRatio) / 9);
    const carbGrams = Math.round((calories * carbRatio) / 4);

    return {
      protein: proteinGrams,
      fats: fatGrams,
      carbs: carbGrams,
    };
  };

  const recommendedPFC = calculatePFC(recommendedCalories, formData.weightGoal);

  const recommendedWater = formData.weight * 33;

  const handleStart = async () => {
    try {
      const profileData = {
        ...formData,
        recCalories: recommendedCalories,
        recProtein: recommendedPFC.protein,
        recFat: recommendedPFC.fats,
        recCarbs: recommendedPFC.carbs,
        recWater: recommendedWater,
        targetCalories: recommendedCalories,
        targetProtein: recommendedPFC.protein,
        targetFat: recommendedPFC.fats,
        targetCarbs: recommendedPFC.carbs,
        targetWater: recommendedWater,
      };
      await updateUserProfile(auth.currentUser.uid, profileData, true);
    } catch (error) {
      console.error("Failed to complete profile:", error);
    }
  };

  const getGoalText = () => {
    switch (formData.weightGoal) {
      case "lose":
        return "to lose weight";
      case "gain":
        return "to gain weight";
      case "maintain":
        return "to maintain weight";
      default:
        return "";
    }
  };

  const formatHeight = () => {
    return `${Math.round(formData.height.total * 100)} cm`;
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Daily Goal</Text>
        <Text style={styles.subtitle}>
          Based on your profile, here's your recommended daily calorie intake
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.calorieCounter}>
          <Text style={styles.calorieNumber}>{recommendedCalories}</Text>
          <Text style={styles.calorieUnit}>calories/day</Text>
          <Text style={styles.goalText}>{getGoalText()}</Text>
        </View>
        <View style={styles.pfcContainer}>
          <View style={styles.pfcCover}>
            <Text style={[styles.pfcText, { color: StyleColors.red }]}>
              {recommendedPFC.protein}g
            </Text>
            <Text style={[styles.pfcType, { color: StyleColors.red }]}>
              {" "}
              protein
            </Text>
          </View>
          <View style={styles.pfcCover}>
            <Text style={[styles.pfcText, { color: StyleColors.orange }]}>
              {recommendedPFC.fats}g
            </Text>
            <Text style={[styles.pfcType, { color: StyleColors.orange }]}>
              {" "}
              fats
            </Text>
          </View>
          <View style={styles.pfcCover}>
            <Text style={[styles.pfcText, { color: StyleColors.lightGreen }]}>
              {recommendedPFC.carbs}g
            </Text>
            <Text style={[styles.pfcType, { color: StyleColors.lightGreen }]}>
              {" "}
              carbs
            </Text>
          </View>
        </View>
        <View style={styles.waterContainer}>
          <Text style={styles.waterMlText}>{recommendedWater}mL </Text>
          <Text style={styles.waterText}>water</Text>
        </View>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Gender:</Text>
            <Text style={styles.summaryValue}>{formData.gender}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Age:</Text>
            <Text style={styles.summaryValue}>{formData.age} years</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Height:</Text>
            <Text style={styles.summaryValue}>{formatHeight()}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Weight:</Text>
            <Text style={styles.summaryValue}>{formData.weight} kg</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Target:</Text>
            <Text style={styles.summaryValue}>{formData.targetWeight} kg</Text>
          </View>
        </View>
      </View>
      <Button
        text="Start"
        onPress={handleStart}
        style={styles.button}
        textColor={StyleColors.background}
      />
    </SafeAreaView>
  );
}

export default RecommendedCaloriesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  header: {
    marginTop: 36,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontFamily: "inter-medium",
    fontSize: 36,
    color: StyleColors.onBackground,
  },
  subtitle: {
    fontFamily: "inter-regular",
    fontSize: 16,
    textAlign: "center",
    color: StyleColors.onBackgroundVariant,
  },
  content: {
    gap: 20,
  },
  calorieCounter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  calorieNumber: {
    fontFamily: "inter-semibold",
    fontSize: 42,
    color: StyleColors.primary,
  },
  calorieUnit: {
    fontFamily: "inter-regular",
    fontSize: 20,
    color: StyleColors.primary,
  },
  goalText: {
    fontFamily: "inter-regular",
    fontSize: 18,
    color: StyleColors.onBackground,
  },
  summaryContainer: {
    alignSelf: "center",
    marginHorizontal: "auto",
    gap: 10,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  summaryLabel: {
    fontFamily: "inter-medium",
    fontSize: 20,
  },
  summaryValue: {
    fontFamily: "inter-regular",
    fontSize: 16,
    textTransform: "uppercase",
  },
  button: {
    backgroundColor: StyleColors.primary,
    marginBottom: 50,
  },
  pfcContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  pfcCover: {
    flexDirection: "row",
    alignItems: "center",
  },
  pfcText: {
    fontFamily: "inter-semibold",
    fontSize: 16,
  },
  pfcType: {
    fontFamily: "inter-regular",
    fontSize: 12,
  },
  waterContainer: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  waterMlText: {
    fontFamily: "inter-semibold",
    fontSize: 16,
    color: StyleColors.blueGradientEnd,
  },
  waterText: {
    fontFamily: "inter-regular",
    fontSize: 12,
    color: StyleColors.blueGradientEnd,
  },
});
