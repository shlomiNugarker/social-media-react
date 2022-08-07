import { InputComment } from './InputComment'
import { ListComments } from './ListComments'
import { useDispatch, useSelector } from 'react-redux'
import { loadComments, saveComment } from '../store/actions/commentAction'
import { useCallback, useEffect, useRef, useMemo, useState } from 'react'

export const Comments = ({ postId }) => {
  const dispatch = useDispatch()

  const onAddComment = (comment) => {
    const commentToAdd = { ...comment, postId }
    dispatch(saveComment(commentToAdd)).then(() => {
      dispatch(loadComments(postId)) // ?
    })
  }

  console.log('render Comments')
  return (
    <section className="comments">
      <InputComment onAddComment={onAddComment} />
      <ListComments postId={postId} />
    </section>
  )
}
