export interface IAuthLogin {
  email: string
  password: string
}

export interface IUserFetch {
  id?: number
  token: string
}

enum EnglishLevel {
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
}

export interface IUserCreate extends IUser {
  token: string
}
