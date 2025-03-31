import { FilterBy, SortBy } from './filter-sort'
import { Job } from './job.types'

export type User = {
  fullName: string,
  userName: string,
  _id: string
  jobs: Job[]
  allJobs?: Job[]
  totalFilteredJobs?: number
  favoriteJobs: Job[]
}

export type UserState = {
  loggedInUser: User | null,
  isLoading: boolean,
  filterBy: FilterBy
  sortBy: SortBy
}

export type LoginCredentials = {
  userName: string,
  password: string,
  recaptchaToken: string
}
export type signUpCredentials = {
  userName: string,
  password: string,
  fullName: string,
}

export type UserModule = {
  userModule: UserState
}


