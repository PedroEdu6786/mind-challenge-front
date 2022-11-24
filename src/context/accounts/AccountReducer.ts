import { AccountAction, AccountState } from './AccountContext'

const cases = {
  SET: (state, action) => setUsers(state, action),
  DELETE: (state, action) => deleteUser(state, action),
  UPDATE: (state, action) => updateUser(state, action),
  CREATE: (state, action) => createUser(state, action),
}

export const defaultState = { accounts: null }

export const accountReducer = (state: AccountState, action: AccountAction) => {
  return cases[action.type](state, action.payload)
}

const setUsers = (state, payload) => {
  return {
    ...state,
    accounts: payload,
  }
}

const deleteUser = (state: AccountState, payload) => {
  const newState = state.accounts.filter((data) => data.id !== payload.id)
  return {
    ...state,
    accounts: newState,
  }
}

const updateUser = (state: AccountState, payload) => {
  const user = state.accounts.find((data) => data.id === payload.id)

  Object.keys(user).map((item) => (user[item] = payload[item]))
  return {
    ...state,
    accounts: state.accounts,
  }
}
const createUser = (state: AccountState, payload) => {
  return {
    ...state,
    accounts: [...state.accounts, payload],
  }
}
