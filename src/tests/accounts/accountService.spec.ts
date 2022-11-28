import { waitFor } from '@testing-library/react'
import axios from 'axios'
import { IAccount } from 'dtos/account'
import { accountService } from 'services/account/accountService'
import {
  mockAxiosDelete,
  mockAxiosGet,
  mockAxiosGetRejected,
  mockAxiosPost,
  mockAxiosPut,
} from 'tests/utils/mockedAxios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const accountMock: IAccount = {
  accountName: '',
  clientName: '',
  headOfOperation: '',
}

const authData = {
  userData: { token: '' },
  remember: true,
}

const createAccount = {
  accountData: { token: '', ...accountMock },
  remember: true,
}

describe('Dashboard behavior', () => {
  it('should get all accounts', async () => {
    mockAxiosGet([accountMock])
    const data = await waitFor(async () => {
      const response = await accountService.fetchAccounts(authData)

      return response
    })

    expect(data).toEqual([accountMock])
    expect(mockedAxios.get).toBeCalled()
  })

  it('should fail fetch', async () => {
    mockAxiosGetRejected('Could not fetch users')
    await waitFor(async () => {
      await expect(
        accountService.fetchAccounts(authData)
      ).rejects.toThrowError()
    })
  })

  it('should create a new account', async () => {
    mockAxiosPost(accountMock)
    const data = await waitFor(async () => {
      const response = await accountService.createAccount(createAccount)

      return response
    })

    expect(data).toEqual(accountMock)
    expect(mockedAxios.post).toBeCalled()
  })

  it('should fail create account', async () => {
    await waitFor(async () => {
      await expect(
        accountService.createAccount(createAccount)
      ).rejects.toThrowError()
    })
  })

  it('should update a user', async () => {
    mockAxiosPut(accountMock)
    const data = await waitFor(async () => {
      const response = await accountService.updateAccount(createAccount)

      return response
    })

    expect(data).toEqual(accountMock)
    expect(mockedAxios.put).toBeCalled()
  })

  it('should fail update user', async () => {
    await waitFor(async () => {
      await expect(
        accountService.updateAccount(createAccount)
      ).rejects.toThrowError()
    })
  })

  it('should delete a user', async () => {
    mockAxiosDelete(accountMock)
    const data = await waitFor(async () => {
      const response = await accountService.deleteAccount(authData)

      return response
    })

    expect(data).toEqual(accountMock)
    expect(mockedAxios.delete).toBeCalled()
  })

  it('should fail delete user', async () => {
    await waitFor(async () => {
      await expect(
        accountService.deleteAccount(authData)
      ).rejects.toThrowError()
    })
  })
})
