import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router-dom'
import { userService } from '../../services/user/userService'

export function ImgPreview({
  toggleShowImg,
  imgUrl,
  videoUrl,
  title,
  post,
  body,
}) {
  const history = useHistory()

  const [user, setUser] = useState(null)

  const loadUser = async (userId) => {
    const user = await userService.getById(userId)
    setUser(user)
  }

  useEffect(() => {
    if (post?.userId) loadUser(post.userId)
  }, [])

  return (
    <div className="img-profile-preview">
      <div className="bg" onClick={toggleShowImg}></div>
      <section className="container">
        <div className="title">
          {(user && post && (
            <div
              className="user-details"
              onClick={() => history.push(`/main/profile/${post.userId}`)}
            >
              <img src={user.imgUrl} alt="" className="img" />
              <p className="fullname">{user.fullname}</p>
            </div>
          )) ||
            (post && <p className="user-details">Loading user...</p>)}

          <p>{title}</p>

          <span className="logo-close" onClick={toggleShowImg}>
            <FontAwesomeIcon icon="fa-solid fa-x" />
          </span>
        </div>

        {body && (
          <div>
            <p className="body">{body}</p>
          </div>
        )}

        {post && (
          <div className="see-post">
            <p
              onClick={() =>
                history.push(`/main/post/${post.userId}/${post._id}`)
              }
            >
              See original post
            </p>
          </div>
        )}

        <div className="img-container">
          {(imgUrl && <img className="img" src={imgUrl} alt="" />) ||
            (videoUrl && (
              <div>
                <video width="100%" height="300" controls>
                  <source src={videoUrl} type="video/mp4" />
                </video>
              </div>
            ))}
        </div>
      </section>
    </div>
  )
}
