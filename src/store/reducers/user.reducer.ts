import { userService } from "../../services/user.service.ts"
import { UserState } from '../../types/types.ts'
import { User } from '../../types/types.ts'
export const SET_USER: string = 'SET_USER'
// loading
export const SET_IS_LOADING: string = 'SET_IS_LOADING'


type SetUserAction = {
  type: typeof SET_USER
  user: User | null
}

type SetIsLoadingAction = {
  type: typeof SET_IS_LOADING;
  isLoading: boolean;
}

type UserAction = SetUserAction | SetIsLoadingAction;

const initialState: UserState = {
  loggedInUser: userService.getloggedInUser(),
  isLoading: false,
}

export function userReducer(state: UserState = initialState, action: UserAction): UserState {
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
    default:
      return state
  }
  return state // ensuring that it returns the current state
}





