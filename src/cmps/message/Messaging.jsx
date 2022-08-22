import { useState } from 'react'
import { useSelector } from 'react-redux'
import { userService } from '../../services/user/userService'
import { ListMsg } from './ListMsg'
import { MessageThread } from './MessageThread'

export function Messaging({ chats }) {
  const [messagesToShow, setMessagesToShow] = useState(null)
  const { loggedInUser } = useSelector((state) => state.userModule)
  const [theNotLoggedUserChat, setTheNotLoggedUserChat] = useState(null)

  return (
    <section className="messaging">
      <div className="container">
        <ListMsg
          chats={chats}
          setMessagesToShow={setMessagesToShow}
          theNotLoggedUserChat={theNotLoggedUserChat}
          setTheNotLoggedUserChat={setTheNotLoggedUserChat}
        />
        {messagesToShow && (
          <MessageThread
            messagesToShow={messagesToShow}
            theNotLoggedUserChat={theNotLoggedUserChat}
          />
        )}
      </div>
    </section>
  )
}
