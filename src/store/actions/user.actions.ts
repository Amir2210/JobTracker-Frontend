import { store } from "../store.ts"
import { userService } from "../../services/user.service.ts"
import { SET_USER, SET_IS_LOADING } from '../reducers/user.reducer.ts'
import { LoginCredentials, signUpCredentials, User } from '../../types/types.ts'

export async function login(credentials: LoginCredentials) {
  try {
    const user = await userService.login(credentials)
    store.dispatch({ type: SET_USER, user })
    return user
  } catch (err) {
    console.log('user actions -> Cannot login', err)
    throw err
  }
}

export async function signup(credentials: signUpCredentials) {
  try {
    const user: User = await userService.signup(credentials)
    console.log(user)
    store.dispatch({ type: SET_USER, user: user })
    return user
  } catch (err) {
    console.log('user actions -> Cannot signup', err)
    throw err
  }
}

export async function logout() {
  try {
    await userService.logout()
    store.dispatch({ type: SET_USER, user: null, })
  } catch (err) {
    console.error('user actions -> Cannot logout:', err)
    throw err
  }
}
