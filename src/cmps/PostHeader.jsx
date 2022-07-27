import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const PostHeader = () => {
  return (
    <section className="post-header">
      <div className="img-actor">
        <div className="img"></div>
      </div>
      <div className="details">
        <div className="name">
          <h3>Shlomi</h3>
        </div>
        <div className="description">
          <p>description Lorem, ipsum dolor s</p>
        </div>
        <div className="time">
          <p>24m</p>
        </div>
      </div>
      <div className="follow">
        <span>
          <FontAwesomeIcon icon="fa-solid fa-plus" />
          Follow
        </span>
      </div>
    </section>
  )
}
