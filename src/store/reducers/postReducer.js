const INITIAL_STATE = {
  posts: null,
  filterByPosts: null,
  currPage: null,
}

export function postReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_CURR_PAGE':
      // console.log('SET_CURR_PAGE')
      return {
        ...state,
        currPage: action.page,
      }
    case 'SET_FILTER_BY_POSTS':
      // console.log('SET_FILTER_BY_POST')
      return {
        ...state,
        filterByPosts: { ...action.filterByPosts },
      }
    case 'SET_POSTS':
      console.log('SET_POSTS', action.posts)
      return {
        ...state,
        posts: [...action.posts],
      }
    case 'ADD_POST':
      // console.log('ADD_POST')
      return {
        ...state,
        posts: [action.post, ...state.posts],
      }
    case 'ADD_POSTS':
      // console.log('ADD_POSTS')
      return {
        ...state,
        posts: [...action.posts],
      }
    case 'UPDATE_POST':
      // console.log('UPDATE_POST')
      return {
        ...state,
        posts: state.posts.map((post) => {
          return post._id === action.post._id ? action.post : post
        }),
      }

    case 'REMOVE_POST':
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.postId),
      }

    case 'ADD_COMMENT':
      // console.log('ADD_COMMENT')
      const { comment } = action
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

    case 'UPDATE_COMMENT':
      // console.log('UPDATE_COMMENT')
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.comment.postId) {
            const idx = post.comments.findIndex(
              (c) => c._id === action.comment._id
            )
            post.comments[idx] = action.comment
            return post
          } else {
            return post
          }
        }),
      }

    case 'REMOVE_COMMENT':
      // console.log('REMOVE_COMMENT')
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.comment.postId) {
            const idx = post.comments.findIndex(
              (c) => c._id === action.comment._id
            )
            post.comments.splice(idx, 1)
            return post
          } else {
            return post
          }
        }),
      }
    default:
      return state
  }
}
