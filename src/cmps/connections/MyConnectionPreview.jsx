import { userService } from '../../services/user/userService'
import { utilService } from '../../services/utilService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useMemo, useState } from 'react'
import TimeAgo from 'react-timeago'
import { Link } from 'react-router-dom'

export function MyConnectionPreview({ connection }) {
  const [user, setUser] = useState(null)

  const loadUser = async () => {
    const user = await userService.getById(connection.userId)
    setUser(() => user)
  }

  useEffect(() => {
    loadUser()
    // eslint-disable-next-line
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
            <p>
              connected <TimeAgo date={connection.connected} />
            </p>
          </Link>
        </div>
        <div className="btns">
          <button>Message</button>
          <FontAwesomeIcon className="dots-icon" icon="fa-solid fa-ellipsis" />
        </div>
      </div>
    </section>
  )
}
