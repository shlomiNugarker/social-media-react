import { ListMsg } from './ListMsg'
import { MessageThread } from './MessageThread'

export function Messaging() {
  return (
    <section className="messaging">
      <div className="container">
        <ListMsg />
        <MessageThread />
      </div>
    </section>
  )
}
