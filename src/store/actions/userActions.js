import { userService } from '../../services/user/userService'

export function getUsers() {
  return async (dispatch) => {
    const users = await userService.getUsers()
    dispatch({ type: 'GET_USERS', users })
  }
}
export function login(userCred) {
  return async (dispatch) => {
    const user = await userService.login(userCred)
    dispatch({ type: 'LOGIN', user })
  }
}
export function getLoggedinUser() {
  console.log('getLoggedinUser')
  return async (dispatch) => {
    const user = await userService.getLoggedinUser()
    console.log(user)
    dispatch({ type: 'GET_LOGGEDIN_USER', user })
  }
}
export function signup(userCred) {
  return async (dispatch) => {
    const user = await userService.signup(userCred)
    dispatch({ type: 'SIGNUP', user })
  }
}
export function logout(userCred) {
  return async (dispatch) => {
    await userService.logout(userCred)
    dispatch({ type: 'LOGOUT' })
  }
}

export function updateUser(user) {
  return async (dispatch) => {
    await userService.update(user)
    dispatch({ type: 'UPDATE_USER', user })
  }
}

export function removeUser(userId) {
  return async (dispatch) => {
    await userService.remove(userId)
    dispatch({ type: 'REMOVE_USER', userId })
  }
}

export function getById(userId) {
  return async (dispatch) => {
    const user = await userService.getById(userId)
    // dispatch({ type: 'GET_BY_ID', userId })
  }
}
