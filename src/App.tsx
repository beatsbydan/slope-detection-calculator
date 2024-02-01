import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Calculator from './Components/Calculator/Calculator';
import Results from './Components/Results/Results';
import Home from './Components/Home/Home';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/calculate" element = {<Calculator/>}/>
          <Route path="/result" element = {<Results/>}/>
        </Routes>
      </Router>
    </div>
  );
}
``
export default App;
