import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./screens/login";
import Register from "./screens/register";
import Home from "./screens/home";
import Profile from "./screens/profile";
import Chat from "./screens/chat";


const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="Chat" component={Chat}/>
      </Stack.Navigator>
    </NavigationContainer>





  );}
