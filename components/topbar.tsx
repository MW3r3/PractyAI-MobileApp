import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AdminContext } from "../providers/AdminContext";
import { placeholderUrl } from "./utils/placeholder";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootParamList } from "../App";

interface TopbarProps {
  title: string;
  titleSize: number;
  pfpVisible?: boolean;
  badgeVisible?: boolean;
  
  theme: {
    background?: string;
    text?: string;
    primary?: string;
    white?: string;
    secondary?: string;
  };
}

const Topbar: React.FC<TopbarProps> = ({ title, titleSize, theme, pfpVisible, badgeVisible}) => {
  const { userType } = useContext(AdminContext);
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  

  const handleBadgePress = () => {
    console.log("Going to buy page");
    navigation.navigate("Buy");
  };
  const handleProfilePress = () => {
    console.log("Going to profile page");
    navigation.navigate("Profile");
  };

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
      fontSize: titleSize,
      fontWeight: "700",
      shadowColor: theme.text,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 10,
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
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 10,
    },
    badgeText: {
      textAlign: "center",
      color: theme.white,
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  return (
    
    <View style={styles.container}>
      {badgeVisible && (
      <View style={styles.leftcontainer}>
        <TouchableOpacity onPress={() => handleBadgePress()}>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{userType}</Text>
          </View>
        </TouchableOpacity>
      </View>
      )}
      <View style={styles.midcontainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {pfpVisible && (
      <View style={styles.rightcontainer}>
        <TouchableOpacity onPress={handleProfilePress}>
          {
            <Image
              source={{ uri: placeholderUrl(40) }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          }
        </TouchableOpacity>
      </View>
      )}
    </View>
        
  );
};

export default Topbar;
