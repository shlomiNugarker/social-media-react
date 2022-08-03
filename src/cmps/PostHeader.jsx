import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const PostHeader = ({ post, userPost }) => {
  if (!userPost) return <section className="post-header">Loading</section>
  const { imgUrl, profession, fullname } = userPost
  return (
    <section className="post-header">
      <div className="img-actor">
        <img src={imgUrl} className="img"></img>
      </div>
      <div className="details">
        <div className="name">
          <h3>{fullname}</h3>
        </div>
        <div className="description">
          <p>{profession}</p>
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
