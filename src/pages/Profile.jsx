import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { userService } from '../services/user/userService'
import { PostsList } from '../cmps/PostsList'
import { Link } from 'react-router-dom'
import { loadPostsByUserId } from '../store/actions/postActions'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addConnection } from '../store/actions/userActions'

export function Profile() {
  const params = useParams()
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const { posts } = useSelector((state) => state.postModule)
  const { loggedInUser } = useSelector((state) => state.userModule)

  const loadUser = async () => {
    const user = await userService.getById(params.userId)
    setUser(() => user)
  }

  const connectProfile = () => {
    console.log('connect', user)

    if (isConnected) {
      // Remove
    } else if (!isConnected) {
      // Add
      const connectionToAdd = {
        userId: user._id,
      }
      dispatch(addConnection(connectionToAdd))
    }
  }

  const isConnected = () => {
    return loggedInUser.connections.some(
      (connection) => connection.userId === user._id
    )
  }

  useEffect(() => {
    const filterBy = {
      userId: params.userId,
    }
    loadUser()
    dispatch(loadPostsByUserId(filterBy))
    // eslint-disable-next-line
  }, [params.userId])

  if (!user) return <section className="feed-load">Loading...</section>

  const isLoggedInUserProfile = loggedInUser?._id === user?._id

  return (
    <section className="profile-page">
      <div className="left">
        <div className="user-profile">
          <div className="bg" style={{ backgroundImage: `url(${user.bg})` }}>
            <div className="img-container">
              <img src={user.imgUrl} alt="" className="img" />
            </div>
          </div>

          <div className="user-details">
            <div>
              <div className="name">
                <h1>{user.fullname}</h1>
              </div>
              <div className="profession">
                <p>{user.profession}</p>
              </div>
              <div className="btns-container">
                {isLoggedInUserProfile && (
                  <button className="add-details">Add more details</button>
                )}
                {!isLoggedInUserProfile && (
                  <button className="connect" onClick={connectProfile}>
                    <FontAwesomeIcon icon="fa-solid fa-user-plus" />
                    <p>{isConnected ? 'Connect' : 'Disconnect'}</p>
                  </button>
                )}
                <button className="follow">Follow</button>
              </div>
            </div>
          </div>
        </div>

        <div className="user-posts">
          <PostsList posts={posts} />
        </div>
      </div>
      <div className="right">
        <div className="top-div"></div>
        <div className="bottom-div"></div>
      </div>
    </section>
  )
}
