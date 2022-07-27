import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li className="home current-btn">
          <p>
            <FontAwesomeIcon className="nav-icon" icon="fas fa-home-lg-alt" />
            Home
          </p>
        </li>
        <li>
          <p>
            <FontAwesomeIcon className="nav-icon" icon="fas fa-user-friends" />
            My Network
          </p>
        </li>
        <li>
          <p>
            <FontAwesomeIcon className="nav-icon" icon="fas fa-suitcase" />
            Jobs
          </p>
        </li>
        <li>
          <p>
            <FontAwesomeIcon className="nav-icon" icon="fas fa-comment" />
            Messaging
          </p>
        </li>
        <li>
          <p>
            <FontAwesomeIcon className="nav-icon" icon="fas fa-bell" />
            Notifications
          </p>
        </li>
        <li className="me-btn">
          <p>
            <span className="profile-icon"></span>
            <span>
              Me
              <FontAwesomeIcon className="down-icon" icon="fas fa-sort-down" />
            </span>
          </p>
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
