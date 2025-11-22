import { useContext, createContext } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuth deve essere utilizzato all'ineterno di AuthProvider"
    );
  }
  return context;
};

export default AuthContext;
