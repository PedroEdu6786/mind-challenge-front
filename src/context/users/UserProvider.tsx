import React, { useReducer } from 'react'
import { UserContext } from './UserContext'
import { defaultState, userReducer } from './UserReducer'

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, defaultState)

  const value = { state, dispatch }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
