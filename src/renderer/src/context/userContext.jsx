/* eslint-disable prettier/prettier */
import React, { createContext, useState, useContext, Children } from 'react'

const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
