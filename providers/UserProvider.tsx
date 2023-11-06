import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { AdminContext } from "./AdminContext";
import { ThemeConsumer } from "styled-components";

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState("free"); // free, paid, pro
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();
    let userRef;
    let unsubscribe;

    const authUnsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        userRef = ref(db, "users/" + user.uid);
        unsubscribe = onValue(userRef, (snapshot) => {
          const data = snapshot.val();

          if (data) {
            if ("subscriptionType" in data && "isAdmin" in data) {
              setUserType(data.subscriptionType);
              setAdmin(data.isAdmin);

              console.log("User type: ", data.subscriptionType);
              console.log("Is admin: ", data.isAdmin);
            } else {
              console.log(
                "subscriptionType or isAdmin property does not exist"
              );
            }
          } else {
            console.log("User's data does not exist");
          }
          setLoading(false);
        });
      } else {
        if (unsubscribe) {
          off(userRef, "value", unsubscribe);
        }
        console.log("User is not logged in");
        setLoading(false);
      }
    });

    return () => {
      authUnsubscribe();
      if (unsubscribe) {
        off(userRef, "value", unsubscribe);
      }
    };
  }, []);

  if (loading) {
    return <View style={{backgroundColor:"#000", width: "auto", height: "auto", flex: 1}}></View>; // Replace this with your actual loading screen
  }

  return (
    <AdminContext.Provider value={{ userType, setUserType, admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
