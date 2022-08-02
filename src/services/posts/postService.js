import { utilService } from '../utilService'
import { httpService } from '../httpService'
// import { storageService } from '../asyncStorageService'

const KEY = 'post_db'

const ENDPOINT = 'post'

export const postService = {
  query,
  getById,
  remove,
  save,
  getEmptyPost,
  getEmptyComment,
}

const gPosts = _createPosts()

async function query(filterBy = {}) {
  return await httpService.get(ENDPOINT, filterBy)
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

function getEmptyPost(title = '', userId = 'userId', body = '', tags = null) {
  return Promise.resolve({
    _id: 'p-' + utilService.makeId(),
    createdAt: new Date().getTime(),
    title,
    body,
    userId,
    tags,
    reactions: 0,
    comments: {
      comments: null,
      total: 0,
    },
  })
}
function getEmptyComment(
  body = 'New comment',
  _id = 'userId',
  username = 'Shlomin1231'
) {
  return Promise.resolve({
    _id: 'c-' + utilService.makeId(),
    body,
    createdAt: new Date().getTime(),
    user: {
      _id,
      username,
    },
  })
}

function _createPosts() {
  let posts = utilService.loadFromStorage(KEY)
  if (!posts || !posts.length) {
    posts = []
    utilService.saveToStorage(KEY, posts)
  }
  return posts
}

function _createPost(title) {
  return {
    _id: 'p-' + utilService.makeId(),
    title,
    body: utilService.getLoremIpsum(25),
    userId: 9,
    tags: ['history', 'american', 'crime'],
    reactions: 2,
    createdAt: new Date().getTime(),
    imgUrl: 'https://picsum.photos/300/300',
    name: 'Temp name',
    comments: {
      comments: [_createComment()],
      total: 1,
    },
  }
}

function _createComment(body = '') {
  return {
    _id: 'c-' + utilService.makeId(),
    body: utilService.getLoremIpsum(10),
    userId: 'userId',
    createdAt: new Date().getTime(),
    user: {
      _id: 'userId',
      username: 'eburras1q',
    },
  }
}

// ;(async () => {
//   console.log('IFI !')
//   const posts = await query()

//   console.log('posts: ', posts)
// })()
