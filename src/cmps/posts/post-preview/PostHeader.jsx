import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TimeAgo from 'react-timeago'
import { Link } from 'react-router-dom'
import { userService } from '../../../services/user/userService'

export const PostHeader = ({ post, userPost }) => {
  if (!userPost) return <section className="post-header">Loading</section>

  // const goToProfile = () => {}

  const { imgUrl, profession, fullname } = userPost
  return (
    <section className="post-header">
      <div className="img-actor">
        <img src={imgUrl} className="img"></img>
      </div>

      <Link to={`/main/profile/${userPost?._id}`}>
        <div className="details">
          <div className="name">
            <h3>{fullname}</h3>
          </div>
          <div className="description">
            <p>{profession}</p>
          </div>
          <div className="time">
            <p></p>
            <span>
              <TimeAgo date={post.createdAt} />
            </span>
          </div>
        </div>
      </Link>
      {/* <div className="follow">
        <span>
          <FontAwesomeIcon icon="fa-solid fa-plus" />
          Follow
        </span>
      </div> */}
    </section>
  )
}
