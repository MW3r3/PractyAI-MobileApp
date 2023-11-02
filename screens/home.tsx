import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Appearance } from "react-native";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../themes";
import Topbar from "../components/topbar";
import PersonaCarousel from "../components/personaselection";

export default function HomeScreen() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  const handleSnap = (index: number) => {
    console.log(index);
    // TODO: goto chat
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.text,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        },
  });

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <Topbar title="PractyAI" theme={colorScheme} />
        <View style={styles.content}>
          <PersonaCarousel theme={colorScheme} onSnap={handleSnap}/>
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
}
