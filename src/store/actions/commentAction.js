import { commentService } from '../../services/comment/commentService'

export function loadComment() {
  return async (dispatch, getState) => {
    try {
      const { filterBy } = getState().commentModule
      const comments = await commentService.query(filterBy)
      dispatch({ type: 'SET_COMMENTS', comments })
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
      const addedComment = await commentService.save(comment)
      comment._id
        ? dispatch({ type: 'UPDATE_COMMENT', addedComment })
        : dispatch({ type: 'ADD_COMMENT', addedComment })
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
