import { useState } from 'react'
import { useSelector } from 'react-redux'
import { userService } from '../../services/user/userService'
import { ListMsg } from './ListMsg'
import { MessageThread } from './MessageThread'

export function Messaging({
  chats,
  chatWith,
  messagesToShow,
  setMessagesToShow,
  chooseenChatId,
  setChooseenChatId,
  setChatWith,
  getTheNotLoggedUserChat,
  setTheNotLoggedUserChat,
  theNotLoggedUserChat,
  onSendMsg,
}) {
  const { loggedInUser } = useSelector((state) => state.userModule)

  return (
    <section className="messaging">
      <div className="container">
        <ListMsg
          chats={chats}
          setMessagesToShow={setMessagesToShow}
          setChatWith={setChatWith}
          chatWith={chatWith}
          setChooseenChatId={setChooseenChatId}
          chooseenChatId={chooseenChatId}
          getTheNotLoggedUserChat={getTheNotLoggedUserChat}
          setTheNotLoggedUserChat={setTheNotLoggedUserChat}
          theNotLoggedUserChat={theNotLoggedUserChat}
        />
        {messagesToShow && (
          <MessageThread
            messagesToShow={messagesToShow}
            chatWith={chatWith}
            onSendMsg={onSendMsg}
          />
        )}
      </div>
    </section>
  )
}
