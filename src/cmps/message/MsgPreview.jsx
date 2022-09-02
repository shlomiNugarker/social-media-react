import { useSelector } from 'react-redux'
import { ReactSnip } from '@strg/react-snip'
import TimeAgo from 'react-timeago'
import { userService } from '../../services/user/userService'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import loadingGif from '../../assets/imgs/loading-circle.gif'

export function MsgPreview({
  chat,
  setMessagesToShow,
  setChatWith,
  chatWith,
  chooseenChatId,
  setChooseenChatId,
  getTheNotLoggedUserChat,
}) {
  const history = useHistory()
  const params = useParams()

  const [theNotLoggedUserChat, setTheNotLoggedUserChat] = useState(null)
  const [unreadMsgsCount, setUnreadMsgsCount] = useState(0)

  const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
  const { unreadActivities } = useSelector((state) => state.activityModule)
  const { unreadMessages } = useSelector((state) => state.activityModule)

  const getUnreadCountMsgs = () => {
    let countMsgs = 0
    unreadMessages.forEach((chatId) => {
      if (chat._id === chatId) countMsgs++
    })
    setUnreadMsgsCount(countMsgs)
  }

  const lastMsg =
    chat.messages[chat.messages.length - 1]?.txt || 'No Messages yet..'
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
    // if (theNotLoggedUserChat?._id !== params.userId) {
    //   history.push(`/main/message/${theNotLoggedUserChat?._id}`)
    // }
  }

  useEffect(() => {
    loadNotLoggedUser(chat)
    getUnreadCountMsgs()
    return () => {}
  }, [])

  const isChatChooseen = chooseenChatId === chat._id ? 'chooseen-chat' : ''
  const containerStyle = `container ${isChatChooseen}`

  // console.log('render MsgPreview')

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
            {/* <ReactSnip lines={1} method={'css'}></ReactSnip> */}

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
