import { store } from "../store.ts"
import { userService } from "../../services/user.service.ts"
import { SET_USER, ADD_JOB, DELETE_JOB, UPDATE_JOB, SET_FILTER_BY, SET_IS_LOADING, RESET_FILTER_AND_SORT_BY, SET_SORT_BY } from '../reducers/user.reducer.ts'
import { LoginCredentials, signUpCredentials, User } from '../../types/user.types.ts'
import { Job } from '../../types/job.types.ts'
import { FilterBy, SortBy } from '../../types/filter-sort.ts'

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

export function addJob(job: Job) {
  store.dispatch({
    type: ADD_JOB,
    job
  })
  _updateUser()
}

export function deleteJob(job_id: string) {
  store.dispatch({
    type: DELETE_JOB,
    job_id
  })
  _updateUser()
}

export function editJob(job: Job) {
  store.dispatch({
    type: UPDATE_JOB,
    job
  })
  _updateUser()
}

export async function loadJobs(user_id: string, filterBy: FilterBy, sortBy: SortBy) {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  try {
    const user = await userService.getById(user_id, filterBy, sortBy)
    store.dispatch({ type: SET_USER, user: user })
  } catch (error) {
    console.log(error)
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false })
  }
}




async function _updateUser() {
  try {
    const loggedInUser = store.getState().userModule.loggedInUser
    if (loggedInUser) {
      await userService.update(loggedInUser)
    } else {
      console.log('No logged in user to update')
    }
  } catch (error) {
    console.log('error:', error)
    throw error
  }
}

export function setFilterBy(filterBy: FilterBy) {
  store.dispatch({ type: SET_FILTER_BY, filterBy })
}
export function setSortBy(sortBy: SortBy) {
  store.dispatch({ type: SET_SORT_BY, sortBy })
}

export function resetFilterAndSortBy() {
  store.dispatch({ type: RESET_FILTER_AND_SORT_BY })
}