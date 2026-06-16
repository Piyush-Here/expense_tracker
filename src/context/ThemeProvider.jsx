import { createContext, useState } from 'react'

export const ThemeContext=createContext();

export function ThemeProvider({children}) {
    const [theme, setTheme]=useState('Light');
    const toggleTheme=()=>{
        setTheme((prevTheme)=> (prevTheme === 'Light' ? 'Dark' : 'Light'));
    }
    return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app-container ${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );

}
