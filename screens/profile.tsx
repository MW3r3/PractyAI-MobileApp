import React, { useEffect, useState } from "react";
import {
  Appearance,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, updateProfile, reauthenticateWithCredential, EmailAuthProvider, signOut } from "firebase/auth";
import { lightTheme, darkTheme } from "../themes";
import ProfileStyles from "./profile-styles";
import Icon from "react-native-vector-icons/Ionicons";
import { placeholderUrl } from "../components/utils/placeholder";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootParamList } from "../App";
import UsageInfo from "../components/usage";
import { ScrollView } from "react-native-gesture-handler";
import { fetchUserData } from "../components/utils/fetchUserData";
import { setUserData } from "../components/utils/setUserData";
import { set } from "firebase/database";


type ProfileProps = {
  navigation: StackNavigationProp<RootParamList, "Profile">;
};

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "light" ? darkTheme : lightTheme;
  const styles = ProfileStyles(theme);
  const [isEditable, setIsEditable] = useState(false);
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(user?.displayName || "");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });

    return unsubscribe;
  }, []);

  

  const handleEditPress = () => {
    setIsEditable(true);
    console.log("Editing profile");
  };

  const handleLogout = () => {
    const auth = getAuth();
  Alert.alert(
    "Logout",
    "Are you sure you want to logout?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Yes", onPress: async () => {
        await auth.signOut();
      }}
    ]
  );
};

  const handleCancel = () => {
    setIsEditable(false);
    console.log("Editing cancelled");
  };

  const handleSave = async () => {
    if (user) {
      const credential = EmailAuthProvider.credential(user.email, password);
      try {
        await reauthenticateWithCredential(user, credential);
        await setUserData("username", username);
        await updateProfile(user, { displayName: username });
        setIsEditable(false);
      } catch (error) {
        console.log("Error re-authenticating:", error);
        Alert.alert("Error", "Incorrect password");
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.leftSide}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-outline" size={36} color={theme.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.rightSide}>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: placeholderUrl(150) }}
            style={styles.profilePicture}
          />
          <View>
            <Text style={styles.profileName}>{user?.displayName}</Text>
          </View>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput
              style={styles.input}
              value={user?.email}
              editable={false}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              editable={isEditable}
              keyboardType="default"
              placeholder={user?.displayName}
              placeholderTextColor={theme.text}
            />
          </View>
          {isEditable ? (
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                editable={isEditable}
                secureTextEntry={true}
                keyboardType="default"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
              />
            </View>
          ) : null}
          <View style={styles.actionButtons}>
            {isEditable ? (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleCancel}
              >
                <Text style={styles.actionButtonText}>Cancel</Text>
              </TouchableOpacity>
            ) : null}
            {isEditable ? (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleSave}
              >
                <Text style={styles.actionButtonText}>Save</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleEditPress}
              >
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <UsageInfo theme={theme} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
