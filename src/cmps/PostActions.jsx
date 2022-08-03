import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const PostActions = ({ post }) => {
  return (
    <section className="post-actions">
      <button className="like">
        <FontAwesomeIcon
          className="like-icon icon"
          icon="fa-solid fa-thumbs-up"
        />
        <span>Like</span>
      </button>
      <button className="comment">
        <FontAwesomeIcon
          className="comment-icon icon"
          icon="fa-solid fa-comment"
        />
        <span>Comment</span>
      </button>
      <button className="share">
        <FontAwesomeIcon className="share-icon icon" icon="fa-solid fa-share" />
        <span>Share</span>
      </button>
      <button className="send">
        <FontAwesomeIcon
          className="send-icon icon"
          icon="fa-solid fa-paper-plane"
        />
        <span>Send</span>
      </button>
    </section>
  )
}
