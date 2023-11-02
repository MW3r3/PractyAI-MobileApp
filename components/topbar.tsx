import React from "react";
import { StyleSheet, Text, View, Appearance, Image} from "react-native";
import { lightTheme, darkTheme } from "../themes";
import { ThemeProvider } from "styled-components";
import Icon from "react-native-vector-icons/Ionicons";
import { placeholderUrl } from "./utils/placeholder";


interface TopbarProps {
  title: string;
  theme: "light" | "dark";
}

const Topbar: React.FC<TopbarProps> = ({ title, theme: themeProp }) => {
  const colorScheme = Appearance.getColorScheme();
  const theme = themeProp === "dark" ? darkTheme : lightTheme;

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      backgroundColor: theme.background,
      height: 60,
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 10,
    },
    title: {
      color: theme.text,
      fontSize: 20,
      fontWeight: "bold",
    },
    spacer: {
      width: 30,
    },
    pfp: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.text,
        },
  });

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <Icon name="menu" size={40} color={theme.text} />
        <Text style={styles.title}>{title}</Text>
        <Image style={styles.pfp} source={{ uri:placeholderUrl(40) }} />
      </View>
    </ThemeProvider>
  );
};

export default Topbar;
