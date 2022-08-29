import { httpService } from '../httpService'

const ENDPOINT = 'post'

export const postService = {
  query,
  getById,
  remove,
  save,
  getPostsLength,
}

async function query(filterBy = {}) {
  return await httpService.get(ENDPOINT, filterBy)
}
async function getPostsLength(filterBy = {}) {
  return await httpService.get(ENDPOINT + '/length', filterBy)
}

async function getById(id) {
  return await httpService.get(`${ENDPOINT}/${id}`)
}

async function remove(id) {
  return await httpService.delete(`${ENDPOINT}/${id}`)
}

async function save(post) {
  return post._id
    ? await httpService.put(`${ENDPOINT}/${post._id}`, post)
    : await httpService.post(ENDPOINT, post)
}

// ;(async () => {
//   console.log('IFI !')
//   const posts = await query()

//   console.log('posts: ', posts)
// })()
