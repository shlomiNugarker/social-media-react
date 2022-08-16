import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { userService } from '../services/user/userService'
import TimeAgo from 'react-timeago'
import { useSelector } from 'react-redux'

export const CommentPreview = ({ comment, onSaveComment }) => {
  const { userId, createdAt, postId, reactions } = comment

  const [userComment, setUserComment] = useState(null)
  const { loggedInUser } = useSelector((state) => state.userModule)

  const loadUserComment = async (userId) => {
    if (!userId) return
    const userComment = await userService.getById(userId)
    setUserComment(userComment)
  }

  const onLikeComment = () => {
    const commentToSave = { ...comment }
    const isAlreadyLike = commentToSave.reactions.some(
      (reaction) => reaction.userId === loggedInUser._id
    )
    if (isAlreadyLike) {
      commentToSave.reactions = commentToSave.reactions.filter(
        (reaction) => reaction.userId !== loggedInUser._id
      )
    } else if (!isAlreadyLike) {
      commentToSave.reactions.push({
        userId: loggedInUser._id,
        fullname: loggedInUser.fullname,
        reaction: 'like',
      })
    }
    onSaveComment(commentToSave)
  }

  useEffect(() => {
    loadUserComment(userId)
    // eslint-disable-next-line
  }, [])

  if (!userComment) return

  const isLogedInUserLikeComment = comment?.reactions.some((reaction) => {
    console.log(loggedInUser._id, '===', reaction.userId)
    return loggedInUser._id === reaction.userId
  })

  const likeBtnStyle = isLogedInUserLikeComment ? 'liked' : ''
  console.log(isLogedInUserLikeComment)

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
              <span>
                <TimeAgo date={createdAt} />
              </span>
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
          <button className={'like ' + likeBtnStyle} onClick={onLikeComment}>
            Like
          </button>{' '}
          |<button>Reply</button>
        </div>
      </div>
    </section>
  )
}
