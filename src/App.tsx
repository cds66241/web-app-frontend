import React from 'react';
import './App.css';
import Standings from './Standings';
import Results from './Results';
import Navigation from './Navigation';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Standings />}/>
            <Route path="/results" element={<Results />}/>
            </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
