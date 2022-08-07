import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { userService } from '../services/user/userService'

export const CommentPreview = ({ comment }) => {
  const { userId, createdAt, postId, reactions } = comment

  const [userComment, setUserComment] = useState(null)

  const loadUserComment = async (userId) => {
    if (!userId) return
    const userComment = await userService.getById(userId)
    setUserComment(userComment)
  }

  useEffect(() => {
    loadUserComment(userId)
    // eslint-disable-next-line
  }, [])

  if (!userComment) return

  const { profession, imgUrl } = userComment

  console.log('render CommentPreview')
  return (
    <section className="comment-preview">
      <div className="img-container">
        <img src={imgUrl} alt="" className="img-profile" />
      </div>
      <div className="container">
        <div className="comment-header">
          <div className="comment-details">
            <div className="name">
              <h3>{userComment.fullname}</h3>
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
            <p>{comment.txt}</p>
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
