import React from "react";

export const AdminContext = React.createContext({
  userType: "free",
  setUserType: (value: string) => {},
  admin: false,
  setAdmin: (value: boolean) => {},
});
