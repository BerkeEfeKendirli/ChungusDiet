import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleColors } from "../../constants/colors";

function BottomBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          marginBottom: insets.bottom + 12,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const iconName =
          route.name === "Recipes"
            ? "book-outline"
            : route.name === "Diary"
            ? "pie-chart-outline"
            : "bar-chart-outline";

        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={() => navigation.navigate(route.name)}
            style={[styles.tab, isFocused && styles.activeTab]}
          >
            <View
              style={[
                styles.iconWrapper,
                isFocused && styles.activeIconWrapper,
              ]}
            >
              <Ionicons
                name={iconName}
                size={24}
                color={
                  isFocused ? StyleColors.onPrimary : StyleColors.navigationItem
                }
              />

              <Text style={[styles.label, isFocused && styles.activeLabel]}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: StyleColors.bottomBarContainer,
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginHorizontal: 12,
  },
  tab: {
    alignItems: "center",
    flex: 1,
  },
  activeTab: {
    marginTop: -15,
  },
  label: {
    fontFamily: "inter-regular",
    fontSize: 12,
    color: StyleColors.primary,
    marginTop: 2,
  },
  activeLabel: {
    color: StyleColors.onPrimary,
    fontWeight: "bold",
  },
  iconWrapper: {
    backgroundColor: "transparent",
    borderRadius: 27,
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  activeIconWrapper: {
    backgroundColor: StyleColors.primary,
    borderRadius: 27,
    height: 60,
    width: 60,
  },
});

export default BottomBar;
