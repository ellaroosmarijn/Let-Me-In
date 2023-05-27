// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { KeyboardEvent } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const { logout, loginWithRedirect, isAuthenticated } = useAuth0()

  const handleLogOff = () => {
    logout({ returnTo: window.location.origin })
  }

  const handleSignIn = () => {
    loginWithRedirect()
  }

  function handleKeyDownLogout(e: KeyboardEvent<HTMLDivElement>) {
    if (e.code == 'Enter') {
      logout({ returnTo: window.location.origin })
    }
  }

  function handleKeyDownLogin(e: KeyboardEvent<HTMLDivElement>) {
    e.preventDefault()
    if (e.code == 'Enter') {
      loginWithRedirect()
    }
  }

  return (
    <nav className='navbar'>
      <div>
        <img src='/assets/logo.png' alt='logo' />
        <Link to='/'>
          <div>Let Me In</div>
        </Link>
      </div>

      <div>
        <Link to='/play'>Play</Link>
      </div>
      <div>
        <Link to='/results'>Results</Link>
      </div>
      <div>
        <Link to='/uploads'>Uploads</Link>
      </div>
      <div>
        <Link to='/create'>Create</Link>
      </div>
      <div>
        {isAuthenticated ? (
          <div
            onClick={handleLogOff}
            onKeyDown={handleKeyDownLogout}
            role='button'
            tabIndex={0}
          >
            Log out
          </div>
        ) : (
          <div
            onClick={handleSignIn}
            onKeyDown={handleKeyDownLogin}
            role='button'
            tabIndex={0}
          >
            Login
          </div>
        )}
      </div>
    </nav>
  )
}
