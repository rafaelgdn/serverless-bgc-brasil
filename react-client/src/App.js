import React, { useState, useEffect } from 'react'
import Routes from './Routes'
import NavBar from './components/NavBar'
import { AppContext } from './libs/contextLib'
import { Auth } from 'aws-amplify'
import { ToastContainer, toast } from 'react-toastify'

function App () {
  const [isAuthenticated, userHasAuthenticated] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(true)

  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad () {
    try {
      await Auth.currentSession()
      userHasAuthenticated(true)
    } catch (e) {
      if (e !== 'No current user') {
        toast.error(e)
      }
    }

    setIsAuthenticating(false)
  }

  return (
    !isAuthenticating &&
      <>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <ToastContainer />
          <NavBar />
          <Routes />
        </AppContext.Provider>
      </>
  )
}

export default App
