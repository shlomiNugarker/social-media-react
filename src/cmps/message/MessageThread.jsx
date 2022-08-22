import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { ThreadMsgList } from './ThreadMsgList'
import { userService } from '../../services/user/userService'

export function MessageThread({ messages }) {
  const { loggedInUser } = useSelector((state) => state.userModule)

  console.log(messages)

  return (
    <section className="message-thread">
      <header className="header-message-thread">
        <div>
          <div className="img-profile">
            <img src={loggedInUser?.imgUrl} alt="" className="img" />
          </div>
          <div className="fullname">fullname</div>
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
        <ThreadMsgList messages={messages} />
      </div>

      <form className="send-msg-container">
        <div className="input-container">
          <textarea type="text" placeholder="Write a message..." />
        </div>

        <div className="btns-container">
          <button>Send</button>
        </div>
      </form>
    </section>
  )
}
