import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const PostHeader = ({ post, fullname }) => {
  console.log(post)
  return (
    <section className="post-header">
      <div className="img-actor">
        <img src={`https://robohash.org/${post._id}`} className="img"></img>
      </div>
      <div className="details">
        <div className="name">
          <h3>{fullname}</h3>
        </div>
        <div className="description">
          <p>description Lorem, ipsum dolor s</p>
        </div>
        <div className="time">
          <p>{post.createdAt}</p>
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
