import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setCurrPage } from '../store/actions/postActions'
import { Messaging } from '../cmps/message/Messaging'
import {
  addTempChat,
  removeTempChat,
  loadChats,
  saveChat,
} from '../store/actions/chatActions'
import { useParams } from 'react-router-dom'
import { userService } from '../services/user/userService'
import { utilService } from '../services/utilService'
import {
  saveActivity,
  setUnreadActivitiesIds,
} from '../store/actions/activityAction'
import loadingGif from '../assets/imgs/loading-gif.gif'
import { updateUser } from '../store/actions/userActions'

// Custom hook to manage chat-related functionality
function useChat(loggedInUser, chats, params) {
  const dispatch = useDispatch()
  const [isUserChatExist, setIsUserChatExist] = useState(undefined)
  const [messagesToShow, setMessagesToShow] = useState(null)
  const [chooseenChatId, setChooseenChatId] = useState(null)
  const [isNewChat, setIsNewChat] = useState(false)
  const [theNotLoggedUserChat, setTheNotLoggedUserChat] = useState(null)
  const [chatWith, setChatWith] = useState(null)

  // Check if chat exists with the user from URL params
  const checkIfChatExist = () => {
    return new Promise((resolve, reject) => {
      if (!chats) return reject(false)
      
      const isChatExist = chats.some(chat => 
        chat.userId === params.userId || chat.userId2 === params.userId
      )
      
      if (isChatExist) resolve(isChatExist)
      else reject(isChatExist)
    })
  }

  // Find chat by user ID
  const findChat = (userId) => {
    return chats.find(chat => 
      chat.userId === userId || chat.userId2 === userId
    )
  }

  // Get the user that is not the logged-in user from the chat
  const getTheNotLoggedUserChat = async (chat) => {
    if (!chat || !loggedInUser) return null
    
    let userId
    if (loggedInUser._id !== chat.userId) userId = chat.userId
    else if (loggedInUser._id !== chat.userId2) userId = chat.userId2
    
    return await userService.getById(userId) || null
  }

  // Create a new chat object
  const createChat = (userId) => {
    return {
      _id: utilService.makeId(7),
      userId,
      userId2: loggedInUser?._id,
      messages: [],
      createdAt: new Date().getTime(),
    }
  }

  // Create a new message object
  const createNewMsg = (txt) => {
    return {
      _id: utilService.makeId(24),
      txt,
      userId: loggedInUser._id,
      createdAt: new Date().getTime(),
    }
  }

  // Load the non-logged-in user's data
  const loadNotLoggedUser = async (chat) => {
    const user = await getTheNotLoggedUserChat(chat) || null
    setTheNotLoggedUserChat(user)
    setChatWith(user)
  }

  // Open or create a chat
  const openChat = async () => {
    if (isUserChatExist === true) {
      const chatToShow = findChat(params.userId)
      await loadNotLoggedUser(chatToShow)
      setChooseenChatId(chatToShow._id)
      setMessagesToShow(chatToShow.messages)
    } else if (isUserChatExist === false) {
      if (!params.userId || !chats) return
      const newChat = createChat(params.userId)
      dispatch(addTempChat(newChat))
      setIsNewChat(true)
      await loadNotLoggedUser(newChat)
      setChooseenChatId(newChat._id)
      setMessagesToShow(newChat.messages)
    }
  }

  // Handle sending a message
  const onSendMsg = (txt) => {
    const newMsg = createNewMsg(txt)
    const chatIdx = chats.findIndex((chat) => chat._id === chooseenChatId)
    const chatToUpdate = { ...chats[chatIdx] }
    
    chatToUpdate.messages.push(newMsg)
    chatToUpdate.users = [
      loggedInUser?.fullname,
      theNotLoggedUserChat?.fullname,
    ]
    
    if (isNewChat) {
      dispatch(removeTempChat(chatToUpdate._id))
      delete chatToUpdate._id
    }
    
    setIsNewChat(false)

    dispatch(saveChat(chatToUpdate)).then((savedChat) => {
      setMessagesToShow(savedChat.messages)
      if (savedChat) {
        const newActivity = {
          type: 'private-message',
          createdBy: loggedInUser?._id,
          createdTo: loggedInUser._id === savedChat.userId
            ? savedChat.userId2
            : savedChat.userId,
          chatId: savedChat._id,
        }
        dispatch(saveActivity(newActivity))
      }
    })
  }

  return {
    isUserChatExist,
    setIsUserChatExist,
    messagesToShow,
    setMessagesToShow,
    chooseenChatId,
    setChooseenChatId,
    theNotLoggedUserChat,
    setTheNotLoggedUserChat,
    chatWith,
    setChatWith,
    checkIfChatExist,
    openChat,
    onSendMsg,
    getTheNotLoggedUserChat
  }
}

function Message() {
  const dispatch = useDispatch()

  const params = useParams()

  const { loggedInUser } = useSelector((state) => state.userModule)
  const { chats } = useSelector((state) => state.chatModule)

  const {
    isUserChatExist,
    setIsUserChatExist,
    messagesToShow,
    setMessagesToShow,
    chooseenChatId,
    setChooseenChatId,
    theNotLoggedUserChat,
    setTheNotLoggedUserChat,
    chatWith,
    setChatWith,
    checkIfChatExist,
    openChat,
    onSendMsg,
    getTheNotLoggedUserChat
  } = useChat(loggedInUser, chats, params)

  useEffect(() => {
    dispatch(setCurrPage('message'))
    const userId = loggedInUser?._id
    if (!userId) return
    
    dispatch(loadChats(userId)).then(() => {
      checkIfChatExist()
        .then((bool) => {
          if (params.userId === loggedInUser._id) return
          setIsUserChatExist(bool)
          openChat()
        })
        .catch((bool) => {
          if (params.userId === loggedInUser._id) return
          setIsUserChatExist(bool)
          openChat()
        })
    })
  }, [loggedInUser, params.userId, isUserChatExist])

  useEffect(() => {
    return async () => {
      await updateLastSeenLoggedUser()
      dispatch(setUnreadActivitiesIds())
    }
  }, [])

  const updateLastSeenLoggedUser = async () => {
    const lastSeenMsgs = new Date().getTime()
    await dispatch(updateUser({ ...loggedInUser, lastSeenMsgs }))
  }

  if (!chats)
    return (
      <div className="message-page">
        <div className="gif-container">
          <img className="loading-gif" src={loadingGif} alt="" />
        </div>
      </div>
    )
  return (
    <section className="message-page">
      <Messaging
        chats={chats}
        messagesToShow={messagesToShow}
        setMessagesToShow={setMessagesToShow}
        chooseenChatId={chooseenChatId}
        setChooseenChatId={setChooseenChatId}
        chatWith={chatWith}
        setChatWith={setChatWith}
        getTheNotLoggedUserChat={getTheNotLoggedUserChat}
        setTheNotLoggedUserChat={setTheNotLoggedUserChat}
        theNotLoggedUserChat={theNotLoggedUserChat}
        onSendMsg={onSendMsg}
      />
      <div className="right-side-message">
        <p>This ad could be yours</p>
      </div>
    </section>
  )
}

export default Message
