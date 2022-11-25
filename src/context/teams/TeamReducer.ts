import { TeamAction, TeamState } from './TeamContext'

const cases = {
  SET: (state, action) => setTeam(state, action),
  DELETE: (state, action) => deleteTeam(state, action),
  UPDATE: (state, action) => updateTeam(state, action),
  CREATE: (state, action) => createTeam(state, action),
}

export const defaultState = { teams: null }

export const teamReducer = (state: TeamState, action: TeamAction) => {
  return cases[action.type](state, action.payload)
}

const setTeam = (state, payload) => {
  return {
    ...state,
    teams: payload,
  }
}

const deleteTeam = (state: TeamState, payload) => {
  const newState = state.teams.filter((data) => data.id !== payload.id)
  return {
    ...state,
    teams: newState,
  }
}

const updateTeam = (state: TeamState, payload) => {
  const user = state.teams.find((data) => data.id === payload.id)

  Object.keys(user).map((item) => (user[item] = payload[item]))
  return {
    ...state,
    teams: state.teams,
  }
}
const createTeam = (state: TeamState, payload) => {
  return {
    ...state,
    teams: [...state.teams, payload],
  }
}
