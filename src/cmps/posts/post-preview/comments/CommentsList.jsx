import { CommentPreview } from './CommentPreview'
import { useCallback, useEffect, useRef, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const CommentsList = ({ comments, onSaveComment }) => {
  if (!comments) return <section className="list-comments">Loading..</section>

  console.log('render CommentsList')
  return (
    <section className="list-comments">
      {comments.map((comment) => (
        <CommentPreview
          key={comment._id}
          comment={comment}
          onSaveComment={onSaveComment}
        />
      ))}
    </section>
  )
}
