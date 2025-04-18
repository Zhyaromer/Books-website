// src/context/ThemeContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import availableColors from '../Helpers/colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const defaultColorName = availableColors.length > 0 ? availableColors[0].color : 'green';
  
  const [selectedColor, setSelectedColor] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selectedColor');
      return saved && availableColors.some(c => c.color === saved)
        ? saved 
        : defaultColorName;
    }
    return defaultColorName;
  });

  const colorTones = availableColors.find(c => c.color === selectedColor) || availableColors[0];

  const updateColor = (colorName) => {
    setSelectedColor(colorName);
    localStorage.setItem('selectedColor', colorName);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentColor = localStorage.getItem('selectedColor');
      if (!currentColor || !availableColors.some(c => c.color === currentColor)) {
        localStorage.setItem('selectedColor', defaultColorName);
        setSelectedColor(defaultColorName);
      }
    }
  }, [defaultColorName]);

  return (
    <ThemeContext.Provider value={{ 
      selectedColor,
      updateColor,
      main: colorTones.main,
      secondary: colorTones.secondary,
      tertiary: colorTones.tertiary
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);