import { waitFor } from '@testing-library/react'
import axios from 'axios'
import { IUser } from 'dtos/user'
import { userService } from 'services/user'
import {
  mockAxiosDelete,
  mockAxiosGet,
  mockAxiosGetRejected,
  mockAxiosPost,
  mockAxiosPut,
} from 'tests/utils/mockedAxios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const userMock: IUser = {
  id: 1,
  name: 'Pedro Cruz',
  email: 'pedrcg835@gmail.com',
  isAdmin: true,
}

const authData = {
  userData: { token: '' },
  remember: true,
}

const createUser = {
  userData: { token: '', ...userMock },
  remember: true,
}

describe('Dashboard behavior', () => {
  it('should return logged data', async () => {
    mockAxiosGet([userMock])
    const data = await waitFor(async () => {
      const response = await userService.fetchAllUsers(authData)

      return response
    })

    expect(data).toEqual([userMock])
    expect(mockedAxios.get).toBeCalled()
  })

  it('should fail fetch', async () => {
    mockAxiosGetRejected('Could not fetch users')
    await waitFor(async () => {
      await expect(userService.fetchAllUsers(authData)).rejects.toThrowError()
    })
  })

  it('should create a new user', async () => {
    mockAxiosPost(userMock)
    const data = await waitFor(async () => {
      const response = await userService.createUser(createUser)

      return response
    })

    expect(data).toEqual(userMock)
    expect(mockedAxios.post).toBeCalled()
  })

  it('should fail create user', async () => {
    await waitFor(async () => {
      await expect(userService.createUser(createUser)).rejects.toThrowError()
    })
  })

  it('should update a user', async () => {
    mockAxiosPut(userMock)
    const data = await waitFor(async () => {
      const response = await userService.updateUser(createUser)

      return response
    })

    expect(data).toEqual(userMock)
    expect(mockedAxios.put).toBeCalled()
  })

  it('should fail update user', async () => {
    await waitFor(async () => {
      await expect(userService.updateUser(createUser)).rejects.toThrowError()
    })
  })

  it('should delete a user', async () => {
    mockAxiosDelete(userMock)
    const data = await waitFor(async () => {
      const response = await userService.deleteUser(createUser)

      return response
    })

    expect(data).toEqual(userMock)
    expect(mockedAxios.delete).toBeCalled()
  })

  it('should fail delete user', async () => {
    await waitFor(async () => {
      await expect(userService.deleteUser(createUser)).rejects.toThrowError()
    })
  })
})
