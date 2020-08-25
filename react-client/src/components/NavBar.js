import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAppContext } from '../libs/contextLib'
import { Auth } from 'aws-amplify'
import './NavBar.css'

function NavBar () {
  const { isAuthenticated, userHasAuthenticated } = useAppContext()
  const history = useHistory()

  async function handleLogout () {
    await Auth.signOut()
    userHasAuthenticated(false)
    history.push('/login')
  }

  return (
    <div className='navbar'>
      <div className='navbar-links'>
        {isAuthenticated ? <Link onClick={handleLogout}>Logout</Link>
          : <><Link to='/login'>Login</Link><Link to='/signup'>Cadastro</Link></>}
      </div>
    </div>
  )
}

export default NavBar
