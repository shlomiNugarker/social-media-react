import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

export const UserIconPos = ({ url, userId, fullname, isCloseUserIcon }) => {
  const [isUserIconOpen, setisUserIconOpen] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (isCloseUserIcon) {
      setisUserIconOpen(false)
    }
    return () => {}
  }, [isCloseUserIcon])

  return (
    <div
      className="user-icon-pos-container"
      onClick={(ev) => {
        ev.stopPropagation()
        setisUserIconOpen((prev) => !prev)
      }}
    >
      <img
        className="user-icon-pos"
        src={url}
        alt={fullname}
        title={fullname}
      />
      {isUserIconOpen && (
        <div className="menu-container">
          <div className="opts-btns">
            <div className="fullname ">
              <p>{fullname}</p>
            </div>
            <div
              className="go-to-profile opt"
              onClick={() => history.push(`/main/profile/${userId}`)}
            >
              <p>Go to profile</p>
            </div>
            <div
              className="send-message opt"
              onClick={() => history.push(`/main/message/${userId}`)}
            >
              <p>Send a message</p>
            </div>
          </div>

          <div
            className="close"
            onClick={(ev) => {
              ev.stopPropagation()
              setisUserIconOpen(false)
            }}
          >
            <span>Close</span>
          </div>
        </div>
      )}
    </div>
  )
}
