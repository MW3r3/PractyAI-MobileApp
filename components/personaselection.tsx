import React from "react";
import { View, Text, Image } from "react-native";
import Swiper from "react-native-swiper";
import { placeholderUrl } from "./utils/placeholder";
import { lightTheme, darkTheme } from "../themes";
import { Appearance } from "react-native";

const CarouselItem = ({ item, theme }) => {
  return (
    <View
      style={{
        backgroundColor: theme.background,
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: item.picture }}
        style={{ width: 200, height: 200 }}
      />
      <Text style={{ fontSize: 30, marginTop: 10 }}>{item.title}</Text>
    </View>
  );
};

const PersonaCarousel = ({ theme: themeProp }) => {
  const colorScheme = Appearance.getColorScheme();
  const theme = themeProp === "dark" ? darkTheme : lightTheme;

  const carouselItems = [
    { id: 1, title: "Item 1", picture: placeholderUrl(200) },
    { id: 2, title: "Item 2", picture: placeholderUrl(200) },
    { id: 3, title: "Item 3", picture: placeholderUrl(200) },
  ];

  return (
    <View style={{ height: "50%" }}>
      <Swiper showsButtons={false} showsPagination={false}>
        {carouselItems.map((item, index) => (
          <CarouselItem key={index} item={item} theme={theme} />
        ))}
      </Swiper>
    </View>
  );
};

export default PersonaCarousel;
