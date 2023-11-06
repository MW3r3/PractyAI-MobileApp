import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Appearance,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../themes";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootParamList } from "../App";
import { db } from "../firebase";
import { set, ref } from "firebase/database";

export default function RegisterScreen() {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? lightTheme : darkTheme;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSignup = () => {
    switch (true) {
      case password !== password2:
        Alert.alert("Passwords do not match", "Please try again.", [
          { text: "OK", onPress: () => console.log("OK pressed") },
        ]);
        return;
      case password.length < 8:
        Alert.alert(
          "Password too short",
          "Password should contain at least 1 number 1 letter and must be over 8 characters",
          [{ text: "OK", onPress: () => console.log("OK pressed") }]
        );
        return;
      case password.search(/\d/) === -1:
        Alert.alert(
          "Password too weak",
          "Password should contain at least 1 number 1 letter and must be over 8 characters",
          [{ text: "OK", onPress: () => console.log("OK pressed") }]
        );
        return;
      case password.search(/[a-zA-Z]/) === -1:
        Alert.alert(
          "Password too weak",
          "Password should contain at least 1 number 1 letter and must be over 8 characters",
          [{ text: "OK", onPress: () => console.log("OK pressed") }]
        );
        return;
      case username.length < 4:
        Alert.alert(
          "Username too short",
          "Username must be over 4 characters",
          [{ text: "OK", onPress: () => console.log("OK pressed") }]
        );
        return;
      case username.length > 20:
        Alert.alert(
          "Username too long",
          "Username must be under 20 characters",
          [{ text: "OK", onPress: () => console.log("OK pressed") }]
        );
        return;
      case username.search(/\W/) !== -1:
        Alert.alert(
          "Username invalid",
          "Username must not contain special characters",
          [{ text: "OK", onPress: () => console.log("OK pressed") }]
        );
        return;
      case email.search(/@/) === -1:
        Alert.alert("Email invalid", "Please enter a valid Email.", [
          { text: "OK", onPress: () => console.log("OK pressed") },
        ]);
        return;
      default:
        break;
    }
    console.log("initiating signup");
    createUserWithEmailAndPassword(auth, email, password)
      .then( async (userCredential) => {
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: username,
        });
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const region = data.country;

        console.log("signup successful");
        console.log(
          "email:",
          user["email"],
          "mailVerified:",
          user["emailVerified"],
          "Userid:",
          user["uid"],
          "username:",
          user["displayName"]
        );
        sendEmailVerification(user);
        Alert.alert(
          "Signup successful",
          "Please check your inbox and verify your email.",
          [{ text: "OK", onPress: () => console.log("OK pressed") }]
        );
          set(ref(db, "users/" + user.uid), {
            username: username,
            email: email,
            isAdmin: false,
            isStaff: false,
            isBanned: false,
            phoneNumber: null,
            totalMessages: 0,
            messageLimit: 200,
            messageUsage: 0,
            totalSp: 0,
            spLimit: 3,
            spUsage: 0,
            timeStamp: new Date().toLocaleDateString("en-US"),
            subscriptionStart: null,
            subscriptionEnd: null,
            subscriptionType: "Free",
            region:region,
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = error.message;
        console.log("signup failed");
        console.log(errorCode, errorMessage);
        switch (errorCode) {
          case "auth/email-already-in-use":
            errorMessage =
              "The email address is already in use by another account.";
            break;
          case "auth/invalid-email":
            errorMessage = "The email address is not valid.";
            break;
          case "auth/operation-not-allowed":
            errorMessage =
              "Email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab.";
            break;
          case "auth/weak-password":
            errorMessage = "The password is too weak.";
            break;
          default:
            break;
        }
        Alert.alert("Signup failed", errorMessage, [
          { text: "OK", onPress: () => console.log("OK pressed") },
        ]);
      });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.text,
    },
    input: {
      height: 40,
      width: 300,
      margin: 8,
      borderWidth: 2,
      borderColor: theme.secondaryLight,
      padding: 10,
      borderRadius: 10,
      color: theme.text,
    },
    actionButton: {
      width: 300,
      backgroundColor: theme.secondary,
      padding: 10,
      borderRadius: 10,
      marginTop: 10,
    },
    actionButtonText: {
      fontWeight: "bold",
      fontSize: 18,
      color: theme.white,
      textAlign: "center",
    },
    loginContainer: {
      flexDirection: "row",
      marginTop: 15,
    },
    loginText: {
      color: theme.text,
    },
    loginButton: {
      color: theme.secondary,
      fontWeight: "bold",
      marginLeft: 5,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={"gray"}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={"gray"}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={"gray"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={"gray"}
          value={password2}
          onChangeText={setPassword2}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.actionButton} onPress={handleSignup}>
          <Text style={styles.actionButtonText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginButton}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
}
