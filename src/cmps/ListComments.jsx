import { CommentPreview } from './CommentPreview'
import { useCallback, useEffect, useRef, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const ListComments = ({ postId }) => {
  const { comments } = useSelector((state) => state.commentModule)

  if (!comments) return <section className="list-comments">Loading..</section>

  console.log('render ListComments')
  return (
    <section className="list-comments">
      {comments[postId].map((comment) => (
        <CommentPreview key={comment._id} comment={comment} />
      ))}
    </section>
  )
}
