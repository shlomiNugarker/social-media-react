import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const CommentMenu = ({ toggleMenu, onRemoveComment, commentUserId }) => {
  const { loggedInUser } = useSelector((state) => state.userModule)
  const [isAskAgain, setIsAskAgain] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    // eslint-disable-next-line
  }, [])

  const isLoggedInUserCanDelete = loggedInUser._id === commentUserId

  console.log('render CommentMenu')
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
