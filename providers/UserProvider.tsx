import React, { useState } from "react";
import { AdminContext } from "./AdminContext";

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState("free"); // free, paid, pro
  const [admin, setAdmin] = useState(false);

  return (
    <AdminContext.Provider value={{ userType, setUserType, admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
