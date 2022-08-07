import { commentService } from '../../services/comment/commentService'

export function loadComments(postId) {
  return async (dispatch, getState) => {
    try {
      const comments = await commentService.getById(postId)
      dispatch({ type: 'SET_COMMENTS', comments, postId })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function removeComment(commentId) {
  return async (dispatch) => {
    try {
      await commentService.remove(commentId)
      dispatch({ type: 'REMOVE_COMMENT', commentId })
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
        ? dispatch({ type: 'UPDATE_COMMENT', comment: savedComment })
        : dispatch({ type: 'ADD_COMMENT', comment: savedComment })
    } catch (err) {
      console.log('err:', err)
    }
  }
}
