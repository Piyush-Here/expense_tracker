import { useState } from "react"
import { useTheme } from "../hooks/useTheme";

function Logo() {
  const {theme,toggleTheme} = useTheme('Light');
  const [logo,setLogo]=useState(`../assets/Logo_${theme}.png`)
  const logoAlt='EXPENSE TRACKER';
  
  return (
    <>
    <div>
      <img src={logo} alt={logoAlt} />
    </div>
    </>
  )
}

export default Logo