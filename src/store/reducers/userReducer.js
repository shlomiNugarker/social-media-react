const INITIAL_STATE = {
  loggedInUser: null,
  users: null,
  usersToAdd: null,
}

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.users,
      }
    case 'LOGIN':
      return {
        ...state,
        loggedInUser: action.user,
      }
    case 'GET_LOGGEDIN_USER':
      return {
        ...state,
        loggedInUser: action.user,
      }
    case 'SIGNUP':
      return {
        ...state,
        loggedInUser: action.user,
      }
    case 'LOGOUT':
      return {
        ...state,
        loggedInUser: null,
      }

    case 'UPDATE_USER':
      return {
        ...state,
        loggedInUser: action.user,
      }

    // case 'REMOVE_USER':
    //   return {
    //     ...state,
    //     loggedInUser: null,
    //   }

    default:
      return state
  }
}
