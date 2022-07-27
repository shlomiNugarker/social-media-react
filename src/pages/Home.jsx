import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Home = () => {
  return (
    <section className="home-page">
      <header className="home-header">
        <div>
          <div className="home-logo">Linkedin</div>
        </div>
        <nav className="home-nav">
          <ul>
            <li>
              <button>
                <FontAwesomeIcon icon="fa-solid fa-compass" />
                <span>Discover</span>
              </button>
            </li>
            <li>
              <button>
                <FontAwesomeIcon icon="fa-solid fa-user-group" />
                <span>People</span>
              </button>
            </li>
            <li>
              <button>
                <FontAwesomeIcon icon="fa-solid fa-compass" />
                <span>Learning</span>
              </button>
            </li>
            <li>
              <button>
                <FontAwesomeIcon icon="fa-solid fa-compass" />
                <span>Jobs</span>
              </button>
            </li>
            <div className="divider"></div>
            <li>
              <button className="join-now-btn">
                <span>Join now</span>
              </button>
            </li>
            <li>
              <button className="sign-in-btn">
                <span>Sign in</span>
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </section>
  )
}
