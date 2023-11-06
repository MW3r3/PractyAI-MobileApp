import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Swiper from "react-native-swiper";
import { placeholderUrl } from "./utils/placeholder";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 50,
  },
  text: {
    fontSize: 30,
    marginTop: 10,
  },
});

const CarouselItem = ({ item, theme }) => {
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image source={{ uri: item.picture }} style={styles.image} />
      <Text style={[styles.text, { color: theme.text }]}>{item.title}</Text>
    </View>
  );
};

const PersonaCarousel = ({ theme, onIndexChange }) => {
  
  const [isReady, setIsReady] = React.useState(false);
  const carouselItems = [
    { id: 0, title: "Item 1", picture: placeholderUrl(200) },
    { id: 1, title: "Item 2", picture: placeholderUrl(200) },
    { id: 2, title: "Item 3", picture: placeholderUrl(200) },
  ];

 const handleIndexChanged = (index) => {
     onIndexChange(index);
 };

  return (
    <View style={{ height: "50%"  }} onLayout={() => setIsReady(true)}>
      {isReady && (
        <Swiper
          showsButtons={false}
          showsPagination={false}
          onIndexChanged={handleIndexChanged}
        >
          {carouselItems.map((item, index) => (
            <CarouselItem key={index} item={item} theme={theme} />
          ))}
        </Swiper>
      )}
    </View>
  );
};

export default PersonaCarousel;