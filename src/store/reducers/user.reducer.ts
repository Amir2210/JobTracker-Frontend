import { jobsService } from '../../services/jobs.service.ts'
import { userService } from "../../services/user.service.ts"
import { FilterBy, SortBy } from '../../types/filter-sort.ts'
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
export const SET_FILTER_BY: string = 'SET_FILTER_BY'
export const SET_SORT_BY: string = 'SET_SORT_BY'
export const RESET_FILTER_AND_SORT_BY: string = 'RESET_FILTER_AND_SORT_BY: string'

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


type EditJobAction = {
  type: typeof UPDATE_JOB
  job: Job
}



type DeleteJobAction = {
  type: typeof DELETE_JOB
  job_id: String
}

type FilterJobAction = {
  type: typeof SET_FILTER_BY
  filterBy: FilterBy
}

type SortJobAction = {
  type: typeof SET_SORT_BY
  sortBy: SortBy
}

type ResetFilterAndSort = {
  type: typeof RESET_FILTER_AND_SORT_BY
}


type UserAction = SetUserAction | SetIsLoadingAction | AddJobAction | DeleteJobAction | EditJobAction | FilterJobAction | ResetFilterAndSort | SortJobAction

const initialState: UserState = {
  loggedInUser: userService.getLoggedInUser(),
  isLoading: false,
  filterBy: jobsService.getDefaultFilterBy(),
  sortBy: jobsService.getDefaultSortBy()
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
        return { ...state, loggedInUser: { ...state.loggedInUser, jobs: newUserJobs, totalFilteredJobs: state.loggedInUser.totalFilteredJobs ? state.loggedInUser.totalFilteredJobs - 1 : undefined } }
      }
      break
    case UPDATE_JOB:
      if ('job' in action && state.loggedInUser) {
        userJobs = state.loggedInUser.jobs.map(job => job._id === action.job._id ? action.job : job)
        return { ...state, loggedInUser: { ...state.loggedInUser, jobs: userJobs } }
      }
      break
    case SET_FILTER_BY:
      if ('filterBy' in action && state.loggedInUser) {
        return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }
      }
      break
    case RESET_FILTER_AND_SORT_BY:
      return { ...state, filterBy: initialState.filterBy, sortBy: initialState.sortBy }
    case SET_SORT_BY:
      if ('sortBy' in action && state.loggedInUser) {
        return { ...state, sortBy: { ...state.sortBy, ...action.sortBy } }
      }
      break
    default:
      return state
  }
  return state // ensuring that it returns the current state
}





