import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, TextInput, View } from "react-native";
import { StyleColors } from "../../constants/colors";

function OutlinedTextField({
  keyboardType,
  placeholder,
  leftIcon,
  rightIcon,
  textContentType = "none",
  autoComplete = "off",
  passwordRules, // Ekle
  importantForAutofill,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(
    rightIcon === "eye-off"
  );
  const [inputValue, setInputValue] = useState("");
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Animasyon effect'i
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFocused || inputValue.length > 0 ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  // Label style'ı
  const labelStyle = {
    backgroundColor: isFocused ? StyleColors.background : null,
    paddingHorizontal: isFocused ? 8 : 0,
    fontFamily: "inter-regular",
    color: isFocused ? StyleColors.primary : StyleColors.onBackgroundVariant,
    position: "absolute",
    left: isFocused ? 0 : 30,
    top: isFocused ? -20 : "20%",
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    opacity: inputValue.length > 0 && !isFocused ? 0 : 1,
  };

  return (
    <View
      style={[
        styles.textInputContainer,
        {
          borderColor: isFocused
            ? StyleColors.primary
            : StyleColors.onBackgroundVariant,
        },
        {
          borderWidth: isFocused ? 2 : 1,
        },
      ]}
    >
      <View style={styles.textInput}>
        <View style={styles.leftDesign}>
          <Ionicons
            style={{ paddingRight: 4 }}
            name={leftIcon}
            color={
              isFocused
                ? StyleColors.onBackground
                : StyleColors.onBackgroundVariant
            }
            size={24}
          />
          <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            caretHidden={false}
            style={[
              styles.inputText,
              {
                color: isFocused
                  ? StyleColors.onBackground
                  : StyleColors.onBackgroundVariant,
              },
            ]}
            keyboardType={keyboardType}
            autoComplete={autoComplete}
            textContentType={textContentType}
            passwordRules={passwordRules}
            importantForAutofill={importantForAutofill}
            placeholder=""
            autoCorrect={false}
            spellCheck={false}
            placeholderTextColor={StyleColors.onBackgroundVariant}
            cursorColor={StyleColors.primary}
            secureTextEntry={rightIcon === "eye-off" ? isPasswordHidden : false}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
        {rightIcon === "eye-off" && (
          <Ionicons
            color={
              isFocused
                ? StyleColors.onBackground
                : StyleColors.onBackgroundVariant
            }
            size={24}
            name={isPasswordHidden ? "eye-off" : "eye"}
            onPress={() => setIsPasswordHidden(!isPasswordHidden)}
          />
        )}
      </View>
    </View>
  );
}

export default OutlinedTextField;

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: StyleColors.background,
    borderRadius: 8,
    borderWidth: 2,
    marginBottom: 24,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  textInput: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 12,
  },
  inputText: {
    flex: 1,
    fontFamily: "inter-regular",
  },
  leftDesign: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
