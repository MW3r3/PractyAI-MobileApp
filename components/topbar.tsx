import React, { useContext } from "react";
import { View, Text, StyleSheet, VirtualizedList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AdminContext } from "../providers/AdminContext"; // replace with the actual path

interface TopbarProps {
  title: string;
  theme: {
    background: string;
    text: string;
    primary: string;
    white: string;
  };
}

const Topbar: React.FC<TopbarProps> = ({ title, theme }) => {
  const { userType } = useContext(AdminContext); // add this line

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      backgroundColor: theme.background,
      height: 60,
      justifyContent: "flex-start",
      alignItems: "center",
      paddingHorizontal: 10,
    },
    leftcontainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    midcontainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    rightcontainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    title: {
      color: theme.text,
      fontSize: 28,
      fontWeight: "bold",
    },
    
    badgeContainer: {
      width: 50,
      height: 30,
      justifyContent: "center",
      fontSize: 16,
      fontWeight: "bold",
      backgroundColor: theme.primary,
      padding: 5,
      marginRight: 10,
      borderRadius: 20,
    },
    badgeText:{
      textAlign: "center",
      color: theme.white,
      fontSize: 16,
      fontWeight: "bold",
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.leftcontainer}>
        <Icon name="menu-outline" size={40} color={theme.text} />
      </View>
      <View style={styles.midcontainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.rightcontainer}>
        <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>{userType}</Text>
        </View>
      </View>
    </View>
  );
};

export default Topbar;
