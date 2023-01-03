import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './screens/Login';
import Callback from './screens/Callback';
import Home from './screens/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/callback" element={<Callback token={window.location.search}/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
