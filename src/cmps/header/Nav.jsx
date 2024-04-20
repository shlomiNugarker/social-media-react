import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const Nav = () => {
  const { currPage } = useSelector((state) => state.postModule)

  const { loggedInUser } = useSelector((state) => state.userModule)
  const { unreadActivities } = useSelector((state) => state.activityModule)
  const { unreadMessages } = useSelector((state) => state.activityModule)

  return (
    <nav className="nav">
      <ul>
        <li
          className={'home' + ' ' + (currPage === 'home' ? 'current-btn' : '')}
        >
          <Link to="/main/feed">
            <p>
              <FontAwesomeIcon
                className={
                  'nav-icon' + ' ' + (currPage === 'home' ? 'curr-logo' : '')
                }
                icon="fas fa-home-lg-alt"
              />
              <span>Home</span>
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
                className={
                  'nav-icon' +
                  ' ' +
                  (currPage === 'mynetwork' ? 'curr-logo' : '')
                }
                icon="fas fa-user-friends"
              />
              <span>My Network</span>
            </p>
          </Link>
        </li>
        <li className={'map' + ' ' + (currPage === 'map' ? 'current-btn' : '')}>
          <Link to="/main/map">
            <p>
              <FontAwesomeIcon
                className={
                  'nav-icon' + ' ' + (currPage === 'map' ? 'curr-logo' : '')
                }
                icon="fa-solid fa-map-location"
              />

              <span>Map</span>
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
              <FontAwesomeIcon
                className={
                  'nav-icon' + ' ' + (currPage === 'message' ? 'curr-logo' : '')
                }
                icon="fas fa-comment"
              />
              <span>Messaging</span>
              {unreadMessages?.length > 0 && (
                <span className="number">{unreadMessages?.length}</span>
              )}
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
              <FontAwesomeIcon
                className={
                  'nav-icon' +
                  ' ' +
                  (currPage === 'notifications' ? 'curr-logo' : '')
                }
                icon="fas fa-bell"
              />
              <span>Notifications</span>
              {unreadActivities?.length > 0 && (
                <span className="number">{unreadActivities?.length}</span>
              )}
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
              <span className="txt">Me</span>
            </p>
          </Link>
        </li>
        <li className="volunteering-btn">
          <p>
            <FontAwesomeIcon
              className={
                'nav-icon' +
                ' ' +
                (currPage === 'volunteering' ? 'curr-logo' : '')
              }
              icon="fas fa-th"
            />
            Volunteer
          </p>
        </li>
        <li className="post-volunteer-btn">
          <p>
            <FontAwesomeIcon
              className={
                'nav-icon' +
                ' ' +
                (currPage === 'post-volunteer' ? 'curr-logo' : '')
              }
              icon="fas fa-plus"
            />
            more
          </p>
        </li>
      </ul>
    </nav>
  )
}
