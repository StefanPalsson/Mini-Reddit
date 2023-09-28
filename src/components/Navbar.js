import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <header className="reddit-header">
        <div className="logo"><Link to="/" className="link">RedditClone</Link></div>
        <input type="text" placeholder="Sök" className="search-input" />
        <div className="user-options">
          <button>Login</button>
          <button>Register</button>
        </div>
      </header>
    </div>
  )
}

export default Navbar