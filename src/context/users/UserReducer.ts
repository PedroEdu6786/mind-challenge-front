import { Action, State } from './UserContext'

const cases = {
  SET_USERS: (state, action) => setUsers(state, action),
  DELETE_USER: (state, action) => deleteUser(state, action),
  UPDATE_USER: (state, action) => updateUser(state, action),
  ADD_USER: (state, action) => createUser(state, action),
}

export const defaultState = { users: null }

export const userReducer = (state: State, action: Action) => {
  return cases[action.type](state, action.payload)
}

const setUsers = (state, payload) => {
  return {
    ...state,
    users: payload,
  }
}

const deleteUser = (state: State, payload) => {
  const newState = state.users.filter((data) => data.id !== payload.id)
  return {
    ...state,
    users: newState,
  }
}

const updateUser = (state: State, payload) => {
  const user = state.users.find((data) => data.id === payload.id)

  Object.keys(user).map((item) => (user[item] = payload[item]))
  return {
    ...state,
    users: state.users,
  }
}
const createUser = (state: State, payload) => {
  return {
    ...state,
    users: [...state.users, payload],
  }
}
