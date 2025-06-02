import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeType = 'light' | 'dark';
type KidsModeType = boolean;

interface ThemeContextType {
  theme: ThemeType;
  kidsMode: KidsModeType;
  toggleTheme: () => void;
  toggleKidsMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  kidsMode: false,
  toggleTheme: () => {},
  toggleKidsMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem('streamify-theme');
    return (savedTheme as ThemeType) || 'dark';
  });

  const [kidsMode, setKidsMode] = useState<KidsModeType>(() => {
    const savedMode = localStorage.getItem('streamify-kids-mode');
    return savedMode === 'true';
  });

  useEffect(() => {
    localStorage.setItem('streamify-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('streamify-kids-mode', String(kidsMode));
    if (kidsMode) {
      document.documentElement.classList.add('kids');
    } else {
      document.documentElement.classList.remove('kids');
    }
  }, [kidsMode]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleKidsMode = () => {
    setKidsMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, kidsMode, toggleTheme, toggleKidsMode }}>
      {children}
    </ThemeContext.Provider>
  );
};