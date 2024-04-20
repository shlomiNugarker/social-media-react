import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { utilService } from '../services/utilService'
import { LikePreview } from './LikePreview'

export function LikeList({ reactions, toggleLikes }) {
  return (
    <section className="like-list">
      <div className="title">
        <h2>Reactions:</h2>
        <FontAwesomeIcon
          onClick={() => toggleLikes()}
          className="logo-close"
          icon="fa-solid fa-x"
        />
      </div>
      <div>
        <div className="all">
          <p>All {reactions?.length}</p>
        </div>
      </div>
      <div className="list">
        {reactions.map((reaction) => (
          <LikePreview key={utilService.makeId()} reaction={reaction} />
        ))}
      </div>
    </section>
  )
}
