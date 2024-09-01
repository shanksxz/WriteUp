import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const foo = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/me`, {
        withCredentials: true,
      });

      if (res.data) {
        setUser(res.data);
        setIsAuthenticated(true);
        setLoading(false);
      }
    } catch (error) {
      setError(error);
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    foo();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
