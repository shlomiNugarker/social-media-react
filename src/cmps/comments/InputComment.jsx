import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { useState } from 'react'

export const InputComment = ({ onSaveComment }) => {
  const { loggedInUser } = useSelector((state) => state.userModule)
  const { imgUrl, _id } = loggedInUser

  const [isFirstFocus, setIsFirstFocus] = useState(true)
  const [newComment, setNewComment] = useState({
    txt: '',
    userId: _id,
  })

  const handleChange = async ({ target }) => {
    const field = target.name
    let value = target.type === 'number' ? +target.value || '' : target.value
    setNewComment((prevCred) => ({ ...prevCred, [field]: value }))
  }

  const doSubmit = () => {
    onSaveComment(newComment)
    setNewComment(() => ({ txt: '', userId: _id }))
  }

  const inputRef = (elInput) => {
    if (elInput && isFirstFocus) elInput.focus()
    setIsFirstFocus(false)
  }
  return (
    <section>
      <form className="input-comment" action="">
        <div>
          <div className="img-profile">
            <img src={imgUrl} alt="" className="img" />
          </div>

          <div className="input-container">
            <input
              ref={inputRef}
              type="text"
              placeholder="Add a Comment.."
              required
              onChange={handleChange}
              id="txt"
              name="txt"
              value={newComment.txt}
            />
            <span>
              <FontAwesomeIcon
                className="smile icon"
                icon="fa-solid fa-face-smile"
              />
            </span>
            <span>
              <FontAwesomeIcon
                className="photo icon"
                icon="fa-solid fa-image"
              />
            </span>
          </div>
        </div>
        <div className="post-btn-container">
          {newComment.txt && (
            <button
              onClick={(ev) => {
                ev.preventDefault()
                doSubmit()
              }}
            >
              Post
            </button>
          )}
        </div>
      </form>
    </section>
  )
}
