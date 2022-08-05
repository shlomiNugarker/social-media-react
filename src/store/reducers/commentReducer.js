const INITIAL_STATE = {
  comments: [],
}

export function commentReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_COMMENTS':
      return {
        ...state,
        comments: action.comments,
      }
    case 'REMOVE_COMMENT':
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment._id !== action.commentId
        ),
      }

    case 'ADD_COMMENTS':
      return {
        ...state,
        comments: [...action.comments, ...state.comments],
      }

    case 'UPDATE_COMMENT':
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment._id === action.comment._id ? action.comment : comment
        ),
      }
    default:
      return state
  }
}
