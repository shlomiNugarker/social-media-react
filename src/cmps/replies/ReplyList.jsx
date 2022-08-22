import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ReplyPreview } from './ReplyPreview'

export const ReplyList = ({ replies, updateReply }) => {
  useEffect(() => {
    // eslint-disable-next-line
  }, [])

  // console.log('render ReplyList')
  return (
    <section className="reply-list">
      {replies.map((reply) => (
        <ReplyPreview key={reply._id} reply={reply} updateReply={updateReply} />
      ))}
    </section>
  )
}
