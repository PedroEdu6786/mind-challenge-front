import React, { useReducer } from 'react'
import { TeamContext } from './TeamContext'
import { defaultState, teamReducer } from './TeamReducer'

export const TeamProvider = ({ children }) => {
  const [state, dispatch] = useReducer(teamReducer, defaultState)

  const value = { state, dispatch }
  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>
}
