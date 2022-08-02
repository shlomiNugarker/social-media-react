import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const CommentPreview = ({ comment }) => {
  console.log(comment)
  return (
    <section className="comment-preview">
      <div className="img-container">
        <p className="img-profile"></p>
      </div>
      <div className="container">
        <div className="comment-header">
          <div className="comment-details">
            <div className="name">
              <h3>{comment.user.username}</h3>
              <p>Profetion</p>
            </div>
            <div>
              <span>35m</span>
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
          <span>24</span>
          <button>Like</button> |<button>Reply</button>
        </div>
      </div>
    </section>
  )
}
