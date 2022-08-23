import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { ThreadMsgList } from './ThreadMsgList'
import { userService } from '../../services/user/userService'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { SendMessageForm } from './SendMessageForm'

export function MessageThread({ messagesToShow, chatWith, onSendMsg }) {
  const { loggedInUser } = useSelector((state) => state.userModule)
  const history = useHistory()

  useEffect(() => {
    scrollToBottom()
    return () => {}
  }, [messagesToShow])

  const scrollToBottom = () => {
    var msgsContainer = document.querySelector('.user-profile-details')
    msgsContainer.scrollTop = msgsContainer.scrollHeight
  }

  return (
    <section className="message-thread">
      <header className="header-message-thread">
        <div>
          <div
            className="img-profile"
            onClick={() => history.push(`/main/profile/${chatWith?._id}`)}
          >
            <img src={chatWith?.imgUrl} alt="" className="img" />
          </div>
          <div className="fullname">{chatWith?.fullname}</div>
        </div>
        <div className="container-logo">
          <span className="logo-menu">
            <FontAwesomeIcon
              className="dots-icon"
              icon="fa-solid fa-ellipsis"
            />
          </span>
        </div>
      </header>

      <div className="user-profile-details">
        <ThreadMsgList messagesToShow={messagesToShow} />
      </div>

      <SendMessageForm onSendMsg={onSendMsg} messagesToShow={messagesToShow} />
    </section>
  )
}
