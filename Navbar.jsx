import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar(){
  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <div className="brand">Blood Donation</div>
        <div className="nav-links">
          <NavLink to="/" className={({isActive}) => 'nav-link' + (isActive ? ' active': '')}>Home</NavLink>
          <NavLink to="/register" className={({isActive}) => 'nav-link' + (isActive ? ' active': '')}>Blood Donor</NavLink>
          <NavLink to="/find" className={({isActive}) => 'nav-link' + (isActive ? ' active': '')}>Find Donor</NavLink>
        </div>
      </div>
    </nav>
  )
}
