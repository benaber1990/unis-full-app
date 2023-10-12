import React, { createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: "",
});

export default AuthContext;
