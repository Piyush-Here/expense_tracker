import { useTheme } from "../hooks/useTheme";
import LogoLight from "../assets/Logo_Light.png"
import LogoDark from "../assets/Logo_Dark.png"
function Logo() {
  const {theme,toggleTheme} = useTheme('Light');
  const logo = (theme==='Light'? LogoLight:LogoDark)
  const logoAlt='EXPENSE TRACKER';
  const tailwindClassNamesImage="img h-24 rounded ring-1 ring-green-600 m-2";
  const tailwindClassNameImageContainer="flex justify-center items-center bg-white dark:bg-black";
  return (
    <>
    <div className={tailwindClassNameImageContainer}>
      <img src={logo} alt={logoAlt} className={tailwindClassNamesImage}/>
    </div>
    </>
  )
}

export default Logo