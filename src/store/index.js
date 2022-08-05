import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { postReducer } from './reducers/postReducer'
import { userReducer } from './reducers/userReducer'
import { commentReducer } from './reducers/commentReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  postModule: postReducer,
  userModule: userReducer,
  commentModule: commentReducer,
})

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)

window.myStore = store
