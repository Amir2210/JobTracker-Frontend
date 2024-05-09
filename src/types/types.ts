export type User = {
  fullName: string,
  userName: string,
  _id: string
}

export type UserState = {
  loggedInUser: User,
  isLoading: boolean,
}

export type LoginCredentials = {
  userName: string,
  password: string
}
export type signUpCredentials = {
  userName: string,
  password: string,
  fullName: string
}

