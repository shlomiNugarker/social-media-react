import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const InputComment = () => {
  return (
    <section className="input-comment">
      <div className="img-profile">
        <div className="img"></div>
      </div>

      <div className="input-container">
        <input type="text" placeholder="Add a Comment.." />
        <span>
          <FontAwesomeIcon
            className="smile icon"
            icon="fa-solid fa-face-smile"
          />
        </span>
        <span>
          <FontAwesomeIcon className="photo icon" icon="fa-solid fa-image" />
        </span>
      </div>
    </section>
  )
}
