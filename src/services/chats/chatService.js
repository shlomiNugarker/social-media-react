import { httpService } from '../httpService'

const ENDPOINT = 'chat'

export const postService = {
  query,
  // getById,
  // remove,
  // save,
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

// async function save(post) {
//   return post._id
//     ? await httpService.put(`${ENDPOINT}/${post._id}`, post)
//     : await httpService.post(ENDPOINT, post)
// }
console.log('sdsddsdsdsd')

;(async () => {
  console.log('IFI !')
  const posts = await query()

  console.log('posts: ', posts)
})()
