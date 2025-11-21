import React from 'react'

export default function Footer(){
  return (
    <footer className="footer">
      <div className="container">
        © {new Date().getFullYear()} Blood Donation — Save lives, give blood.
      </div>
    </footer>
  )
}
