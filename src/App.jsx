import lightImg from './light.svg'
import darkImg from './darkImg.png'
import {useState,useEffect} from 'react';
import './App.css'
import Rout from './router'
import { ErrorBoundary } from "react-error-boundary";

function Fallback({ error }) {
  return (
    <div role="alert">
      <p>something went wrong</p>
      <pre>{error.message}</pre>
    </div>
  );
}

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
      <ErrorBoundary FallbackComponent={Fallback}>
     <Rout/>
        
      </ErrorBoundary>
      

    </main>
  )
}

export default App

