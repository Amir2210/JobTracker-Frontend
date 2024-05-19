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

type UserAction = SetUserAction | SetIsLoadingAction | AddJobAction

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
    default:
      return state
  }
  return state // ensuring that it returns the current state
}





