import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useMemo, useState } from 'react'

export const InputComment = ({ onAddComment }) => {
  const { loggedInUser } = useSelector((state) => state.userModule)
  const { imgUrl, _id } = loggedInUser

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
    onAddComment(newComment)
  }

  const inputRef = (elInput) => {
    if (elInput) elInput.focus()
  }
  return (
    <section>
      <form
        className="input-comment"
        action=""
        onSubmit={(ev) => {
          ev.preventDefault()
          doSubmit()
        }}
        // onClick={(ev) => {
        //   ev.stopPropagation()
        // }}
      >
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
          {newComment.txt && <button>Post</button>}
        </div>
      </form>
    </section>
  )
}
