import React, { useReducer } from 'react'
import { AccountContext } from './AccountContext'
import { accountReducer, defaultState } from './AccountReducer'

export const AccountProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, defaultState)

  const value = { state, dispatch }
  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  )
}
