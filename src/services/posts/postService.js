import { utilService } from '../utilService'
// import { httpService } from '../httpService'
import { storageService } from '../asyncStorageService'

const KEY = 'post_db'

const ENDPOINT = 'post'
// const BASE_URL =
//   process.env.NODE_ENV !== 'development' ? '/api/post' : '//localhost:3030/api/post/'

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
  // return await httpService.get(ENDPOINT, filterBy)
  return storageService.query(KEY)
}

async function getById(id) {
  // return await httpService.get(`${ENDPOINT}/${id}`)
  return storageService.getById(KEY, id)
}

async function remove(id) {
  // return await httpService.delete(`${ENDPOINT}/${id}`)
  return storageService.remove(KEY, id)
}

async function save(post) {
  // return post._id
  //   ? await httpService.put(`${ENDPOINT}/${post._id}`, post)
  //   : await httpService.post(ENDPOINT, post)
  return post._id
    ? storageService.put(KEY, post)
    : storageService.post(KEY, post)
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
    posts = [
      _createPost('Post-1'),
      _createPost('Post-2'),
      _createPost('Post-4'),
      _createPost('Post-5'),
      _createPost('Post-6'),
      _createPost('Post-7'),
      _createPost('Post-8'),
      _createPost('Post-9'),
      _createPost('Post-10'),
      _createPost('Post-11'),
    ]
    utilService.saveToStorage(KEY, posts)
  }
  return posts
}

function _createPost(title) {
  return {
    _id: 'p-' + utilService.makeId(),
    title,
    body: "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
    userId: 9,
    tags: ['history', 'american', 'crime'],
    reactions: 2,
    createdAt: new Date().getTime(),
    comments: {
      comments: [_createComment('This is some awesome comment')],
      total: 1,
    },
  }
}

function _createComment(body) {
  return {
    _id: 'c-' + utilService.makeId(),
    body,
    userId: 'userId',
    createdAt: new Date().getTime(),
    user: {
      _id: 'userId',
      username: 'eburras1q',
    },
  }
}

console.log('adfaf')

;(async () => {
  var posts = await storageService.query('post')

  console.log(posts)
  console.log('posts')
})()
