import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { getAuth } from "firebase/auth";
import Login from "./screens/login";
import Register from "./screens/register";
import Home from "./screens/home";
import Profile from "./screens/profile";
import Chat from "./screens/chat";
import Buy from "./screens/buy";
import { UserProvider } from "./providers/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";

// TODO: ADD drawer navigation
// TODO: ADD chat Screen
// TODO: ADD buy Screen
// TODO: Replace placeholder images with actual images
// TODO: add logout confirmation


export type RootParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Profile: undefined;
  Chat: undefined;
  Buy: undefined;
};

const Stack = createStackNavigator<RootParamList>();

function StackNavigator() {
  const auth = getAuth();
  const navigation = useNavigation<NavigationProp<RootParamList>>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in");
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      } else {
        console.log("User is signed out");
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }
      console.log("User: ", user["email"]);
    });

    return unsubscribe;
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Buy"
        component={Buy}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}
