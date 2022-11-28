import { waitFor } from '@testing-library/react'
import axios from 'axios'
import { ITeam } from 'pages/teams'
import { logsService } from 'services/logs/logsService'
import { mockAxiosGet } from 'tests/utils/mockedAxios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const authData = {
  logsData: { token: '', accountId: 1 },
  remember: true,
}

describe('Dashboard behavior', () => {
  it('should get all teams', async () => {
    mockAxiosGet([])
    const data = await waitFor(async () => {
      const response = await logsService.getLogsByAccount(authData)

      return response
    })

    expect(data).toEqual([])
    expect(mockedAxios.get).toBeCalled()
  })

  it('should fail fetch', async () => {
    await waitFor(async () => {
      await expect(
        logsService.getLogsByAccount(authData)
      ).rejects.toThrowError()
    })
  })
})
