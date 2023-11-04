import React, {useState} from "react";
import { SafeAreaView, View, StyleSheet, Appearance } from "react-native";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../themes";
import Topbar from "../components/topbar";
import PersonaCarousel from "../components/personaselection";
import Mistakes from "../components/mistakes";




export default function HomeScreen() {
  const handleMistakePress = (mistake) => {
    console.log(`Mistake pressed: ${mistake}`);}
	const handlePersonaSelection = (persona) => {
		console.log(`Persona selected: ${persona}`);}
 

  const colorScheme = Appearance.getColorScheme();
	const theme = colorScheme === "light" ? darkTheme : lightTheme;	

  const [open, setOpen] = useState(false);
  
  const toggleOpen = () => {
    setOpen(!open);
    console.log(open);
  };
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
    sideBar: {
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 100,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <Topbar title="PractyAI" theme={theme} />
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
