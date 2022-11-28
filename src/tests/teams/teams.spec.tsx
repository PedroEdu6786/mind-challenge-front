import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { TeamProvider } from 'context/teams/TeamProvider'
import Teams, { ITeam } from 'pages/teams'
import { MemoryRouter } from 'react-router-dom'
import { UserProvider } from 'context/users/UserProvider'
import {
  mockAxiosDelete,
  mockAxiosGet,
  mockAxiosPost,
  mockAxiosPut,
  mockedAxios,
} from 'tests/utils/mockedAxios'
import { act } from 'react-dom/test-utils'

const build = () => {
  const { container } = render(
    <UserProvider>
      <TeamProvider>
        <Teams />
      </TeamProvider>
    </UserProvider>,
    { wrapper: MemoryRouter }
  )

  return {
    container,

    /** Queries for single elements */
    createButton: () => screen.getByTestId(/create-team/i),
    deleteMemberButton: () => screen.getByTestId(/delete-member/i),
    deleteTeamButton: () => screen.getByTestId(/delete-team/i),
    viewLogsButton: () => screen.getByTestId(/view-logs/i),

    /** Queries for multiple elements */
  }
}

const team: ITeam = {
  id: 1,
  accountId: 1,
}

const team2: ITeam = {
  id: 2,
  accountId: 2,
}

const mockLogs = {
  id: 1,
  user: {
    name: 'user',
  },
  teamId: 1,
  status: 'added',
  createdAt: Date().toString(),
}

jest.mock('hooks/useAdminRoute', () => () => {})
jest.mock('hooks/useUserAuth', () => () => [
  { userData: 'user', token: 'token' },
])

describe('Dashboard behavior', () => {
  it('should render', async () => {
    mockAxiosGet()
    await act(() => {
      build()
    })
  })

  it('should create team', async () => {
    mockAxiosGet([team])
    let createButton
    await act(() => {
      ;({ createButton } = build())
    })
    mockAxiosPost(team2)
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      fireEvent.click(createButton())
    })
    expect(mockedAxios.post).toBeCalled()
  })

  it('should delete team member', async () => {
    mockAxiosGet([team])
    let deleteMemberButton
    await act(() => {
      ;({ deleteMemberButton } = build())
    })
    mockAxiosPut(team2)
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      fireEvent.click(deleteMemberButton())
    })
    expect(mockedAxios.put).toBeCalled()
  })

  it('should delete team', async () => {
    mockAxiosGet([team])
    let deleteTeamButton
    await act(() => {
      ;({ deleteTeamButton } = build())
    })
    mockAxiosDelete(team2)
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      fireEvent.click(deleteTeamButton())
    })
    expect(mockedAxios.delete).toBeCalled()
  })

  it('should view logs', async () => {
    mockAxiosGet([team])
    let viewLogsButton
    await act(() => {
      ;({ viewLogsButton } = build())
    })
    mockAxiosGet([mockLogs])
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      fireEvent.click(viewLogsButton())
    })
    expect(mockedAxios.get).toBeCalled()
  })
})
