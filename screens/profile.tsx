import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Profile Screen</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
