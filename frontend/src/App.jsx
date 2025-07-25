import React from 'react'
import Home from './components/Home.jsx'
import Login from './components/login.jsx'
import Signup from './components/signup.jsx'
import PageNotfound from './components/PageNotfound.jsx'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotfound/>} />
      </Routes>
    </div>
  )
}

export default App