import { userService } from '../../services/user/userService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import TimeAgo from 'react-timeago'
import { Link, useHistory } from 'react-router-dom'

export function MyConnectionPreview({ connection }) {
  const [user, setUser] = useState(null)

  const history = useHistory()

  const loadUser = async () => {
    const user = await userService.getById(connection.userId)
    setUser(() => user)
  }

  useEffect(() => {
    loadUser()
  }, [])

  if (!user) return

  return (
    <section className="my-connection-preview">
      <div className="container">
        <div className="img-profile">
          <img src={user.imgUrl} alt="" className="img" />
        </div>
        <div className="fullname">
          <Link to={`/main/profile/${user._id}`}>
            <h3>{user.fullname}</h3>
            <p>{user.profession || ' '}</p>
            {connection?.connected && (
              <p>
                connected <TimeAgo date={connection?.connected} />
              </p>
            )}
          </Link>
        </div>
        <div className="btns">
          <button onClick={() => history.push(`/main/message/${user?._id}`)}>
            Message
          </button>
          <FontAwesomeIcon className="dots-icon" icon="fa-solid fa-ellipsis" />
        </div>
      </div>
    </section>
  )
}
