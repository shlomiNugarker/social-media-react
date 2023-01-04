const INITIAL_STATE = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/' : '/localhost:3030/',
  posts: null,
  filterByPosts: null,
  currPage: null,
  pageNumber: 1,
  isPostsLoading: false,
  postsLength: null,
}

export function postReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_CURR_PAGE':
      return {
        ...state,
        currPage: action.page,
      }
    case 'SET_NEXT_PAGE':
      return {
        ...state,
        pageNumber: action.page ? action.page : state.pageNumber + 1,
      }

    case 'SET_IS_POSTS_LOADING':
      return {
        ...state,
        isPostsLoading: action.isLoading,
      }

    case 'SET_POSTS_LENGTH':
      return {
        ...state,
        postsLength: action.postsLength,
      }
    case 'ADD_FILTER_BY_POSTS':
      return {
        ...state,
        filterByPosts: { ...state.filterByPosts, ...action.filterByPosts },
      }
    case 'SET_FILTER_BY_POSTS':
      return {
        ...state,
        filterByPosts: action.filterByPosts,
      }
    case 'SET_POSTS':

      return {
        ...state,
        posts: [...action.posts],
      }
    case 'ADD_POST':
      return {
        ...state,
        posts: [action.post, ...state.posts],
      }
    case 'ADD_POSTS':
      return {
        ...state,
        posts: [...state.posts, ...action.posts],
      }
    case 'UPDATE_POST':
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
