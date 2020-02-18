import React from "react";
import { getToken, saveToken, removeToken } from "./services/auth";

const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    Boolean(getToken())
  );

  const logout = () => {
    setIsAuthenticated(false);
    removeToken();
  };

  const authenticate = token => {
    setIsAuthenticated(true);
    saveToken(token);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw Error("Out of context");
  }

  return ctx;
};
