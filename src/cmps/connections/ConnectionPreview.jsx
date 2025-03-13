import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import loadingCircle from '../../assets/imgs/loading-circle.gif'
import { updateUser } from '../../store/actions/userActions'

export function ConnectionPreview({ user }) {
  const dispatch = useDispatch()

  const [isConnected, setIsConnected] = useState(false)

  const { loggedInUser } = useSelector((state) => state.userModule)

  const checkIsConnected = useCallback(() => {
    const isConnected = loggedInUser?.connections?.some(
      (connection) => connection?.userId === user?._id
    )

    setIsConnected(isConnected)
  }, [loggedInUser, user])

  useEffect(() => {
    checkIsConnected()
    return () => {}
  }, [checkIsConnected])

  const connectProfile = async () => {
    if (!user) return
    if (isConnected === true) {
      // Remove
      const connectionToRemve = JSON.parse(JSON.stringify(user))
      const loggedInUserToUpdate = JSON.parse(JSON.stringify(loggedInUser))

      loggedInUserToUpdate.connections =
        loggedInUserToUpdate.connections.filter(
          (connection) => connection.userId !== connectionToRemve._id
        )

      connectionToRemve.connections = connectionToRemve.connections.filter(
        (connection) => connection.userId !== loggedInUserToUpdate._id
      )

      dispatch(updateUser(loggedInUserToUpdate))
      dispatch(updateUser(connectionToRemve))
    } else if (isConnected === false) {
      // Add
      const connectionToAdd = JSON.parse(JSON.stringify(user))

      const loggedInUserToUpdate = JSON.parse(JSON.stringify(loggedInUser))

      connectionToAdd.connections.unshift({
        userId: loggedInUserToUpdate._id,
        fullname: loggedInUserToUpdate.fullname,
      })

      loggedInUserToUpdate.connections.push({
        userId: connectionToAdd._id,
        fullname: connectionToAdd.fullname,
      })

      dispatch(updateUser(loggedInUserToUpdate))
      dispatch(updateUser(connectionToAdd))
    }
  }

  if (!user || isConnected) return
  return (
    <li className="connection-preview">
      <Link to={`/main/profile/${user?._id}`}>
        <div className="bg">
          {(user.imgUrl && (
            <img src={user.imgUrl} alt="" className="img-profile" />
          )) || <img src={loadingCircle} alt="" />}
        </div>
        <div className="fullname">
          <p>{user.fullname}</p>
        </div>
        <div className="profession">
          <p>{user.profession}</p>
        </div>
      </Link>
      <div className="followers-count">
        <p> {user.connections?.length} conections</p>
      </div>

      <div className="btn-container" onClick={connectProfile}>
        <button>{!isConnected ? 'Connect' : 'Disconnect'}</button>
      </div>
    </li>
  )
}
