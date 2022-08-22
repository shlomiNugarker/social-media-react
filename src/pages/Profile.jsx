import { useHistory, useParams } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { userService } from '../services/user/userService'
import { PostsList } from '../cmps/posts/PostsList'
import { ImgProfilePreview } from '../cmps/profile/ImgProfilePreview'
import { Link } from 'react-router-dom'
import {
  loadPostsByUserId,
  setCurrPage,
  setFilterBy,
} from '../store/actions/postActions'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { EditModal } from '../cmps/profile/EditModal'

export function Profile() {
  const params = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const [isShowImdProfile, setIsShowImdProfile] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const { posts } = useSelector((state) => state.postModule)
  const { loggedInUser } = useSelector((state) => state.userModule)

  const loadUser = async () => {
    const user = await userService.getById(params.userId)
    setUser(() => user)
  }

  const toggleShowImgProfile = () => {
    setIsShowImdProfile((prev) => !prev)
  }
  const toggleShowEditModal = () => {
    setIsShowEditModal((prev) => !prev)
  }

  const onShowProfile = () => {
    console.log('onShowProfile')
    toggleShowImgProfile()
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
    }
  }

  const isConnected = () => {
    return loggedInUser.connections.some(
      (connection) => connection.userId === user._id
    )
  }

  const moveToChat = () => {
    console.log('moveToChat')
    history.push(`/main/message/${user?._id}`)
  }

  useEffect(() => {
    const filterBy = {
      userId: params.userId,
    }
    dispatch(setCurrPage('profile'))
    dispatch(setFilterBy(filterBy))
    loadUser()
    dispatch(loadPostsByUserId(filterBy))

    return () => {
      dispatch(setFilterBy(null))
    }
  }, [params.userId, loggedInUser])

  if (!user) return <section className="feed-load">Loading...</section>

  const isLoggedInUserProfile = loggedInUser?._id === user?._id

  return (
    <section className="profile-page">
      <div className="left">
        <div className="user-profile">
          <div className="bg" style={{ backgroundImage: `url(${user.bg})` }}>
            <div className="img-container" onClick={onShowProfile}>
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
                  <button className="add-details" onClick={toggleShowEditModal}>
                    Edit profile
                  </button>
                )}
                {!isLoggedInUserProfile && (
                  <button className="connect" onClick={connectProfile}>
                    <FontAwesomeIcon icon="fa-solid fa-user-plus" />
                    <p>{isConnected ? 'Connect' : 'Disconnect'}</p>
                  </button>
                )}
                <button className="follow">Follow</button>
                <button className="message" onClick={() => moveToChat()}>
                  Message
                </button>
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
      {isShowImdProfile && (
        <ImgProfilePreview
          toggleShowImgProfile={toggleShowImgProfile}
          user={user}
        />
      )}

      {isShowEditModal && (
        <EditModal toggleShowEditModal={toggleShowEditModal} user={user} />
      )}
    </section>
  )
}
