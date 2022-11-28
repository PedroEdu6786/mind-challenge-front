import { render } from '@testing-library/react'
import Dashboard from 'pages/dashboard'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { mockAxiosGet } from 'tests/utils/mockedAxios'

const build = () => {
  const { container } = render(<Dashboard />, { wrapper: MemoryRouter })

  return {
    container,

    /** Queries for single elements */

    /** Queries for multiple elements */
  }
}

jest.mock('hooks/useProtectedRoute', () => () => {})

describe('Dashboard behavior', () => {
  it('should render', async () => {
    mockAxiosGet()
    await act(() => {
      build()
    })
  })
})
