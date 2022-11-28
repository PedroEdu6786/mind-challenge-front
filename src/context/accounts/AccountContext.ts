import { createContext } from 'react'
import { IAccount } from 'dtos/account'

export type AccountState = { accounts: IAccount[] }
export enum Actions {
  SET = 'SET',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
  CREATE = 'CREATE',
}
export type AccountAction = {
  type: Actions
  payload: IAccount[] | IAccount
}
export type AccountDispatch = (action: AccountAction) => void

export const AccountContext = createContext<
  { state: AccountState; dispatch: AccountDispatch } | undefined
>(undefined)
