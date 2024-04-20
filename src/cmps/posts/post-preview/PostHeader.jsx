import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TimeAgo from 'react-timeago'
import { Link, useHistory } from 'react-router-dom'
import loadingCircle from '../../../assets/imgs/loading-circle.gif'

export const PostHeader = ({ post, userPost }) => {
  const history = useHistory()

  if (!userPost)
    return (
      <section className="post-header">
        <img className="loading-circle" src={loadingCircle} alt="" />
      </section>
    )

  const { imgUrl, profession, fullname } = userPost
  return (
    <section className="post-header">
      <div
        className="img-actor"
        onClick={() => history.push(`/main/profile/${userPost?._id}`)}
      >
        <img src={imgUrl} className="img"></img>
      </div>

      <div className="details">
        <Link to={`/main/profile/${userPost?._id}`}>
          <div className="name">
            <h3>{fullname}</h3>
          </div>
        </Link>
        <div
          className="time-and-description-container"
          onClick={() => history.push(`/main/post/${post.userId}/${post._id}`)}
        >
          <div className="description">
            <p>{profession}</p>
          </div>
          <div className="time">
            <span>
              <TimeAgo date={post.createdAt} />
            </span>{' '}
            {post?.position?.lat && post?.position?.lng && (
              <span className="logo-location">
                <FontAwesomeIcon icon="fa-solid fa-location-dot" />
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
