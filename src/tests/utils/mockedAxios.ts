import axios from 'axios'

jest.mock('axios')
export const mockedAxios = axios as jest.Mocked<typeof axios>

export const mockAxiosGet = (value: any = []) => {
  return mockedAxios.get.mockResolvedValue({
    data: value,
  })
}

export const mockAxiosPost = (value: any = []) => {
  return mockedAxios.post.mockResolvedValue({
    data: value,
  })
}

export const mockAxiosPut = (value: any = []) => {
  return mockedAxios.put.mockResolvedValue({
    data: value,
  })
}

export const mockAxiosDelete = (value: any = []) => {
  return mockedAxios.delete.mockResolvedValue({
    data: value,
  })
}

export const mockAxiosGetRejected = (value = '') => {
  return mockedAxios.get.mockRejectedValue(value)
}
