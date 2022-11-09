import { ThreadMsgPreview } from './ThreadMsgPreview'

export function ThreadMsgList({ messagesToShow }) {
  if (!messagesToShow?.length) return <div>No msgs yet..</div>

  return (
    <section className="thread-msg-list">
      <div className="list">
        {messagesToShow.map((msg) => (
          <ThreadMsgPreview key={msg._id} msg={msg} />
        ))}
      </div>
    </section>
  )
}
