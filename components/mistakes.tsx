import React from "react";
import { ScrollView, Text, View } from "react-native";

const Mistakes = ({ mistakes }) => {
  return (
    <View>
      <Text>Mistakes:</Text>
      <ScrollView>
        {mistakes.map((mistake, index) => (
          <Text key={index}>{mistake}</Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default Mistakes;
