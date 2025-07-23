import { Ionicons } from "@expo/vector-icons";
import { TextInput, View, StyleSheet, RootTagContext } from "react-native";
import { StyleColors } from "../../constants/colors";

function SearchField() {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={16}
          color={StyleColors.onSurfaceVariant}
        />
        <TextInput placeholder="Search for recipes" />
      </View>
    </View>
  );
}

export default SearchField;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 10,
    borderRadius: 15,
    backgroundColor: StyleColors.surfacePrimary,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
