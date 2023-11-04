import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { auth } from "./firebase";

import Login from "./screens/login";
import Register from "./screens/register";
import Home from "./screens/home";
import Profile from "./screens/profile";
import Chat from "./screens/chat";
import Buy from "./screens/buy";
import { UserProvider } from "./providers/UserProvider";

type RootParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Profile: undefined;
  Chat: undefined;
  Buy: undefined;
};

const Stack = createStackNavigator<RootParamList>();
const Drawer = createDrawerNavigator();

function StackNavigator() {
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
      {/* Add more screens as needed */}
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={StackNavigator} />
      {/* Add more screens as needed */}
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}
