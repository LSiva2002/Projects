import React from 'react'
import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import DonorRegister from './pages/DonorRegister.jsx'
import FindDonor from './pages/FindDonor.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

export default function App(){
  const location = useLocation();
  return (
    <div>
      <Navbar />
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<DonorRegister />} />
        <Route path="/find" element={<FindDonor />} />
      </Routes>
      <Footer />
    </div>
  )
}
