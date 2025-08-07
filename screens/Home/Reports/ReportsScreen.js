import { Ionicons } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { getAuth } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import { DetailNutritionInput } from "../../../components/diary/DetailNutrition";
import ReportItem from "../../../components/reports/ReportItem";
import { useTheme } from "../../../context/ThemeContext";
import ProfileSvg from "../../../assets/images/svg/profile";
import TextButton from "./../../../components/buttons/TextButton";
import { useNavigation } from "@react-navigation/native";

function ReportsScreen({ userProfile }) {
  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);
  const auth = getAuth();
  const email = auth.currentUser?.email;

  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weight, setWeight] = useState("");
  const [weightData, setWeightData] = useState([]);
  const [initialWeight, setInitialWeight] = useState(null);
  const [initialDate, SetInitiaLDate] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [editDate, setEditDate] = useState(null);
  const pointTimeoutRef = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchInitialWeight = async () => {
      const db = getFirestore();
      const user = auth.currentUser;
      if (!user) return;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setInitialWeight(data.profile?.weight);
        SetInitiaLDate(data.createdAt ? data.createdAt.toDate() : new Date());
      }
    };
    fetchInitialWeight();
  }, []);

  useEffect(() => {
    if (initialWeight && initialDate) {
      setWeightData((prev) => {
        const filtered = prev.filter(
          (item) => item.date.getTime() !== initialDate.getTime()
        );
        return [
          {
            value: Number(initialWeight),
            label: getDateLabel(initialDate),
            date: initialDate,
          },
          ...filtered,
        ];
      });
    }
  }, [initialWeight, initialDate]);

  const fetchReports = async () => {
    const db = getFirestore();
    const user = auth.currentUser;
    if (!user) return;

    const q = collection(db, "users", user.uid, "reports");
    const querySnapshot = await getDocs(q);
    const reports = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      reports.push({
        value: data.kilo,
        date: new Date(doc.id),
      });
    });
    reports.sort((a, b) => b.date - a.date);
    setWeightData(reports);
  };

  useEffect(() => {
    fetchReports();
  }, [auth.currentUser]);

  const handleEdit = (item) => {
    setEditDate(item.date);
    setSelectedDate(item.date);
    setWeight(item.value.toString());
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!weight) return;
    const num = parseFloat(weight);
    if (isNaN(num)) return;

    const db = getFirestore();
    const user = auth.currentUser;
    if (!user) return;

    const isEdit = editDate !== null;
    const dateKey = (isEdit ? editDate : selectedDate)
      .toISOString()
      .split("T")[0];

    await setDoc(doc(db, "users", user.uid, "reports", dateKey), {
      kilo: num,
    });

    setModalVisible(false);
    setWeight("");
    setSelectedDate(new Date());
    setEditDate(null);

    fetchReports();
  };

  const handleDelete = async (item) => {
    const db = getFirestore();
    const user = auth.currentUser;
    if (!user) return;
    const dateKey = item.date.toISOString().split("T")[0];
    await deleteDoc(doc(db, "users", user.uid, "reports", dateKey));
    fetchReports();
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setWeight("");
    setSelectedDate(new Date());
    setEditDate(null);
  };

  const getDateLabel = (date) => {
    const today = new Date();
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    if (isToday) {
      return "Today";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "2-digit",
      });
    }
  };

  const formatWeightInput = (input) => {
    let value = input.replace(",", ".");
    value = value.replace(/[^0-9.]/g, "");
    const parts = value.split(".");

    let validValue;
    if (parts.length > 2) {
      validValue = parts[0] + "." + parts[1];
    } else if (parts.length === 2 && parts[1].length > 2) {
      validValue = parts[0] + "." + parts[1].substring(0, 2);
    } else {
      validValue = value;
    }

    const numValue = parseFloat(validValue);
    if (
      validValue === "" ||
      (!isNaN(numValue) && numValue > 0 && numValue <= 999)
    ) {
      return validValue;
    } else if (!isNaN(numValue) && numValue > 999) {
      return "999";
    }
    return "";
  };

  const sortedData = [...weightData].sort((a, b) => a.date - b.date);

  const chartData = {
    labels: sortedData.map((item) => getDateLabel(item.date)),
    datasets: [
      {
        data: sortedData.map((item) => item.value),
        color: () => StyleColors.primary, // opsiyonel: çizgi rengi
        strokeWidth: 2,
      },
    ],
  };

  const chartWidth = Math.max(
    Dimensions.get("window").width - 32,
    sortedData.length * 90 // Her veri için 40px genişlik
  );

  const profileImages = {
    default: <ProfileSvg size={45} />,
    pp1: require("../../../assets/images/png/pp1.png"),
    pp2: require("../../../assets/images/png/pp2.png"),
    pp3: require("../../../assets/images/png/pp3.png"),
    pp4: require("../../../assets/images/png/pp4.png"),
    pp5: require("../../../assets/images/png/pp5.png"),
    pp6: require("../../../assets/images/png/pp6.png"),
    pp7: require("../../../assets/images/png/pp7.png"),
    pp8: require("../../../assets/images/png/pp8.png"),
  };

  const profileImageKey = userProfile?.profileImage || "default";

  return (
    <SafeAreaView style={styles.rootContainer} edges={["top"]}>
      <View style={styles.userContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          {profileImageKey === "default" ? (
            <ProfileSvg size={45} />
          ) : (
            <Image
              source={profileImages[profileImageKey]}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.emailText}>{email}</Text>
      </View>
      <View style={styles.chartTitleContainer}>
        <Text style={styles.chartTitle}>Weight</Text>
      </View>
      <View style={[styles.chart]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          overScrollMode="never"
        >
          <View
            style={{
              width: chartWidth,
              backgroundColor: StyleColors.surfacePrimary,
              borderRadius: 10,
              paddingVertical: 12,
            }}
          >
            <LineChart
              data={chartData}
              width={chartWidth}
              height={207}
              chartConfig={{
                backgroundColor: StyleColors.surfacePrimary,
                backgroundGradientFrom: StyleColors.surfacePrimary,
                backgroundGradientTo: StyleColors.surfacePrimary,
                decimalPlaces: 1,
                color: () => StyleColors.primary,
                labelColor: () => StyleColors.onSurfacePrimary,
                propsForDots: {
                  r: "3",
                  strokeWidth: 3,
                  stroke: StyleColors.primary,
                  fill: StyleColors.primary,
                },
              }}
              withDots
              withShadow={false}
              withInnerLines={false}
              withOuterLines={false}
              style={{ borderRadius: 10 }}
              onDataPointClick={({ value, x, y, index }) => {
                setSelectedPoint({ value, x, y, index });
                if (pointTimeoutRef.current)
                  clearTimeout(pointTimeoutRef.current);

                pointTimeoutRef.current = setTimeout(() => {
                  setSelectedPoint(null);
                }, 3000);
              }}
            />
            {selectedPoint && (
              <View
                style={{
                  position: "absolute",
                  left: selectedPoint.x - 25,
                  top: selectedPoint.y + 15,
                  backgroundColor: StyleColors.surfacePrimary,
                  borderRadius: 8,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderWidth: 1,
                  borderColor: StyleColors.primary,
                  zIndex: 10,
                  minWidth: 50,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: StyleColors.primary, fontWeight: "bold" }}
                >
                  {selectedPoint.value} kg
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <View style={styles.addReportHeader}>
        <Text style={styles.chartTitle}>Results</Text>
        <Ionicons
          name="add"
          size={24}
          color={StyleColors.onBackground}
          onPress={() => setModalVisible(true)}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.reportsContainer}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        {weightData.map((item, idx) => (
          <ReportItem
            key={item.date.toString() + idx}
            date={getDateLabel(item.date)}
            weight={item.value}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item)}
          />
        ))}
      </ScrollView>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        statusBarTranslucent
        onRequestClose={handleCloseModal}
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={styles.modalInnerContainer}>
                <Text style={styles.modalText}>Add Record</Text>
                <View style={styles.modalInputs}>
                  <View style={styles.modalInputContainer}>
                    {Platform.OS === "android" ? (
                      <TouchableOpacity
                        style={styles.modalInput}
                        onPress={() => setShowDatePicker(true)}
                      >
                        <Text style={styles.dateButtonText}>
                          {getDateLabel(selectedDate)}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <RNDateTimePicker
                        value={selectedDate}
                        mode="date"
                        display="default"
                        maximumDate={new Date()}
                        onChange={(_, date) => {
                          setShowDatePicker(false);
                          if (date) setSelectedDate(date);
                        }}
                      />
                    )}

                    <Text style={styles.dateButtonTextSecondary}>
                      Select Date
                    </Text>
                  </View>
                  {showDatePicker && (
                    <RNDateTimePicker
                      value={selectedDate}
                      mode="date"
                      display="default"
                      maximumDate={new Date()}
                      onChange={(_, date) => {
                        setShowDatePicker(false);
                        if (date) setSelectedDate(date);
                      }}
                    />
                  )}
                  <DetailNutritionInput
                    value={weight}
                    onChangeText={(text) => setWeight(formatWeightInput(text))}
                    placeholder="80"
                    text="KG"
                    borderColor={StyleColors.primary}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <TextButton
                    text="Cancel"
                    style={styles.buttonText}
                    onPress={() => setModalVisible(false)}
                  />
                  <TextButton
                    text="Save"
                    style={styles.buttonText}
                    onPress={handleSave}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

export default ReportsScreen;

const getStyles = (StyleColors) =>
  StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: StyleColors.background,
      paddingHorizontal: 16,
    },
    userContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 9,
      paddingHorizontal: 8,
      marginTop: 10,
      marginBottom: 24,
    },
    emailText: {
      fontFamily: "inter-medium",
      fontSize: 18,
      color: StyleColors.onBackground,
    },
    chartTitleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    chartTitle: {
      fontFamily: "inter-semibold",
      fontSize: 12,
      color: StyleColors.onBackground,
    },
    chart: {
      marginBottom: 24,
    },
    addReportHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 18,
    },
    reportsContainer: {
      gap: 10,
      paddingBottom: 10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "#0000004f",
      paddingHorizontal: 24,
    },
    modalInnerContainer: {
      backgroundColor: StyleColors.background,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 16,
      padding: 24,
    },
    modalText: {
      fontFamily: "inter-medium",
      fontSize: 16,
      color: StyleColors.onBackground,
      marginBottom: 20,
    },
    modalInputs: {
      flexDirection: "row",
      alignItems: "center",
      gap: 50,
    },
    modalInputContainer: {
      alignItems: "center",
      gap: 4,
    },
    modalInput: {
      backgroundColor: StyleColors.primary,
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 8,
      minWidth: 110,
      alignItems: "center",
    },
    dateButtonText: {
      fontFamily: "inter-regular",
      fontSize: 16,
      color: StyleColors.background,
    },
    dateButtonTextSecondary: {
      fontFamily: "inter-regular",
      fontSize: 14,
      color: StyleColors.onBackground,
    },
    buttonContainer: {
      marginTop: 32,
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
