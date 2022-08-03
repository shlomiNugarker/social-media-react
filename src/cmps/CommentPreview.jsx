import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { userService } from '../services/user/userService'

export const CommentPreview = ({ comment }) => {
  const { user, createdAt, postId, reactions } = comment

  const [userComment, setUserComment] = useState(null)

  const loadUserComment = async (userId) => {
    if (!user) return
    const userComment = await userService.getById(userId)
    setUserComment(userComment)
  }

  useEffect(() => {
    loadUserComment(user._id)
    // eslint-disable-next-line
  }, [])

  if (!userComment) return

  const { profession, imgUrl } = userComment

  return (
    <section className="comment-preview">
      <div className="img-container">
        {/* <p className="img-profile"></p> */}
        <img src={imgUrl} alt="" className="img-profile" />
      </div>
      <div className="container">
        <div className="comment-header">
          <div className="comment-details">
            <div className="name">
              <h3>{comment.user.username}</h3>
              <p>{profession}</p>
            </div>
            <div>
              <span>{createdAt}</span>
              <FontAwesomeIcon
                className="dots-icon"
                icon="fa-solid fa-ellipsis"
              />
            </div>
          </div>
          <div className="comment-text">
            <p>{comment.body}</p>
          </div>
        </div>
        <div className="comment-action">
          <span>{reactions.length || ''}</span>
          <button>Like</button> |<button>Reply</button>
        </div>
      </div>
    </section>
  )
}
