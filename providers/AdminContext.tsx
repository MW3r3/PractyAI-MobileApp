import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

export const AdminContext = React.createContext({
  userType: "free",
  setUserType: (value: string) => {},
  admin: false,
  setAdmin: (value: boolean) => {},
});

export const AdminProvider = ({ children }) => {
  const [userType, setUserType] = useState("free");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    if (auth.currentUser) {
      const userRef = ref(db, "users/" + auth.currentUser.uid);

      const unsubscribe = onValue(userRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          if ("subscriptionType" in data && "isAdmin" in data) {
            setUserType(data.subscriptionType);
            setAdmin(data.isAdmin);

            console.log("User type: ", data.subscriptionType);
            console.log("Is admin: ", data.isAdmin);
          } else {
            console.log("subscriptionType or isAdmin property does not exist");
          }
        } else {
          console.log("User's data does not exist");
        }
      });

      return () => unsubscribe();
    } else {
      console.log("User is not logged in");
    }
  }, []);

  return (
    <AdminContext.Provider value={{ userType, setUserType, admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
