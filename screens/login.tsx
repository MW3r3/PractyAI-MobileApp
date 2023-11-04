import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Appearance,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../themes";
import { TextInput } from "react-native-gesture-handler";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootParamList } from "../App"; // adjust the path as necessary

export default function LoginScreen() {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "light" ? darkTheme : lightTheme;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log(email, password);
    console.log("initiating login");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("login successful");
      const user = userCredential.user;
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

      if (!user.emailVerified) {
        await sendEmailVerification(user);
        Alert.alert(
          "Email not verified",
          "A verification email has been sent when you created your account. Please check your inbox and verify your email.",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") },
            { text: "Send Again", onPress: () => sendEmailVerification(user) },
          ]
        );
        await signOut(auth);
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home", params: undefined }],
        });
      }
    } catch (error) {
      const errorCode = error.code;
      let errorMessage = error.message;

      switch (errorCode) {
        case "auth/invalid-email":
          errorMessage = "The email address is not valid.";
          break;
        case "auth/user-disabled":
          errorMessage = "This user has been disabled.";
          break;
        case "auth/user-not-found":
          errorMessage = "No user found with this email address.";
          break;
        case "auth/invalid-login-credentials":
          errorMessage =
            "The email or password is incorrect. if you forgot your password, please reset it.";
          break;
        case "auth/too-many-requests":
          errorMessage =
            "Too many requests. Please try again in a few minutes.";
          break;
        case "auth/missing-password":
          errorMessage = "Please enter a password.";
          break;
        case "auth/missing-email":
          errorMessage = "Please enter an email address.";
          break;
        default:
          errorMessage = "An unknown error occurred.";
      }

      console.log(errorCode, errorMessage);
      if (errorCode === "auth/invalid-login-credentials") {
        Alert.alert("Login failed", errorMessage, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
          {
            text: "Reset Password",
            onPress: () => sendPasswordResetEmail(auth, email),
          },
        ]);
      } else {
        Alert.alert("Login failed", errorMessage, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 20,
    },
    input: {
      height: 40,
      width: 300,
      margin: 6,
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
    registerContainer: {
      flexDirection: "row",
      marginTop: 10,
    },
    registerText: {
      color: theme.text,
    },
    registerButton: {
      color: theme.secondary,
      fontWeight: "bold",
      marginLeft: 5,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>PractyAI</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Email..."
          placeholderTextColor="gray"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Password..."
          placeholderTextColor="gray"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity style={styles.actionButton} onPress={handleLogin}>
          <Text style={styles.actionButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerButton}>Register</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
}
