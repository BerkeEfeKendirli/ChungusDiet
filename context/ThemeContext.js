import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DarkColors, LightColors } from "../constants/colors";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [mode, setMode] = useState(systemColorScheme);

  useEffect(() => {
    AsyncStorage.getItem("themeMode").then((savedMode) => {
      if (savedMode === "dark" || savedMode === "light") {
        setMode(savedMode);
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = useMemo(() => {
    return mode === "dark" ? DarkColors : LightColors;
  }, [mode]);

  const toggleTheme = () =>
    setMode((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ ...theme, mode, setMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
