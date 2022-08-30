import { InputComment } from './InputComment'
import { CommentsList } from './CommentsList'
import { useDispatch, useSelector } from 'react-redux'
import { saveComment } from '../../store/actions/postActions'
import { useCallback, useEffect, useRef, useMemo, useState } from 'react'
import { saveActivity } from '../../store/actions/activityAction'

export const Comments = ({ postId, comments, userPostId }) => {
  const dispatch = useDispatch()
  const { loggedInUser } = useSelector((state) => state.userModule)

  const onSaveComment = async (comment) => {
    const commentToSave = { ...comment, postId }
    dispatch(saveComment(commentToSave)).then((savedComment) => {
      if (savedComment) {
        const newActivity = {
          type: commentToSave._id ? 'update-comment' : 'add-comment',
          description: '',
          createdBy: loggedInUser._id,
          createdTo: userPostId,
          commentId: savedComment._id,
          postId: savedComment.postId,
        }
        dispatch(saveActivity(newActivity))
      }
    })
  }

  // console.log('render Comments')
  if (!comments) return <div>Loading</div>
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
