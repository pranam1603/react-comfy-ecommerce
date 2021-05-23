import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const [myUser, setMyUser] = useState(false)
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0()

  useEffect(() => {
    setMyUser(user)
  }, [user])

  return (
    <UserContext.Provider value={{ myUser, user, isAuthenticated, isLoading, loginWithRedirect, logout }}>{children}</UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
