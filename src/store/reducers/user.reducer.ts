import { userService } from "../../services/user.service.ts"
import { Job } from '../../types/job.types.ts'
import { UserState } from '../../types/user.types.ts'
import { User } from '../../types/user.types.ts'
export const SET_USER: string = 'SET_USER'
// loading
export const SET_IS_LOADING: string = 'SET_IS_LOADING'
// job
export const UPDATE_JOB: string = 'UPDATE_JOB'
export const ADD_JOB: string = 'ADD_JOB'
export const DELETE_JOB: string = 'DELETE_JOB'

type SetUserAction = {
  type: typeof SET_USER
  user: User | null
}

type SetIsLoadingAction = {
  type: typeof SET_IS_LOADING;
  isLoading: boolean;
}

type AddJobAction = {
  type: typeof ADD_JOB
  job: Job
}

type editJobAction = {
  type: typeof UPDATE_JOB
  job: Job
}

type deleteJobAction = {
  type: typeof DELETE_JOB
  job_id: String
}

type UserAction = SetUserAction | SetIsLoadingAction | AddJobAction | deleteJobAction | editJobAction

const initialState: UserState = {
  loggedInUser: userService.getLoggedInUser(),
  isLoading: false,
}

export function userReducer(state: UserState = initialState, action: UserAction): UserState {
  let userJobs
  switch (action.type) {
    case SET_USER:
      if ('user' in action) {
        return { ...state, loggedInUser: action.user }
      }
      break
    case SET_IS_LOADING:
      if ('isLoading' in action) {
        return { ...state, isLoading: action.isLoading }
      }
      break
    case ADD_JOB:
      if ('job' in action && state.loggedInUser) {
        userJobs = [action.job, ...state.loggedInUser.jobs]
        return { ...state, loggedInUser: { ...state.loggedInUser, jobs: userJobs } }
      }
      break
    case DELETE_JOB:
      if ('job_id' in action && state.loggedInUser) {
        const userJobs: Job[] = [...state.loggedInUser.jobs]
        const newUserJobs: Job[] = userJobs.filter(job => job._id !== action.job_id)
        return { ...state, loggedInUser: { ...state.loggedInUser, jobs: newUserJobs } }
      }
      break
    case UPDATE_JOB:
      if ('job' in action && state.loggedInUser) {
        userJobs = state.loggedInUser.jobs.map(job => job._id === action.job._id ? action.job : job)
        return { ...state, loggedInUser: { ...state.loggedInUser, jobs: userJobs } }
      }
      break
    default:
      return state
  }
  return state // ensuring that it returns the current state
}





