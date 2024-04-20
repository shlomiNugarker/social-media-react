const INITIAL_STATE = {
  chats: [],
}

export function chatReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_CHATS':
      return {
        ...state,
        chats: [...action.chats],
      }
    case 'ADD_CHAT':
      console.log('ADD_CHAT', action.chat)
      return {
        ...state,
        chats: [action.chat, ...state.chats],
      }

    case 'UPDATE_CHAT':
      return {
        ...state,
        chats: state.chats.map((chat) => {
          return chat._id === action.chat._id ? action.chat : chat
        }),
      }

    case 'REMOVE_CHAT':
      return {
        ...state,
        chats: state.chats.filter((chat) => chat._id !== action.chatId),
      }

    default:
      return state
  }
}
