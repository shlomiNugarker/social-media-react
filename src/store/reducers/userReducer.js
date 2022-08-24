const INITIAL_STATE = {
  loggedInUser: null,
  users: null,
  usersToAdd: null,
  filterByUsers: null,
}

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_USERS':
      // console.log('SET_USERS')
      return {
        ...state,
        users: action.users,
      }
    case 'SET_FILTER_BY_USERS':
      // console.log('SET_FILTER_BY_USERS')
      return {
        ...state,
        filterByUsers: { ...action.filterByUsers },
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
