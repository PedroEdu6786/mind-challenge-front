import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Login from 'pages/auth/login'
import { act } from 'react-dom/test-utils'
import { mockAxiosPost, mockedAxios } from 'tests/utils/mockedAxios'

const build = () => {
  const { container } = render(<Login />, { wrapper: MemoryRouter })

  return {
    container,

    /** Queries for single elements */
    submitLogin: () => screen.getByTestId(/submit-form/i),
    inputEmail: () => screen.getByTestId(/input-email/i),
    inputPassword: () => screen.getByTestId(/input-password/i),

    /** Queries for multiple elements */
  }
}

jest.mock('hooks/useUserAuth', () => () => [
  { userData: 'user', token: 'token' },
  (data) => data,
])

describe('Login behavior', () => {
  it('should render', async () => {
    await act(() => {
      build()
    })
  })

  it('should fail submit form', async () => {
    let submitLogin
    await act(() => {
      ;({ submitLogin } = build())
    })
    mockAxiosPost()
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      fireEvent.submit(submitLogin())
    })
    expect(mockedAxios.post).toBeCalledTimes(0)
  })

  it('should submit form', async () => {
    let submitLogin, inputEmail, inputPassword
    await act(() => {
      ;({ submitLogin, inputEmail, inputPassword } = build())
    })
    mockAxiosPost()
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      fireEvent.change(inputEmail(), {
        target: { value: 'pedrcg835@gmail.com' },
      })
      fireEvent.change(inputPassword(), {
        target: { value: 'qwerty' },
      })
      fireEvent.submit(submitLogin())
    })
    expect(mockedAxios.post).toBeCalled()
  })
})
