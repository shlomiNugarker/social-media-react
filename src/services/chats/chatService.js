import { httpService } from '../httpService'

const ENDPOINT = 'chat'

export const chatService = {
  query,
  // getById,
  // remove,
  save,
}

async function query(filterBy = {}) {
  return await httpService.get(ENDPOINT, filterBy)
}

// async function getById(id) {
//   return await httpService.get(`${ENDPOINT}/${id}`)
// }

// async function remove(id) {
//   return await httpService.delete(`${ENDPOINT}/${id}`)
// }

async function save(chat) {
  return chat._id
    ? await httpService.put(`${ENDPOINT}/${chat._id}`, chat)
    : await httpService.post(ENDPOINT, chat)
}

// ;(async () => {
//   console.log('IFI !')
//   const chats = await query()

//   console.log('chats: ', chats)
// })()
