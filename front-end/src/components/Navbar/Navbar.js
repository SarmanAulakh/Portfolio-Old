import React from 'react'
import { Link } from "react-router-dom";
import './Navbar.css'

export default function Navbar({click}) {
  return (
    <div className='navbar'>
      <p id="nav-name">Sarman</p>
      <div className='nav'>
        <Link to="/">
          <p onClick={() => click({ sidePage: 'portfolio' })}>Portfolio</p>
        </Link>
        <Link to="/about">
          <p onClick={() => click({ sidePage: 'about' })}>About</p>
        </Link>
        <Link to="/contact">
          <p onClick={() => click({ sidePage: 'contact' })}>Contact</p>
        </Link>
      </div>
    </div>
  )
}