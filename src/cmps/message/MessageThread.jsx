import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ThreadMsgList } from './ThreadMsgList'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { SendMessageForm } from './SendMessageForm'

export function MessageThread({
  messagesToShow,
  setMessagesToShow,
  chatWith,
  onSendMsg,
}) {
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
              icon="fa-solid fa-x"
              className="dots-icon"
              onClick={() => {
                setMessagesToShow(null)
              }}
            />
          </span>
        </div>
      </header>

      <div className="user-profile-details scroll-area">
        <ThreadMsgList messagesToShow={messagesToShow} />
      </div>

      <SendMessageForm onSendMsg={onSendMsg} messagesToShow={messagesToShow} />
    </section>
  )
}
