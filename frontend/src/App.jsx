import React from 'react'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import PageNotfound from './components/PageNotfound.jsx'
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

function App() {
  const token = localStorage.getItem("jwt")
  return (
    <div>
      <Routes>
        <Route path="/" element={token? <Home /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotfound/>} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App