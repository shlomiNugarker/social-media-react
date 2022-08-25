import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { utilService } from '../../services/utilService'
import { MsgPreview } from './MsgPreview'

export function ListMsg({
  chats,
  setMessagesToShow,
  setChatWith,
  chatWith,
  setChooseenChatId,
  chooseenChatId,
  getTheNotLoggedUserChat,
  setTheNotLoggedUserChat,
  theNotLoggedUserChat,
}) {
  return (
    <section className="list-msg">
      <div className="title-container">
        <p>Messaging</p>

        <div className="logos">
          <span className="logo-menu">
            <FontAwesomeIcon
              className="dots-icon"
              icon="fa-solid fa-ellipsis"
            />
          </span>
          <span className="logo-new-msg">
            <FontAwesomeIcon icon="fa-solid fa-message" />
          </span>
        </div>
      </div>

      <div className="filter-container">
        <input type="text" placeholder="Search messages" />
      </div>

      <div className="list">
        {chats.map((chat) => (
          <MsgPreview
            key={chat._id}
            chat={chat}
            setMessagesToShow={setMessagesToShow}
            setChatWith={setChatWith}
            chatWith={chatWith}
            setChooseenChatId={setChooseenChatId}
            getTheNotLoggedUserChat={getTheNotLoggedUserChat}
            setTheNotLoggedUserChat={setTheNotLoggedUserChat}
            theNotLoggedUserChat={theNotLoggedUserChat}
            chooseenChatId={chooseenChatId}
          />
        ))}
      </div>
    </section>
  )
}
