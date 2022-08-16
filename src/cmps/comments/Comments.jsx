import { InputComment } from './InputComment'
import { CommentsList } from './CommentsList'
import { useDispatch, useSelector } from 'react-redux'
import { saveComment } from '../../store/actions/postActions'
import { useCallback, useEffect, useRef, useMemo, useState } from 'react'

export const Comments = ({ postId, comments }) => {
  const dispatch = useDispatch()

  const onSaveComment = async (comment) => {
    const commentToSave = { ...comment, postId }
    dispatch(saveComment(commentToSave))
  }

  console.log('render Comments')
  return (
    <section className="comments">
      <InputComment onSaveComment={onSaveComment} />
      <CommentsList
        postId={postId}
        comments={comments}
        onSaveComment={onSaveComment}
      />
    </section>
  )
}
