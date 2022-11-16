export interface IAuthLogin {
  email: string
  password: string
}

export interface IUserFetch {
  id?: string
  email: string
  token: string
}

export interface IUser {
  id?: number
  name: string
  email: string
  englishLevel: string
  skills: string
  cvLink: string
  isAdmin: boolean
  isSuperadmin?: boolean
  team?: string
}
