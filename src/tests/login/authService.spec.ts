import { waitFor } from '@testing-library/react'
import axios from 'axios'
import { IUser } from 'dtos/user'
import authService from 'services/auth/authService'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const userMock: IUser = {
  id: 1,
  name: 'Pedro Cruz',
  email: 'pedrcg835@gmail.com',
  isAdmin: true,
}

const authData = {
  authFormData: { email: userMock.email, password: 'qwerty' },
  remember: true,
}
const mockedValidLogin = {
  data: {
    token: 'test',
    isAdmin: userMock.isAdmin,
    email: userMock.email,
    userId: userMock.id,
  },
}

describe('Dashboard behavior', () => {
  it('should return logged data', async () => {
    mockedAxios.post.mockResolvedValue(mockedValidLogin)

    const { token, isAdmin, userData } = await waitFor(async () => {
      const response = await authService.signInUser(authData)

      return response
    })

    expect(token).toEqual(mockedValidLogin.data.token)
    expect(isAdmin).toBeTruthy()
    expect(userData.email).toEqual(authData.authFormData.email)
    expect(mockedAxios.post).toBeCalled()
  })

  it('should not log user', async () => {
    mockedAxios.post.mockRejectedValue('Could not log user')
    await waitFor(async () => {
      await expect(authService.signInUser(authData)).rejects.toThrowError()
    })
  })
})
