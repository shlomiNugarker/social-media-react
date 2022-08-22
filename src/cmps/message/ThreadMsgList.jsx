import { useSelector } from 'react-redux'
import { utilService } from '../../services/utilService'
import { ThreadMsgPreview } from './ThreadMsgPreview'

export function ThreadMsgList({ messagesToShow }) {
  const { loggedInUser } = useSelector((state) => state.userModule)

  return (
    <section className="thread-msg-list">
      <div className="list">
        {messagesToShow.map((msg) => (
          <ThreadMsgPreview key={utilService.makeId()} msg={msg} /> // TODO: ADD ID TO EACH MSG
        ))}
      </div>
    </section>
  )
}
