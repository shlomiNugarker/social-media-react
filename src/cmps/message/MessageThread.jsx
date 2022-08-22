import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { ThreadMsgList } from './ThreadMsgList'
import { userService } from '../../services/user/userService'
import { useHistory } from 'react-router-dom'

export function MessageThread({ messagesToShow, chatWith }) {
  const { loggedInUser } = useSelector((state) => state.userModule)
  const history = useHistory()

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
          <div className="fullname">{chatWith.fullname}</div>
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
