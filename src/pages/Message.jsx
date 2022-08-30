import { useCallback, useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrPage } from '../store/actions/postActions'
import { Messaging } from '../cmps/message/Messaging'
import {
  addTempChat,
  removeTempChat,
  loadChats,
  saveChat,
} from '../store/actions/chatActions'
import { useHistory, useParams } from 'react-router-dom'
import { userService } from '../services/user/userService'
import { utilService } from '../services/utilService'

export function Message() {
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()

  const { loggedInUser } = useSelector((state) => state.userModule)
  const { chats } = useSelector((state) => state.chatModule)

  const [isUserChatExist, setIsUserChatExist] = useState(undefined)
  const [messagesToShow, setMessagesToShow] = useState(null)
  const [chooseenChatId, setChooseenChatId] = useState(null)
  const [isNewChat, setIsNewChat] = useState(false)
  const [theNotLoggedUserChat, setTheNotLoggedUserChat] = useState(null)
  const [chatWith, setChatWith] = useState(null)

  useEffect(() => {
    console.log('use effect')
    dispatch(setCurrPage('message'))
    const userId = loggedInUser?._id
    console.log({ userId })
    if (!userId) return
    dispatch(loadChats(userId)).then((chats1) => {
      console.log('in then chats', chats)
      checkIfChatExist()
        .then((bool) => {
          console.log('then checkIfChatExist')
          setIsUserChatExist(bool)
          openChat()
        })
        .catch((bool) => {
          console.log('chtch checkIfChatExist')
          setIsUserChatExist(bool)
          openChat()
        })
    })
  }, [loggedInUser, params.userId, isUserChatExist])

  const checkIfChatExist = () => {
    const promise = new Promise((resolve, reject) => {
      if (!chats) {
        console.log('no cats')
      } else {
        const isChatExist = chats.some((chat) => {
          return chat.userId === params.userId || chat.userId2 === params.userId
        })
        console.log({ isChatExist }, 'from chack')
        if (isChatExist) resolve(isChatExist)
        else {
          reject(isChatExist)
        }
      }
    })
    return promise
  }

  const openChat = async () => {
    console.log('open chat')
    console.log({ isUserChatExist })
    if (isUserChatExist === true) {
      const chatToShow = findChat(params.userId)
      setChooseenChatId(chatToShow._id)
      setMessagesToShow(chatToShow.messages)
      await loadNotLoggedUser(chatToShow)
    } else if (isUserChatExist === false) {
      // OPEMIMG TEMP CHAT UNTIL THE FIRST MSG SENT,
      // THEN SAVE IT IN MONGO- NEED TO REMOVE THE ID BEFORE
      if (!params.userId || !chats) return
      const newChat = createChat(params.userId)
      dispatch(addTempChat(newChat))
      setIsNewChat(true)
      await loadNotLoggedUser(newChat)
      setChooseenChatId(newChat._id)
      setMessagesToShow(newChat.messages)
    }
  }

  useEffect(() => {}, [chats])

  const onSendMsg = (txt) => {
    const newMsg = createNewMsg(txt)
    const chatIdx = chats.findIndex((chat) => chat._id === chooseenChatId)
    const chatToUpdate = { ...chats[chatIdx] }
    chatToUpdate.messages.push(newMsg)
    chatToUpdate.users = [loggedInUser.fullname, theNotLoggedUserChat.fullname]
    if (isNewChat) {
      dispatch(removeTempChat(chatToUpdate._id))
      delete chatToUpdate._id
    }
    setIsNewChat(false)
    dispatch(saveChat(chatToUpdate)).then((savedChat) => {
      setMessagesToShow(savedChat.messages)
      console.log(chatToUpdate)
    })
  }

  const createNewMsg = (txt) => {
    return {
      _id: utilService.makeId(24),
      txt,
      userId: loggedInUser._id,
      createdAt: new Date().getTime(),
    }
  }

  const createChat = (userId) => {
    return {
      _id: utilService.makeId(7),
      userId,
      userId2: loggedInUser?._id,
      messages: [],
      createdAt: new Date().getTime(),
    }
  }

  const loadNotLoggedUser = async (chat) => {
    const user = await getTheNotLoggedUserChat(chat)
    setTheNotLoggedUserChat(user)
    setChatWith(user)
  }

  const findChat = (userId) => {
    return chats.find((chat) => {
      return chat.userId === userId || chat.userId2 === userId
    })
  }

  const getTheNotLoggedUserChat = async (chat) => {
    let userId
    if (loggedInUser._id !== chat.userId) userId = chat.userId
    else if (loggedInUser._id !== chat.userId2) userId = chat.userId2
    return userService.getById(userId)
  }

  // console.log('render Message')
  if (!chats) return
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
