import React from "react";
import { View, Text, Dimensions, Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import { placeholderUrl } from "./utils/placeholder";
import { lightTheme, darkTheme } from "../themes"; // replace with the actual path
import { ThemeProvider } from "styled-components";
import { Appearance } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const PersonaCarousel = ({ theme: themeProp, onSnap }) => {
  const colorScheme = Appearance.getColorScheme();
  const theme = themeProp === "dark" ? darkTheme : lightTheme;

  const handlePersonaSelection = (index) => {
    let Persona = index;
    
  };

  const carouselItems = [
    { id: 1, title: "Item 1", picture: placeholderUrl(200) },
    { id: 2, title: "Item 2", picture: placeholderUrl(200) },
    { id: 3, title: "Item 3", picture: placeholderUrl(200) },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          backgroundColor: theme.background,
          borderRadius: 5,
          height: 250,
          padding: 50,
          marginHorizontal: 25,
          marginVertical: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: item.picture }}
          style={{ width: 200, height: 200 }}
        />
        <Text style={{ fontSize: 30, color: theme.text, marginVertical:10 }}>{item.title}</Text>
      </View>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Carousel
        layout={"default"}
        data={carouselItems}
        sliderWidth={screenWidth}
        itemWidth={270}
        renderItem={renderItem}
        onSnapToItem={(index) => onSnap(index)}
        loop={true}
      />
    </ThemeProvider>
  );
};

export default PersonaCarousel;

