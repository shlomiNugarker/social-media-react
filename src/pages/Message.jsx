import { useCallback, useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrPage } from '../store/actions/postActions'
import { Messaging } from '../cmps/message/Messaging'
import { addTempChat, loadChats, saveChat } from '../store/actions/chatActions'
import { useHistory, useParams } from 'react-router-dom'
import { userService } from '../services/user/userService'
import { utilService } from '../services/utilService'

export function Message() {
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()

  const { loggedInUser } = useSelector((state) => state.userModule)
  const { chats } = useSelector((state) => state.chatModule)

  const [isUserChatExist, setIsUserChatExist] = useState(false)
  const [messagesToShow, setMessagesToShow] = useState(null)
  const [chooseenChatId, setChooseenChatId] = useState(null)
  const [theNotLoggedUserChat, setTheNotLoggedUserChat] = useState(null)
  const [chatWith, setChatWith] = useState(null)

  useEffect(() => {
    dispatch(setCurrPage('message'))
    const userId = loggedInUser?._id

    if (userId) dispatch(loadChats(userId))
    const isChatExist = checkIfChatExist()
    setIsUserChatExist(isChatExist)
    openChat()
  }, [loggedInUser, params.userId, isUserChatExist])

  const onSendMsg = (txt) => {
    const newMsg = createNewMsg(txt)
    const chatIdx = chats.findIndex((chat) => chat._id === chooseenChatId)
    const chatToUpdate = { ...chats[chatIdx] }
    chatToUpdate.messages.push(newMsg)
    dispatch(saveChat(chatToUpdate)).then((savedChat) => {
      setMessagesToShow(savedChat.messages)
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

  // TODO: ///
  const createChat = (userId) => {
    console.log('createChat')
    return {
      userId,
      userId2: loggedInUser._id,
    }
  }

  const openChat = async () => {
    if (isUserChatExist) {
      console.log('isUserChatExist')
      const chatToShow = findChat(params.userId)
      setChooseenChatId(chatToShow._id)
      setMessagesToShow(chatToShow.messages)
      await loadNotLoggedUser(chatToShow)
    } else {
      console.log('!isUserChatExist')
      // TODO: OOPEN NEW CHAT TO START CONVERTION
      //
      // if (!params.userId) return
      // const newChat = createChat(params.userId)
      // // dispatch(addTempChat(newChat))
      // dispatch(saveChat(newChat))
      // await loadNotLoggedUser(newChat)
      // setChooseenChatId(newChat._id)
      // setMessagesToShow(newChat.messages)
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

  const checkIfChatExist = () => {
    return chats?.some((chat) => {
      return chat.userId === params.userId || chat.userId2 === params.userId
    })
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
