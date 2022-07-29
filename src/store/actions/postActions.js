import { postService } from '../../services/posts/postService'

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

export function removePost(postId) {
  return async (dispatch) => {
    try {
      await postService.remove(postId)
      dispatch({ type: 'REMOVE_POST', postId })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function setFilterBy(filterBy) {
  return async (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY', filterBy })
  }
}
