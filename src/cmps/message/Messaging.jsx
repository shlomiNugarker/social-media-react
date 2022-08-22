import { useState } from 'react'
import { ListMsg } from './ListMsg'
import { MessageThread } from './MessageThread'

export function Messaging({ chats }) {
  const [messages, setMessages] = useState(null)

  return (
    <section className="messaging">
      <div className="container">
        <ListMsg chats={chats} setMessages={setMessages} />
        {messages && <MessageThread messages={messages} />}
      </div>
    </section>
  )
}
