import { postService } from '../../services/posts/postService'
import { commentService } from '../../services/comment/commentService'

export function loadPosts() {
  return async (dispatch, getState) => {
    try {
      const { filterBy } = getState().postModule
      const posts = await postService.query(filterBy)
      dispatch({ type: 'SET_POSTS', posts })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function savePost(post) {
  return async (dispatch) => {
    try {
      const addedPost = await postService.save(post)
      post._id
        ? dispatch({ type: 'UPDATE_POST', post: addedPost })
        : dispatch({ type: 'ADD_POST', post: addedPost })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function saveComment(comment) {
  return async (dispatch) => {
    try {
      const savedComment = await commentService.save(comment)
      comment._id
        ? dispatch({ type: 'UPDATE_COMMENT', commret: savedComment })
        : dispatch({ type: 'ADD_COMMENT', comment: savedComment })
    } catch (err) {
      console.log('err:', err)
    }
  }
}
