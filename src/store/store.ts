import { combineReducers, compose, createStore } from 'redux'

import { userReducer } from "./reducers/user.reducer.ts"

const rootReducer = combineReducers({

  userModule: userReducer,
})

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// export const store = createStore(rootReducer)

// declare global {
//   interface Window {
//     gStore: any;
//   }
// }

// window.gStore = store
// store.subscribe(() => {
//   console.log('Current state is:', store.getState())
// })


const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers()

export const store = createStore(rootReducer, enhancer);
(window as any).gStore = store
store.subscribe(() => {
  console.log('Current state is:', store.getState())
})