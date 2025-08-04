import { Ionicons } from "@expo/vector-icons";
import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRef } from "react";
import { useTheme } from "../../context/ThemeContext";

function SearchField({
  value,
  onChangeText,
  placeholder = "",
  onSubmitEditing,
}) {
  const inputRef = useRef(null);

  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);
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
          placeholder={placeholder}
          placeholderTextColor={StyleColors.onSurfaceVariant}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          style={{ flex: 1, color: StyleColors.onBackground }}
        />
        {value?.length > 0 && (
          <TouchableOpacity onPress={() => onChangeText("")}>
            <Ionicons
              name="close"
              size={16}
              color={StyleColors.onSurfaceVariant}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default SearchField;

const getStyles = (StyleColors) =>
  StyleSheet.create({
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
