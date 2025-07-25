import { Ionicons } from "@expo/vector-icons";
import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { StyleColors } from "../../constants/colors";
import { useRef } from "react";

function SearchField({ value, onChangeText }) {
  const inputRef = useRef(null);

  return (
    <TouchableOpacity
      style={styles.rootContainer}
      activeOpacity={1}
      onPress={() => inputRef.current && inputRef.current.focus()}
    >
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={16}
          color={StyleColors.onSurfaceVariant}
        />
        <TextInput
          ref={inputRef}
          placeholder="Search for recipes"
          value={value}
          onChangeText={onChangeText}
          style={{ flex: 1 }}
        />
      </View>
    </TouchableOpacity>
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
