import React from 'react';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import LoginPage from './login'
import Homepage from './homepage'
function App() {
  return (
   <Router>
<div>
  <Routes>
    <Route path="/" element={<LoginPage/>} />
    <Route path="/home" element={<Homepage/>} />
    </Routes>
    </div>
 </Router> 
  );
}

export default App;

