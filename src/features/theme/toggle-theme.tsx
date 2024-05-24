"use client";
import * as React from "react";
import { useTheme } from "next-themes";



import { Moon, Sun } from "lucide-react";

export function ToggleTheme() {
  const { setTheme } = useTheme();
 const [darkMode,setDarkMode]=React.useState(true);
 React.useEffect(()=>{
  const theme=localStorage.getItem("theme")
  if (theme==="dark") setDarkMode(true)
    else {setDarkMode(false)}
 },[])
 React.useEffect(()=>{
  if (darkMode) {setTheme("dark");
  localStorage.setItem("theme","dark");
 }
 else {
  setTheme("light");
  localStorage.setItem("theme","light");
 }


  }
,[darkMode])

  return (
    <div className="relative w-16 h-8 flex items-center dark:bg-gray-400 bg-teal-500
    cursor-pointer rounded-full p-1" onClick={()=> setDarkMode(!darkMode)}>
    <Moon className="text-white" size={18}/>
    <div className="absolute bg-white w-6 h-6 rounded-full shadow-sm
    transform transition-transform duration-300" style={darkMode? {left:"2px"}:{right:"2px"}}></div>

    <Sun className="ml-auto text-yellow-400" size={18}/>
    </div>
  );
}