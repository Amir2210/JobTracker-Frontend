import { combineReducers, createStore } from 'redux'

import { userReducer } from "./reducers/user.reducer.ts"

const rootReducer = combineReducers({

  userModule: userReducer,
})

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer)

declare global {
  interface Window {
    gStore: any;
  }
}

window.gStore = store
store.subscribe(() => {
  console.log('Current state is:', store.getState())
})