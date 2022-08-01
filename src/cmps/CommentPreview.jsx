import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const CommentPreview = ({ comment }) => {
  return (
    <section className="comment-preview">
      <div className="img-container">
        <p className="img-profile"></p>
      </div>
      <div className="container">
        <div className="comment-header">
          <div className="comment-details">
            <div className="name">
              <h3>Adiel</h3>
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
            <p>
              {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum
              laboriosam et nulecessitatibus dignissimos maiores minima commodi
              corporis magnam veritatis? Aperiam! */}
              {comment.body}
            </p>
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
