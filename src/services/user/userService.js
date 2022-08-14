import { httpService } from '../httpService'
// import { socketService } from '../socket.service'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  getUsers,
  getById,
  remove,
  update,
  // addConnection,
}

async function getUsers() {
  return await httpService.get(`user`)
}

async function getById(userId) {
  const user = await httpService.get(`user/${userId}`)

  return user
}
function remove(userId) {
  return httpService.delete(`user/${userId}`)
}

async function update(user) {
  user = await httpService.put(`user/${user._id}`, user)
  // Handle case in which admin updates other user's details
  if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
  return user
}

async function login(userCred) {
  const user = await httpService.post('auth/login', userCred)
  if (user) return _saveLocalUser(user)
}
async function signup(userCred) {
  const user = await httpService.post('auth/signup', userCred)

  return _saveLocalUser(user)
}
async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)

  return await httpService.post('auth/logout')
}

function _saveLocalUser(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}

// ;(async () => {
//   console.log('IFI !')
//   const users = await getUsers()

//   console.log('users: ', users)
// })()
