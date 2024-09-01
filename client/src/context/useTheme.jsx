import { createContext, useContext, useEffect, useState } from "react";


const ThemeContext = createContext(undefined);


export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(
    localStorage.getItem("theme") || "dark"
  )

  const changeTheme = (mode) => {
    localStorage.setItem("theme", mode);
  }

  useEffect(() => {
    changeTheme(mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if(context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
