import { View, Text, StyleSheet, TextInput } from "react-native";
import { useTheme } from "../../context/ThemeContext";

// Sadece gösterim için
export function DetailNutrition({ number, text = "" }) {
  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

export function DetailNutritionInput({
  value,
  onChangeText,
  text = "",
  keyboardType = "default",
  placeholder,
  borderColor,
}) {
  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);
  return (
    <View style={styles.rootContainer}>
      <TextInput
        style={[styles.input, { borderBottomColor: borderColor }]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={StyleColors.surfaceVariant}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const getStyles = (StyleColors) =>
  StyleSheet.create({
    rootContainer: {
      gap: 4,
      alignItems: "center",
    },
    number: {
      fontFamily: "inter-medium",
      fontSize: 16,
      color: StyleColors.onBackground,
    },
    input: {
      fontFamily: "inter-medium",
      fontSize: 16,
      color: StyleColors.onBackground,
      borderBottomWidth: 1,
      borderRadius: 8,
      paddingVertical: 4,
      textAlign: "center",
      minWidth: 50,
    },
    text: {
      fontFamily: "inter-regular",
      fontSize: 14,
      color: StyleColors.onBackground,
    },
  });
