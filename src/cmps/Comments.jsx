import { InputComment } from './InputComment'
import { ListComments } from './ListComments'

export const Comments = ({ comments }) => {
  return (
    <section className="comments">
      <InputComment />
      <ListComments comments={comments} />
    </section>
  )
}
