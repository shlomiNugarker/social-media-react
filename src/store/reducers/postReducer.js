const INITIAL_STATE = {
  posts: [],
  filterBy: null,
}

export function postReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.posts,
      }

    case 'ADD_POST':
      return {
        ...state,
        posts: [...state.posts, action.post],
      }

    case 'REMOVE_POST':
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.postId),
      }

    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.post._id ? action.post : post
        ),
      }
    case 'SET_FILTER_BY':
      return {
        ...state,
        filterBy: { ...action.filterBy },
      }

    default:
      return state
  }
}
