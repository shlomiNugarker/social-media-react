const INITIAL_STATE = {
  chats: null,
}

export function chatReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_CHATS':
      // console.log('SET_CHATS')
      return {
        ...state,
        chats: [...action.chats],
      }
    // case 'ADD_CHAT':
    //   console.log('ADD_CHAT')
    //   return {
    //     ...state,
    //     chats: [action.chat, ...state.chats],
    //   }
    // case 'ADD_CHATS':
    //   console.log('ADD_CHATS')
    //   return {
    //     ...state,
    //     chats: [...action.chats],
    //   }
    case 'UPDATE_CHAT':
      console.log('UPDATE_CHAT')
      return {
        ...state,
        chats: state.chats.map((chat) => {
          return chat._id === action.chat._id ? action.chat : chat
        }),
      }

    // case 'REMOVE_CHAT':
    //   return {
    //     ...state,
    //     chats: state.chats.filter((chat) => chat._id !== action.chatId),
    //   }

    default:
      return state
  }
}
