import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    // 1. Si l'utilisateur a un choix sauvegardé
    const saved = localStorage.getItem("lifesave-theme");
    if (saved) return saved === "dark";

    // 2. Par défaut lors de la première visite : Mode Clair (false)
    return false;
  });


  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("lifesave-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("lifesave-theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme doit être utilisé à l'intérieur d'un ThemeProvider");
  }
  return context;
}
