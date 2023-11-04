import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function BuyScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upgrade Page</Text>
      <Text style={styles.description}>
        Here you can upgrade your account to unlock fancy features.
      </Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    margin: 10,
  },
});
