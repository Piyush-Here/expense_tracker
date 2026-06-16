import { useTheme } from "../hooks/useTheme"

function ThemeToggle() {
    const {theme, toggleTheme} = useTheme('Light');
    const tailwindClassNamesButton="py-2 px-4 rounded bg-black text-green-600 font-mono dark:bg-white dark:text-green-600 hover:ring-2 hover:ring-green-600 ";
    const tailwindClassNamesButtonContainer="p-2 flex justify-center items-center bg-white dark:bg-black";
    return (
    <>
     <div className={tailwindClassNamesButtonContainer}>
      <button onClick={toggleTheme} className={tailwindClassNamesButton}>  Go {theme === 'Light' ? 'Dark':'Light'} </button>
     </div>
    </>
  )
}

export default ThemeToggle