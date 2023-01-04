import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
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
  const [chatsToShow, setChatsToShow] = useState(null)

  const [field, setField] = useState({ txt: '' })

  const handleChange = async ({ target }) => {
    const field = target.name
    let value = target.type === 'number' ? +target.value || '' : target.value
    setField({ [field]: value })
    setFilter(value)
  }

  const setFilter = (txt) => {
    const regex = new RegExp(txt, 'i')
    const filteredChats = [...chats].filter((chat) => {
      return regex.test(chat.users[0]) || regex.test(chat.users[1])
    })

    setChatsToShow(filteredChats)
  }

  useEffect(() => {
    setChatsToShow([...chats])
  }, [chats])

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
        <input
          onChange={handleChange}
          type="text"
          id="txt"
          name="txt"
          value={field.txt}
          placeholder="Search messages"
        />
      </div>

      <div className="list">
        {chatsToShow &&
          chatsToShow.map((chat) => (
            <MsgPreview
              key={chat._id}
              chat={chat}
              chats={chats}
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
