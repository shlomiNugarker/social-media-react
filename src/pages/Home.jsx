import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { login, signup } from '../store/actions/userActions'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const Home = (props) => {
  const dispatch = useDispatch()

  const [cred, setCred] = useState({
    username: 'bbb',
    password: '1234',
    fullname: '',
  })

  const handleChange = async ({ target }) => {
    console.log('handle')
    const field = target.name
    let value = target.type === 'number' ? +target.value || '' : target.value
    setCred((prevCred) => ({ ...prevCred, [field]: value }))
  }

  const doLogin = async () => {
    dispatch(login(cred))
    setCred(() => ({ username: '', password: '', fullname: '' }))
    props.history.push('/main/feed')
  }

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

      <div className="welcome-signin-container">
        <form
          onSubmit={(ev) => {
            ev.preventDefault()
            doLogin()
          }}
          className="form"
        >
          <h1 className="title">
            Welcome to your <br /> professional community
          </h1>
          <input
            onChange={handleChange}
            type="text"
            id="username"
            name="username"
            value={cred.username}
            placeholder="Email or phone number"
            required
          />
          <input
            onChange={handleChange}
            type="text"
            id="password"
            name="password"
            value={cred.password}
            placeholder="Passsword"
            required
          />
          <a href="">Forgot password?</a>
          <div>
            <button>Sign in</button>
          </div>
        </form>
      </div>

      <div className="explore">
        <div className="title-container">
          <h1 className="title">
            Explore topics you <br /> are interested in
          </h1>
        </div>
        <div className="btns-container">
          <h2>CONTENT TOPICS</h2>
          <ul>
            <li>
              <a href=""> See All Topics</a>
            </li>
            <li>
              <a href="">Remote</a>
            </li>
            <li>
              <a href=""> Work from Home</a>
            </li>

            <li>
              <a href="">Retirement</a>
            </li>
            <li>
              <a href="">Internships</a>
            </li>
            <li>
              <a href="">Freelancer</a>
            </li>
            <li>
              <a href="">Salary and Compensation</a>
            </li>
            <li>
              <a href="">Starting a job</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="find">
        <div className="title-container">
          <h1 className="title">
            Find the right job or <br /> internship for you
          </h1>
        </div>
        <div className="btns-container">
          <h2>SUGGESTED SEARCHES</h2>
          <ul>
            <li>
              <a href=""> See All Topics</a>
            </li>
            <li>
              <a href="">Remote</a>
            </li>
            <li>
              <a href=""> Work from Home</a>
            </li>

            <li>
              <a href="">Retirement</a>
            </li>
            <li>
              <a href="">Internships</a>
            </li>
            <li>
              <a href="">Freelancer</a>
            </li>
            <li>
              <a href="">Salary and Compensation</a>
            </li>
            <li>
              <a href="">Starting a job</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="post">
        <div className="title-container">
          <h1 className="title">
            Post your job for <br /> millions of people to see
          </h1>
        </div>
        <div className="btns-container">
          <ul>
            <li>
              <a href=""> Post a job</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="meet">
        <div className="title-container">
          <div>
            <h1 className="title">
              Let the right people know <br /> you're open to work
            </h1>
            <p>
              With the Open To Work feature, you can privately tell recruiters
              or publicly share with the LinkedIn community that you are looking
              for new job opportunities.
            </p>
          </div>
        </div>
        <div className="container-r-side">
          <div className="img-container">
            <img
              className="img"
              src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="connect-learn">
        <div className="connect">
          <div className="img-container">
            <img className="img" src="" alt="" />
          </div>
          <h1>
            Connect with people <br /> who can help
          </h1>
          <a href="">Find people you know</a>
        </div>
        <div className="learn">
          <div className="img-container">
            <img className="img" src="" alt="" />
          </div>
          <h1>
            Learn the skills you <br /> need to succeed
          </h1>
          <a href="">Find people you know</a>
        </div>
      </div>

      <div className="join">
        <div>
          <h1>
            Join your colleagues, classmates, and friends on <br /> LinkedIn.
          </h1>

          <div className="get-started-container">
            <button
              onClick={() => {
                props.history.push('/signup')
              }}
              className="get-started-btn"
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="imgs-container"></div>
      </div>

      <footer className="footer-home">
        <div>
          <p>footer c 2022</p>
        </div>
      </footer>
    </section>
  )
}
