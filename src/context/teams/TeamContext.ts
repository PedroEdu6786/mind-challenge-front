import { Actions } from 'context/accounts/AccountContext'
import { ITeam } from 'pages/teams'
import { createContext } from 'react'

export interface ITeamContext {
  teams: ITeam[]
}

export type TeamState = { teams: ITeam[] }

export type TeamAction = {
  type: Actions
  payload: ITeam[] | ITeam
}
export type Dispatch = (action: TeamAction) => void

export const TeamContext = createContext<
  { state: TeamState; dispatch: Dispatch } | undefined
>(undefined)
