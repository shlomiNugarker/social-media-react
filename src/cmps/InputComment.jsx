import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'

export const InputComment = ({ onAddComment }) => {
  const { loggedInUser } = useSelector((state) => state.userModule)
  const { imgUrl } = loggedInUser

  const inputRef = (elInput) => {
    if (elInput) elInput.focus()
  }
  return (
    <section className="input-comment">
      <div className="img-profile">
        <img src={imgUrl} alt="" className="img" />
      </div>

      <div className="input-container">
        <input ref={inputRef} type="text" placeholder="Add a Comment.." />
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
