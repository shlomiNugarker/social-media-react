import { userService } from '../../services/user/userService'

export function getUsers() {
  return async (dispatch, getState) => {
    try {
      const { filterByUsers } = getState().userModule
      const users = await userService.getUsers(filterByUsers)
      dispatch({ type: 'SET_USERS', users })
    } catch (err) {
      console.log('cannot get users:', err)
    }
  }
}

export function setUsers(users) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: 'SET_USERS', users })
    } catch (err) {
      console.log('cannot get users:', err)
    }
  }
}

export function setFilterByUsers(filterByUsers) {
  // console.log({ filterByUsers })
  return async (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY_USERS', filterByUsers })
  }
}

export function login(userCred) {
  return async (dispatch) => {
    try {
      const user = await userService.login(userCred)
      dispatch({ type: 'LOGIN', user })
      return user
    } catch (err) {
      console.log("can't do login:", err)
      throw new Error(err)
    }
  }
}
export function getLoggedinUser() {
  return async (dispatch) => {
    try {
      const user = await userService.getLoggedinUser()
      dispatch({ type: 'GET_LOGGEDIN_USER', user })
    } catch (err) {
      console.log('cannot getLoggedinUser:', err)
    }
  }
}
export function signup(userCred) {
  return async (dispatch) => {
    try {
      const user = await userService.signup(userCred)
      dispatch({ type: 'SIGNUP', user })
    } catch (err) {
      console.log('cannot signup:', err)
    }
  }
}
export function logout() {
  return async (dispatch) => {
    try {
      await userService.logout()
      dispatch({ type: 'LOGOUT' })
    } catch (err) {
      console.log('cannot logout:', err)
    }
  }
}

export function updateUser(user) {
  return async (dispatch, getState) => {
    const savedUser = await userService.update(user)
    console.log('updateUser', user)
    if (savedUser._id === (await getLoggedinUser._id)) {
      dispatch({ type: 'UPDATE_LOGGED_IN_USER', user: savedUser })
    } else {
      // dispatch({ type: 'UPDATE_USER', user: savedUser })
    }
    return savedUser
  }
}

export function removeUser(userId) {
  return async (dispatch) => {
    try {
      await userService.remove(userId)
      dispatch({ type: 'REMOVE_USER', userId })
    } catch (err) {
      console.log('cannot remove user', err)
    }
  }
}

export function getUserById(userId) {
  return async (dispatch, getState) => {
    try {
      const { users } = getState().userModule
      if (users[userId]) return users[userId]

      const user = await userService.getById(userId)
      dispatch({ type: 'SAVE_USER', user: user })
      return user
    } catch (err) {
      console.log('cannot getUserById:', err)
    }
  }
}
