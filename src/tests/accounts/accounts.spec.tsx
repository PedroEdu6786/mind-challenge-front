import { render } from '@testing-library/react'
import { AccountProvider } from 'context/accounts/AccountProvider'
import Account from 'pages/accounts'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { mockAxiosGet } from 'tests/utils/mockedAxios'

const build = () => {
  const { container } = render(
    <AccountProvider>
      <Account />
    </AccountProvider>,
    { wrapper: MemoryRouter }
  )

  return {
    container,

    /** Queries for single elements */

    /** Queries for multiple elements */
  }
}

jest.mock('hooks/useAdminRoute', () => () => {})

describe('Dashboard behavior', () => {
  it('should render', async () => {
    mockAxiosGet()
    await act(() => {
      build()
    })
  })
})
