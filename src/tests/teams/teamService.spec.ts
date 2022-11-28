import { waitFor } from '@testing-library/react'
import axios from 'axios'
import { ITeam } from 'pages/teams'
import { teamService } from 'services/teams/teamService'
import {
  mockAxiosDelete,
  mockAxiosGet,
  mockAxiosPost,
} from 'tests/utils/mockedAxios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const teamMock: ITeam = {
  accountId: 0,
}

const authData = {
  teamData: { token: '' },
  remember: true,
}

const createTeam = {
  teamData: { token: '', ...teamMock },
  remember: true,
}

describe('Dashboard behavior', () => {
  it('should get all teams', async () => {
    mockAxiosGet([teamMock])
    const data = await waitFor(async () => {
      const response = await teamService.fetchAllTeams(authData)

      return response
    })

    expect(data).toEqual([teamMock])
    expect(mockedAxios.get).toBeCalled()
  })

  it('should fail fetch', async () => {
    await waitFor(async () => {
      await expect(teamService.fetchAllTeams(authData)).rejects.toThrowError()
    })
  })

  it('should create a new team', async () => {
    mockAxiosPost(teamMock)
    const data = await waitFor(async () => {
      const response = await teamService.createTeam(createTeam)

      return response
    })

    expect(data).toEqual(teamMock)
    expect(mockedAxios.post).toBeCalled()
  })

  it('should fail create team', async () => {
    await waitFor(async () => {
      await expect(teamService.createTeam(createTeam)).rejects.toThrowError()
    })
  })

  it('should get a all members from team', async () => {
    mockAxiosGet([teamMock])
    const data = await waitFor(async () => {
      const response = await teamService.fetchTeamMembers(createTeam)

      return response
    })

    expect(data).toEqual([teamMock])
    expect(mockedAxios.get).toBeCalled()
  })

  it('should fail fetch members', async () => {
    await waitFor(async () => {
      await expect(
        teamService.fetchTeamMembers(createTeam)
      ).rejects.toThrowError()
    })
  })

  it('should delete a user', async () => {
    mockAxiosDelete(teamMock)
    const data = await waitFor(async () => {
      const response = await teamService.deleteTeamMembers(authData)

      return response
    })

    expect(data).toEqual(teamMock)
    expect(mockedAxios.delete).toBeCalled()
  })

  it('should fail delete user', async () => {
    await waitFor(async () => {
      await expect(
        teamService.deleteTeamMembers(authData)
      ).rejects.toThrowError()
    })
  })
})
