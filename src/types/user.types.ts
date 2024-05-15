import { Job } from './job.types'

export type User = {
  fullName: string,
  userName: string,
  _id: string
  jobs: Job[]
}

export type UserState = {
  loggedInUser: User | null,
  isLoading: boolean,
}

export type LoginCredentials = {
  userName: string,
  password: string
}
export type signUpCredentials = {
  userName: string,
  password: string,
  fullName: string,
}

export type UserModule = {
  userModule: UserState
}

