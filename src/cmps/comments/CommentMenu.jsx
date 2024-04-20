import { useSelector } from 'react-redux'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const CommentMenu = ({ toggleMenu, onRemoveComment, commentUserId }) => {
  const [isAskAgain, setIsAskAgain] = useState(false)
  const { loggedInUser } = useSelector((state) => state.userModule)

  const isLoggedInUserCanDelete = loggedInUser._id === commentUserId

  return (
    <section>
      <div
        className="bg-menu"
        onClick={(ev) => {
          ev.stopPropagation()
          toggleMenu()
        }}
      ></div>
      <section className="comment-menu">
        <div className="container">
          {isLoggedInUserCanDelete && (
            <button
              className="delete-container"
              onClick={() => setIsAskAgain((prev) => !prev)}
            >
              <FontAwesomeIcon
                className="trash-icon"
                icon="fa-solid fa-trash"
              />
              <p>Delete comment</p>
            </button>
          )}
        </div>
        {isAskAgain && (
          <div className="ask-again">
            <p>Are you sure?</p>
            <div className="opts">
              <p className="yes opt-btn" onClick={onRemoveComment}>
                yes
              </p>
              <p className="no opt-btn" onClick={() => setIsAskAgain(false)}>
                no
              </p>
            </div>
          </div>
        )}
      </section>
    </section>
  )
}
