export interface IAuthLogin {
  email: string
  password: string
}

export interface IUserFetch {
  id?: number
  token: string
}

export enum EnglishLevel {
  beginner = 'beginner',
  intermediate = 'intermediate',
  advanced = 'advanced',
}

export interface IUser {
  id?: number
  name: string
  email: string
  englishLevel?: EnglishLevel
  skills?: string
  cvLink?: string
  isAdmin: boolean
  isSuperadmin?: boolean
  team?: string
  teamId?: number
}

export interface IUserCreate extends IUser {
  token: string
}
