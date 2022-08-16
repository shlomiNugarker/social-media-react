import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const PostMenu = ({ toggleMenu, onRemovePost }) => {
  const { loggedInUser } = useSelector((state) => state.userModule)
  const [isAskAgain, setIsAskAgain] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    // eslint-disable-next-line
  }, [])

  console.log('render PostMenu')
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
        <div className="container">
          <button
            className="delete-container"
            onClick={() => setIsAskAgain((prev) => !prev)}
          >
            <FontAwesomeIcon className="trash-icon" icon="fa-solid fa-trash" />
            <p>Delete post</p>
          </button>
        </div>
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
      </section>
    </section>
  )
}
