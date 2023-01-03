import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './screens/Login';
import './App.css';

const onLogin = (username: string, password: string) => {
  console.log(username, password);
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login onLogin={onLogin}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
