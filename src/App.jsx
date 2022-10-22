import lightImg from './light.svg'
import darkImg from './darkImg.png'
import {useState,useEffect} from 'react';
import './App.css'
import Rout from './router'

 function App() {
   const [theme, setTheme] = useState('dark');
   const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
    useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
    <main className={`App ${theme}`}> 
       React ⚛️ + Vite ⚡ + Replit 🌀 <button  onClick={toggleTheme}>{theme==="dark"?<img src={lightImg} width="20px"/>:<img src={darkImg} width="20px"/>}</button>
      
     <Rout/>
        
    </main>
  )
}

export default App

