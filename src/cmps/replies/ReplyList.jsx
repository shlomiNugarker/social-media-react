import { useEffect } from 'react'
import { ReplyPreview } from './ReplyPreview'

export const ReplyList = ({ replies, updateReply }) => {
  return (
    <section className="reply-list">
      {replies.map((reply) => (
        <ReplyPreview key={reply._id} reply={reply} updateReply={updateReply} />
      ))}
    </section>
  )
}
