import { InputComment } from './InputComment'
import { ListComments } from './ListComments'
import { useDispatch, useSelector } from 'react-redux'
import { saveComment } from '../store/actions/commentAction'

export const Comments = ({ comments, postId }) => {
  const dispatch = useDispatch()

  const onAddComment = (comment) => {
    const commentToAdd = { ...comment, postId }

    dispatch(saveComment(commentToAdd))
  }
  return (
    <section className="comments">
      <InputComment onAddComment={onAddComment} />
      <ListComments comments={comments} />
    </section>
  )
}
