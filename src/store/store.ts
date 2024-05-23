import { combineReducers, compose, createStore } from 'redux'

import { userReducer } from "./reducers/user.reducer.ts"

const rootReducer = combineReducers({

  userModule: userReducer,
})




// const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// const enhancer = composeEnhancers()

// export const store = createStore(rootReducer, enhancer);
export const store = createStore(rootReducer);
(window as any).gStore = store
store.subscribe(() => {
  console.log('Current state is:', store.getState())
})