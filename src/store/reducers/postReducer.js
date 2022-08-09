const INITIAL_STATE = {
  posts: null,
  filterBy: null,
  // userPosts: null,
}

export function postReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.posts,
      }

    case 'ADD_POST':
      console.log('add post reducer')
      return {
        ...state,
        posts: [...state.posts, action.post],
      }
    case 'ADD_POSTS':
      console.log('add posts reducer')
      return {
        ...state,
        posts: [...new Set(...state.posts, ...action.posts)],
      }
    case 'ADD_COMMENT':
      const { comment } = action
      console.log('add comment reducer')
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === comment.postId) {
            const postToReturn = { ...post }
            postToReturn.comments.unshift(comment)
            return postToReturn
          }
          return post
        }),
      }

    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map((post) => {
          return post._id === action.post._id ? action.post : post
        }),
      }

    default:
      return state
  }
}
