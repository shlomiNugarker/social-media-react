import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const Nav = () => {
  const { currPage } = useSelector((state) => state.postModule)

  // current-btn

  const { loggedInUser } = useSelector((state) => state.userModule)

  return (
    <nav className="nav">
      <ul>
        <li
          className={'home' + ' ' + (currPage === 'home' ? 'current-btn' : '')}
        >
          <Link to="/main/feed">
            <p>
              <FontAwesomeIcon className="nav-icon" icon="fas fa-home-lg-alt" />
              Home
            </p>
          </Link>
        </li>
        <li
          className={
            'mynetwork' + ' ' + (currPage === 'mynetwork' ? 'current-btn' : '')
          }
        >
          <Link to={`/main/mynetwork`}>
            <p>
              <FontAwesomeIcon
                className="nav-icon"
                icon="fas fa-user-friends"
              />
              My Network
            </p>
          </Link>
        </li>
        <li className={'map' + ' ' + (currPage === 'map' ? 'current-btn' : '')}>
          <Link to="/main/map">
            <p>
              <FontAwesomeIcon
                className="nav-icon"
                icon="fa-solid fa-map-location"
              />
              {/* <FontAwesomeIcon className="nav-icon" icon="fas fa-suitcase" /> */}
              Map
            </p>
          </Link>
        </li>
        <li
          className={
            'messaging' + ' ' + (currPage === 'message' ? 'current-btn' : '')
          }
        >
          <Link to={`/main/message`}>
            <p>
              <FontAwesomeIcon className="nav-icon" icon="fas fa-comment" />
              Messaging
            </p>
          </Link>
        </li>
        <li
          className={
            'notifications' +
            ' ' +
            (currPage === 'notifications' ? 'current-btn' : '')
          }
        >
          <Link to={`/main/notifications`}>
            <p>
              <FontAwesomeIcon className="nav-icon" icon="fas fa-bell" />
              Notifications
            </p>
          </Link>
        </li>
        <li
          className={
            'me-btn' + ' ' + (currPage === 'profile' ? 'current-btn' : '')
          }
        >
          <Link to={`/main/profile/${loggedInUser?._id}`}>
            <p>
              <span>
                <img
                  src={loggedInUser?.imgUrl}
                  alt=""
                  className="profile-icon"
                />
              </span>
              <span>
                Me
                {/* <FontAwesomeIcon
                  className="down-icon"
                  icon="fas fa-sort-down"
                /> */}
              </span>
            </p>
          </Link>
        </li>
        <li>
          <p>
            <FontAwesomeIcon className="nav-icon" icon="fas fa-th" />
            Work
          </p>
        </li>
        <li>
          <p>
            <FontAwesomeIcon className="nav-icon" icon="fas fa-plus" />
            Post a job
          </p>
        </li>
      </ul>
    </nav>
  )
}
