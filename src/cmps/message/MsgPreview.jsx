import { useSelector } from 'react-redux'
import { ReactSnip } from '@strg/react-snip'
import { useEffect, useState } from 'react'
import loadingGif from '../../assets/imgs/loading-circle.gif'

export function MsgPreview({
  chat,
  chats,
  setMessagesToShow,
  setChatWith,
  chatWith,
  chooseenChatId,
  setChooseenChatId,
  getTheNotLoggedUserChat,
}) {
  const [theNotLoggedUserChat, setTheNotLoggedUserChat] = useState(null)
  const [unreadMsgsCount, setUnreadMsgsCount] = useState(0)

  const { unreadMessages } = useSelector((state) => state.activityModule)

  const getUnreadCountMsgs = () => {
    let countMsgs = 0
    unreadMessages.forEach((chatId) => {
      if (chat._id === chatId) countMsgs++
    })
    setUnreadMsgsCount(countMsgs)
  }

  const lastMsg =
    chat.messages[chat.messages?.length - 1]?.txt || 'No Messages yet..'
  const dateToShow = new Date(chat.messages[0]?.createdAt || chat.createdAt)
  const slicedDate = dateToShow.toLocaleDateString().slice(0, -5)

  const loadNotLoggedUser = async (chat) => {
    const user = await getTheNotLoggedUserChat(chat)
    setTheNotLoggedUserChat(user)
  }

  const onClickChat = () => {
    setMessagesToShow(chat.messages)
    setChatWith(theNotLoggedUserChat)
    setChooseenChatId(chat._id)
  }

  useEffect(() => {
    loadNotLoggedUser(chat)
    getUnreadCountMsgs()
    return () => {}
  }, [])

  useEffect(() => {
    setMessagesToShow(chat.messages)
    setChooseenChatId(chat._id)
    return () => {}
  }, [chat, chats])

  const isChatChooseen = chooseenChatId === chat._id ? 'chooseen-chat' : ''
  const containerStyle = `container ${isChatChooseen}`

  if (!theNotLoggedUserChat)
    return (
      <div className="msg-preview">
        <span className="loading-circle">
          <img src={loadingGif} alt="" />
        </span>
      </div>
    )

  return (
    <section className="msg-preview" onClick={onClickChat}>
      <div className={containerStyle}>
        <div className="img-container">
          <img src={theNotLoggedUserChat?.imgUrl} alt="" className="img" />
          {unreadMsgsCount > 0 && (
            <span className="number">
              <p>{unreadMsgsCount}</p>
            </span>
          )}
        </div>
        <div className="details">
          <div className="fullname">
            <h1>{theNotLoggedUserChat?.fullname}</h1>

            <span title={dateToShow}>
              <ReactSnip lines={1} method={'css'}>
                {slicedDate}
              </ReactSnip>
            </span>
          </div>
          <div className="last-msg">
            <ReactSnip lines={1} method={'css'}>
              <p>{lastMsg}</p>
            </ReactSnip>
          </div>
        </div>
      </div>
    </section>
  )
}
