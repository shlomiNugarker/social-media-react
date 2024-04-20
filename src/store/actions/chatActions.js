import { chatService } from '../../services/chats/chatService'
import { socketService } from '../../services/socket.service'

export function loadChats(userId) {
  return async (dispatch, getState) => {
    function onSuccess(chats) {
      dispatch({ type: 'SET_CHATS', chats })
      return chats
    }
    try {
      const filterBy = { userId }
      const chats = await chatService.query(filterBy)
      return onSuccess(chats)
    } catch (err) {
      console.log('err:', err)
      throw new Error(err)
    }
  }
}

export function saveChat(chat) {
  return async (dispatch) => {
    try {
      const addedChat = await chatService.save(chat)
      chat._id
        ? dispatch({ type: 'UPDATE_CHAT', chat: addedChat })
        : dispatch({ type: 'ADD_CHAT', chat: addedChat })

      chat._id
        ? socketService.emit('chat-updated', addedChat)
        : socketService.emit('chat-added', addedChat)

      return addedChat
    } catch (err) {
      console.log('err:', err)
      throw new Error(err)
    }
  }
}

export function addTempChat(chat) {
  return async (dispatch) => {
    try {
      const chatToAdd = { ...chat }
      dispatch({ type: 'ADD_CHAT', chat: chatToAdd })

      return chat
    } catch (err) {
      console.log('err:', err)
      throw new Error(err)
    }
  }
}

export function removeTempChat(chatId) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'REMOVE_CHAT', chatId })
    } catch (err) {
      console.log('err:', err)
      throw new Error(err)
    }
  }
}

export function updateChatForSocket(chat) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'UPDATE_CHAT', chat })

      return chat
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function addChatForSocket(chat) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'ADD_CHAT', chat })
      return chat
    } catch (err) {
      console.log('err:', err)
    }
  }
}
