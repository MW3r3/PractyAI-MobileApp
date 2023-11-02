import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Appearance } from "react-native";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../themes";

export default function HomeScreen() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.text,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>Home Screen</Text>
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
}
