import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const PostPreview = () => {
  return (
    <section className="post-preview">
      <div className="menu">
        <FontAwesomeIcon className="dots-icon" icon="fa-solid fa-ellipsis" />
      </div>
      <div className="post-header">
        <div className="img-actor">
          <div className="img"></div>
        </div>
        <div className="details">
          <div className="name">
            <p>Shlomi</p>
          </div>
          <div className="description">
            <p>
              description Lorem, ipsum dolor sit amet consectetur adipisicing
            </p>
          </div>
          <div className="time">
            <p>24m</p>
          </div>
        </div>
        <div className="follow">
          <span>follow</span>
        </div>
      </div>
    </section>
  )
}
