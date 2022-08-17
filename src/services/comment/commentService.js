import { httpService } from '../httpService'

const ENDPOINT = 'comment'

export const commentService = {
  query,
  getById,
  remove,
  save,
}

async function query(filterBy = {}) {
  return await httpService.get(ENDPOINT, filterBy)
}

async function getById(id) {
  return await httpService.get(`${ENDPOINT}/${id}`)
}

async function remove(comment) {
  return await httpService.delete(`${ENDPOINT}/${comment._id}`, comment)
}

async function save(comment) {
  return comment._id
    ? await httpService.put(`${ENDPOINT}/${comment._id}`, comment)
    : await httpService.post(ENDPOINT, comment)
}

// ;(async () => {
//   console.log('IFI !')
//   const comments = await query()

//   console.log('comments: ', comments)
// })()
