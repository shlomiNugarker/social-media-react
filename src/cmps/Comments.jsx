import { InputComment } from './InputComment'
import { ListComments } from './ListComments'
import { useDispatch, useSelector } from 'react-redux'
import { saveComment } from '../store/actions/postActions'
import { useCallback, useEffect, useRef, useMemo, useState } from 'react'

export const Comments = ({ postId, comments }) => {
  const dispatch = useDispatch()

  const onAddComment = (comment) => {
    const commentToAdd = { ...comment, postId }
    dispatch(saveComment(commentToAdd))
  }

  console.log('render Comments')
  return (
    <section className="comments">
      <InputComment onAddComment={onAddComment} />
      <ListComments postId={postId} comments={comments} />
    </section>
  )
}
