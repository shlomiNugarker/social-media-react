import { useSelector } from 'react-redux'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const PostMenu = ({
  toggleMenu,
  onRemovePost,
  postUserId,
  copyToClipBoard,
}) => {
  const { loggedInUser } = useSelector((state) => state.userModule)

  const [isAskAgain, setIsAskAgain] = useState(false)

  const isLoggedInUserCanDelete = loggedInUser._id === postUserId

  return (
    <section>
      <div
        className="bg-menu"
        onClick={(ev) => {
          ev.stopPropagation()
          toggleMenu()
        }}
      ></div>
      <section className="post-menu">
        {isLoggedInUserCanDelete && (
          <div className="container">
            <button
              className="delete-container "
              onClick={() => setIsAskAgain((prev) => !prev)}
            >
              <FontAwesomeIcon
                className="trash-icon"
                icon="fa-solid fa-trash"
              />
              <p>Delete post</p>
            </button>
          </div>
        )}
        {isAskAgain && (
          <div className="ask-again">
            <p>Are you sure?</p>
            <div className="opts">
              <p className="yes opt-btn" onClick={onRemovePost}>
                yes
              </p>
              <p className="no opt-btn" onClick={() => setIsAskAgain(false)}>
                no
              </p>
            </div>
          </div>
        )}

        <div className="copy-to-clip-board">
          <button
            onClick={(ev) => {
              ev.stopPropagation()
              toggleMenu()
              copyToClipBoard()
            }}
          >
            <FontAwesomeIcon icon="fa-solid fa-copy" />
            <p>Copy link to post</p>
          </button>
        </div>
      </section>
    </section>
  )
}
