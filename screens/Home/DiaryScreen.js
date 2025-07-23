import { Ionicons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NutrientsIndicator from "../../components/diary/NutrientsIndicator";
import WaterIntake from "../../components/diary/WaterIntake";
import { StyleColors } from "../../constants/colors";
import Meal from "../../components/diary/Meal";

function DiaryScreen({ navigation }) {
  const auth = getAuth();
  const email = auth.currentUser?.email;

  return (
    <SafeAreaView style={styles.rootContainer} edges={["top"]}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        <View style={styles.headerContainer}>
          <View style={styles.userContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Ionicons
                name="person-circle-outline"
                size={40}
                color={StyleColors.onBackgroundVariant}
              />
            </TouchableOpacity>
            <Text style={styles.emailText}>{email}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>Today</Text>
            <Ionicons
              name="calendar-outline"
              size={24}
              color={StyleColors.primary}
            />
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.indicatorContainer}>
            <Text style={styles.title}>Nutrients Indicator</Text>
            <NutrientsIndicator />
          </View>
          <View style={styles.indicatorContainer}>
            <Text style={styles.title}>Water Intake</Text>
            <WaterIntake percentage={69} />
          </View>
          <View style={styles.indicatorContainer}>
            <View style={styles.mealTitle}>
              <Text style={styles.title}>Meals</Text>
              <Ionicons name="add" size={24} />
            </View>
            <View style={{ gap: 12 }}>
              <Meal />
              <Meal />
              <Meal />
              <Meal />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DiaryScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: StyleColors.background,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 36,
    marginTop: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  emailText: {
    fontFamily: "inter-medium",
    fontSize: 18,
    color: StyleColors.onBackground,
  },
  dateText: {
    fontFamily: "inter-regular",
    fontSize: 14,
    color: StyleColors.onBackground,
  },
  content: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 20,
  },
  title: {
    fontFamily: "inter-semibold",
    fontSize: 12,
  },
  indicatorContainer: {
    width: "100%",
    gap: 10,
  },
  mealTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
