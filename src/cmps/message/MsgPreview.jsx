import { useSelector } from 'react-redux'
import { ReactSnip } from '@strg/react-snip'
import TimeAgo from 'react-timeago'
import { userService } from '../../services/user/userService'
import { useEffect, useState } from 'react'

export function MsgPreview({ chat, setMessagesToShow, setChatWith }) {
  const [theNotLoggedUserChat, setTheNotLoggedUserChat] = useState(null)
  const lastMsg = chat.messages[0]?.txt || 'No Messages yet..'
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser)

  const dateToShow = new Date(chat.messages[0]?.createdAt || chat.createdAt)

  const slicedDate = dateToShow.toLocaleDateString().slice(0, -5)

  const getTheNotLoggedUserChat = async (chat) => {
    let userId
    if (loggedInUser._id !== chat.userId) userId = chat.userId
    else if (loggedInUser._id !== chat.userId2) userId = chat.userId2
    const user = await userService.getById(userId)
    setTheNotLoggedUserChat(user) ////////////////
  }

  useEffect(() => {
    getTheNotLoggedUserChat(chat)

    return () => {}
  }, [])

  // console.log('render MsgPreview')
  return (
    <section
      className="msg-preview"
      onClick={() => {
        setMessagesToShow(chat.messages)
        setChatWith(theNotLoggedUserChat)
      }}
    >
      <div className="container">
        <div className="img-container">
          <img src={theNotLoggedUserChat?.imgUrl} alt="" className="img" />
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
