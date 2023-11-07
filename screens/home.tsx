import React from "react";
import { View, StyleSheet, Appearance } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../themes";
import Topbar from "../components/topbar";
import PersonaCarousel from "../components/personaselection";
import Mistakes from "../components/mistakes";

export default function HomeScreen() {
  const handleMistakePress = (mistake) => {
    console.log(`Mistake pressed: ${mistake}`);
  };
  const handlePersonaSelection = (persona) => {
    console.log(`Persona selected: ${persona}`);
  };

  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "light" ? darkTheme : lightTheme;

  
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
      justifyContent: "flex-start",
      alignItems: "center",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <Topbar title="PractyAI" titleSize={28} theme={theme} pfpVisible={true} badgeVisible={true}/>
        <View style={styles.content}>
          <PersonaCarousel
            onIndexChange={handlePersonaSelection}
            theme={theme}
          />
          <Mistakes theme={theme} onMistakePress={handleMistakePress} />
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
}
