import { Ionicons } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Meal from "../../../components/diary/Meal";
import NutrientsIndicator from "../../../components/diary/NutrientsIndicator";
import WaterIntake from "../../../components/diary/WaterIntake";
import { StyleColors } from "../../../constants/colors";

function DiaryScreen({ navigation, route }) {
  const auth = getAuth();
  const email = auth.currentUser?.email;
  const [allMeals, setAllMeals] = useState([]);
  const [targets, setTargets] = useState({
    proteins: 0,
    fats: 0,
    carbs: 0,
    calories: 0,
    water: 0,
  });
  const totalProteins = allMeals.reduce((sum, m) => sum + (m.proteins || 0), 0);
  const totalFats = allMeals.reduce((sum, m) => sum + (m.fats || 0), 0);
  const totalCarbs = allMeals.reduce((sum, m) => sum + (m.carbs || 0), 0);
  const totalCalories = allMeals.reduce((sum, m) => sum + (m.calories || 0), 0);
  const [waterAmount, setWaterAmount] = useState(0);
  const [waterTime, setWaterTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [hasUserChanged, setHasUserChanged] = useState(false);

  useEffect(() => {
    const fetchTargets = async () => {
      try {
        const db = getFirestore();
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const profile = data.profile || {};

          setTargets({
            proteins: profile.targetProtein || 0,
            fats: profile.targetFat || 0,
            carbs: profile.targetCarbs || 0,
            calories: profile.targetCalories || 0,
            water: profile.targetWater || 0,
          });
        }
      } catch (e) {}
    };
    fetchTargets();
  }, []);

  const handleAddWater = () => {
    setWaterAmount((prev) => prev + 100);
    const now = new Date();
    setWaterTime(
      now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );
    setHasUserChanged(true);
  };

  const handleRemoveWater = () => {
    setWaterAmount((prev) => Math.max(0, prev - 100));
    const now = new Date();
    setWaterTime(
      now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );
    setHasUserChanged(true);
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (date) setSelectedDate(date);
    if (Platform.OS === "android") setShowDatePicker(false);
  };

  const formatDisplayDate = (date) => {
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const saveDiaryData = async (userId, date, meals, waterAmount, waterTime) => {
    const db = getFirestore();
    const dateKey = date.toISOString().split("T")[0];
    await setDoc(
      doc(db, "users", userId, "diary", dateKey),
      {
        meals,
        waterAmount,
        waterTime,
      },
      { merge: true }
    );
  };

  const fetchDiaryData = async (userId, date) => {
    const db = getFirestore();
    const dateKey = date.toISOString().split("T")[0];
    const docRef = doc(db, "users", userId, "diary", dateKey);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setAllMeals(data.meals || []);
      setWaterAmount(data.waterAmount || 0);
      setWaterTime(data.waterTime || null);
    } else {
      setAllMeals([]);
      setWaterAmount(0);
      setWaterTime(null);
    }
  };

  useEffect(() => {
    if (
      route.params?.allMeals &&
      route.params?.fromNewMeal &&
      route.params?.date
    ) {
      const paramDate = new Date(route.params.date);
      if (paramDate.toDateString() === selectedDate.toDateString()) {
        setAllMeals(route.params.allMeals);
        setHasUserChanged(true);
        saveDiaryData(
          auth.currentUser.uid,
          selectedDate,
          route.params.allMeals,
          waterAmount,
          waterTime
        ).then(() => {
          setHasUserChanged(false);
        });
        navigation.setParams({
          allMeals: undefined,
          fromNewMeal: undefined,
          date: undefined,
        });
      }
    }
  }, [route.params, selectedDate]);

  useEffect(() => {
    if (
      !auth.currentUser ||
      (route.params?.fromNewMeal && route.params?.date)
    ) {
      return;
    }
    setIsDataLoaded(false);
    fetchDiaryData(auth.currentUser.uid, selectedDate).then(() => {
      setIsDataLoaded(true);
      setHasUserChanged(false);
    });
  }, [selectedDate]);

  useEffect(() => {
    if (!auth.currentUser || !isDataLoaded || !hasUserChanged) return;
    saveDiaryData(
      auth.currentUser.uid,
      selectedDate,
      allMeals,
      waterAmount,
      waterTime
    );
    setHasUserChanged(false);
  }, [
    selectedDate,
    allMeals,
    waterAmount,
    waterTime,
    isDataLoaded,
    hasUserChanged,
  ]);

  useEffect(() => {
    if (route.params?.date) {
      const paramDate = new Date(route.params.date);
      if (selectedDate.toDateString() !== paramDate.toDateString()) {
        setSelectedDate(paramDate);
      }
    }
  }, [route.params?.date]);

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
            <Text style={styles.dateText}>
              {formatDisplayDate(selectedDate)}
            </Text>
            <Ionicons
              name="calendar-outline"
              size={24}
              color={StyleColors.primary}
              onPress={() => setShowDatePicker(true)}
            />
          </View>
          {showDatePicker && Platform.OS === "ios" && (
            <Modal
              transparent
              animationType="slide"
              visible={showDatePicker}
              onRequestClose={() => setShowDatePicker(false)}
            >
              <View style={styles.modalOverlay}>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  activeOpacity={1}
                  onPress={() => setShowDatePicker(false)}
                />
                <View style={styles.pickerContainer}>
                  <RNDateTimePicker
                    value={selectedDate}
                    onChange={handleDateChange}
                    maximumDate={new Date()}
                    display="default"
                    mode="date"
                    style={{ marginLeft: -16 }}
                  />
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setShowDatePicker(false)}
                  >
                    <Text style={styles.datePickerText}>Select</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}

          {showDatePicker && Platform.OS === "android" && (
            <RNDateTimePicker
              value={selectedDate}
              onChange={handleDateChange}
              maximumDate={new Date()}
              display="default"
              mode="date"
            />
          )}
        </View>
        <View style={styles.content}>
          <View style={styles.indicatorContainer}>
            <Text style={styles.title}>Nutrients Indicator</Text>
            <NutrientsIndicator
              proteins={{
                completed: totalProteins,
                total: targets.proteins,
              }}
              fats={{
                completed: totalFats,
                total: targets.fats,
              }}
              carbs={{
                completed: totalCarbs,
                total: targets.carbs,
              }}
              calories={{
                completed: totalCalories,
                total: targets.calories,
              }}
            />
          </View>
          <View style={styles.indicatorContainer}>
            <Text style={styles.title}>Water Intake</Text>
            <WaterIntake
              percentage={
                targets.water > 0
                  ? Math.round(
                      Math.min((waterAmount / targets.water) * 100, 100)
                    )
                  : 0
              }
              total={(targets.water / 1000).toFixed(1)}
              time={waterTime}
              completed={waterAmount / 1000}
              onAdd={handleAddWater}
              onRemove={handleRemoveWater}
            />
          </View>
          <View style={styles.indicatorContainer}>
            <View style={styles.mealTitle}>
              <Text style={styles.title}>Meals</Text>
              <Ionicons
                name="add"
                size={24}
                onPress={() =>
                  navigation.replace("NewMeal", {
                    mealNumber: allMeals.length + 1,
                    allMeals,
                    date: selectedDate.toISOString(),
                    fromNewMeal: true,
                  })
                }
              />
            </View>
            <View style={{ gap: 12 }}>
              {allMeals.map((meal, idx) => (
                <Meal
                  key={idx}
                  calorie={meal.calories}
                  title={meal.mealTitle || `Meal #${idx + 1}`}
                  time={meal.mealTime}
                  proteins={meal.proteins}
                  fats={meal.fats}
                  carbs={meal.carbs}
                />
              ))}
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
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  pickerContainer: {
    backgroundColor: StyleColors.surfacePrimary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    marginTop: 12,
    alignSelf: "center",
  },
  datePickerText: {
    fontFamily: "inter-regular",
    fontSize: 16,
    color: StyleColors.primary,
  },
});
