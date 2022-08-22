import { useState } from 'react'
import { useSelector } from 'react-redux'
import { userService } from '../../services/user/userService'
import { ListMsg } from './ListMsg'
import { MessageThread } from './MessageThread'

export function Messaging({ chats }) {
  const [messagesToShow, setMessagesToShow] = useState(null)
  const { loggedInUser } = useSelector((state) => state.userModule)
  const [chatWith, setChatWith] = useState(null)

  return (
    <section className="messaging">
      <div className="container">
        <ListMsg
          chats={chats}
          setMessagesToShow={setMessagesToShow}
          setChatWith={setChatWith}
        />
        {messagesToShow && (
          <MessageThread messagesToShow={messagesToShow} chatWith={chatWith} />
        )}
      </div>
    </section>
  )
}
