import { IUser } from 'dtos/user'
import { createContext } from 'react'

export interface IUserContext {
  users: IUser[]
}

export type State = { users: IUser[] }
export enum UserAction {
  SET_USERS = 'SET_USERS',
  DELETE_USER = 'DELETE_USER',
  UPDATE_USER = 'UPDATE_USER',
  ADD_USER = 'ADD_USER',
}
export type Action = {
  type: UserAction
  payload: IUser[] | IUser
}
export type Dispatch = (action: Action) => void

export const UserContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined)
