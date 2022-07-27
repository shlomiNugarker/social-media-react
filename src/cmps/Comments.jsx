import { InputComment } from './InputComment'
import { ListComments } from './ListComments'

export const Comments = () => {
  return (
    <section className="comments">
      <InputComment />
      <ListComments />
    </section>
  )
}
