import { render } from '@testing-library/react'
import axios from 'axios'
import { UserProvider } from 'context/users/UserProvider'
import User from 'pages/users'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { mockAxiosGet } from 'tests/utils/mockedAxios'

const build = () => {
  const { container } = render(
    <UserProvider>
      <User />
    </UserProvider>,
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
