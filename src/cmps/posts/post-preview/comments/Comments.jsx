import { InputComment } from './InputComment'
import { ListComments } from './ListComments'
import { useDispatch, useSelector } from 'react-redux'
import { saveComment } from '../../../../store/actions/postActions'
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
      <ListComments
        postId={postId}
        comments={comments}
        onSaveComment={onSaveComment}
      />
    </section>
  )
}
