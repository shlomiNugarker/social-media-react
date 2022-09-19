const INITIAL_STATE = {
  loggedInUser: null,
  users: null, // object map
  usersToAdd: null,
  filterByUsers: null,
  connectedUsers: [],
  isLogingLoading: false,
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
    case 'SET_IS_LOADING_LOGING':
      // console.log('SET_FILTER_BY_USERS')
      return {
        ...state,
        isLogingLoading: action.bool,
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

    case 'Add_USER':
      return {
        ...state,
        users: [...state.users, action.user],
      }
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((user) => {
          return user._id === action.user._id ? action.user : user
        }),
      }

    case 'UPDATE_LOGGED_IN_USER':
      // console.log('UPDATE_LOGGED_IN_USER', action.user)
      return {
        ...state,
        loggedInUser: action.user,
      }

    // case 'REMOVE_USER':
    //   return {
    //     ...state,
    //     loggedInUser: null,
    //   }

    case 'SET_CONNECTED_USERS':
      // console.log('SET_CONNECTED_USERS', action.connectedUsers)
      return {
        ...state,
        connectedUsers: action.connectedUsers,
      }

    case 'ADD_CONNECTED_USER':
      // console.log('ADD_CONNECTED_USER', action.connectedUser)
      return {
        ...state,
        connectedUsers: [...state.connectedUsers, action.connectedUser],
      }

    default:
      return state
  }
}
