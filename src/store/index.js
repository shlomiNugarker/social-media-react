import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { chatReducer } from './reducers/chatReducer'
import { postReducer } from './reducers/postReducer'
import { userReducer } from './reducers/userReducer'
import { activityReducer } from './reducers/activityReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  postModule: postReducer,
  userModule: userReducer,
  chatModule: chatReducer,
  activityModule: activityReducer,
})

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)
