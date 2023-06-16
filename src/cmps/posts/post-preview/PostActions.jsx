import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router-dom'

export const PostActions = ({
  post,
  onToggleShowComment,
  onLikePost,
  onSharePost,
  loggedInUser,
}) => {
  const history = useHistory()

  const isLogedInUserLikePost = post?.reactions?.some((reaction) => {
    return (
      loggedInUser && loggedInUser._id && loggedInUser?._id === reaction.userId
    )
  })

  const likeBtnStyle = isLogedInUserLikePost ? 'liked' : ''
  return (
    <section className="post-actions">
      <button className={'like ' + likeBtnStyle} onClick={onLikePost}>
        <FontAwesomeIcon
          className="like-icon icon"
          icon="fa-solid fa-thumbs-up"
        />
        <span>Like</span>
      </button>
      <button className="comment" onClick={onToggleShowComment}>
        <FontAwesomeIcon
          className="comment-icon icon"
          icon="fa-solid fa-comment"
        />
        <span>Comment</span>
      </button>
      <button className="share" onClick={() => onSharePost()}>
        <FontAwesomeIcon className="share-icon icon" icon="fa-solid fa-share" />
        <span>Share</span>
      </button>
      <button
        className="send"
        onClick={() => history.push(`/main/message/${post.userId}`)}
      >
        <FontAwesomeIcon
          className="send-icon icon"
          icon="fa-solid fa-paper-plane"
        />
        <span>Send</span>
      </button>
    </section>
  )
}
