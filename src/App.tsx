import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import Calculator from './Components/Calculator/Calculator';
import Results from './Components/Results/Results';
import Home from './Components/Home/Home';
import { AnimatePresence } from 'framer-motion';

function App() {
  const location =useLocation()
  return (
    <div className='App'>
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element = {<Home/>}/>
            <Route path="/calculate" element = {<Calculator/>}/>
            <Route path="/result" element = {<Results/>}/>
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}
export default App;
