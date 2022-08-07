const INITIAL_STATE = {
  comments: {},
}

export function commentReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_COMMENTS':
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.postId]: action.comments.sort(
            (a, b) => b.createdAt - a.createdAt
          ),
        },
      }
    // case 'REMOVE_COMMENT':
    //   return {
    //     ...state,
    //     comments: state.comments.filter(
    //       (comment) => comment._id !== action.commentId
    //     ),
    //   }

    case 'ADD_COMMENTS':
      return {
        ...state,
        comments: {
          ...state.comments,
          // the key to add inside the comments:
          [action.comment.postId]: [
            ...state.comments[action.comment.postId], // <= array of the comments in this key
            action.comment, // new comment
          ],
        },
      }

    // case 'UPDATE_COMMENT':
    //   return {
    //     ...state,
    //     comments: state.comments.map((comment) =>
    //       comment._id === action.comment._id ? action.comment : comment
    //     ),
    //   }
    default:
      return state
  }
}
