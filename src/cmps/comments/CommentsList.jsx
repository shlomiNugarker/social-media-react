import { CommentPreview } from './CommentPreview'

export const CommentsList = ({ comments, onSaveComment }) => {
  if (!comments) return <section className="list-comments">Loading..</section>

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
