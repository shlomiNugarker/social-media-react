import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, setLogingLoading } from '../store/actions/userActions'
import { useHistory } from 'react-router-dom'
import loading from '../assets/imgs/loading-gif.gif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Logo } from '../assets/imgs/Logo'

export const Home = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [creds, setCreds] = useState({
    username: 'guest123',
    password: '1234',
  })

  const [msg, setMsg] = useState('')

  const { isLogingLoading } = useSelector((state) => state.userModule)

  const showMsg = (txt) => {
    setMsg(txt)
    setTimeout(() => setMsg(''), 3000)
  }

  const handleChange = async ({ target }) => {
    const field = target.name
    let value = target.type === 'number' ? +target.value || '' : target.value
    setCreds((prevCred) => ({ ...prevCred, [field]: value }))
  }

  const doLogin = () => {
    dispatch(setLogingLoading(true))
    dispatch(login(creds))
      .then((savedUser) => {
        setCreds(() => ({ username: '', password: '' }))
        props.history.push('/main/feed')
        dispatch(setLogingLoading(false))
      })
      .catch((err) => {
        dispatch(setLogingLoading(false))
        showMsg('Something went wrong...')
        console.log(err)
      })
  }

  return (
    <section className="home-page">
      <header className="home-header">
        <Logo />
        <nav className="home-nav">
          <ul>
            <li>
              <button
                className="join-now-btn"
                onClick={() => history.push(`/signup`)}
              >
                <span>Join now</span>
              </button>
            </li>
            <li>
              <button
                className="sign-in-btn"
                onClick={() => history.push(`/signup`)}
              >
                <span>Sign in</span>
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <div className="hero-container">
        <div className="hero-content">
          <div className="welcome-text">
            <h1>Connect with travelers<br/>around the world</h1>
            <p>Join our community to share experiences, find travel companions, and discover new destinations.</p>
            <button 
              className="cta-button"
              onClick={() => history.push(`/signup`)}
            >
              Get Started
            </button>
          </div>
          
          <div className="login-card">
            <form
              onSubmit={(ev) => {
                ev.preventDefault()
                doLogin()
              }}
              className="login-form"
            >
              <h2>Welcome Back</h2>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <div className="input-wrapper">
                  <FontAwesomeIcon icon="user" className="input-icon" />
                  <input
                    onChange={handleChange}
                    type="text"
                    id="username"
                    name="username"
                    value={creds.username}
                    placeholder="Email or username"
                    required
                  />
                </div>
              </div>
              
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <FontAwesomeIcon icon="lock" className="input-icon" />
                  <input
                    onChange={handleChange}
                    type="password"
                    id="password"
                    name="password"
                    value={creds.password}
                    placeholder="Password"
                    required
                  />
                </div>
              </div>

              {msg && (
                <div className="error-message">
                  <FontAwesomeIcon icon="exclamation-circle" />
                  <p>{msg}</p>
                </div>
              )}

              <button type="submit" className="login-button">
                Sign in
              </button>
              
              <div className="login-footer">
                <span>New to TravelsIn?</span>
                <a onClick={() => history.push(`/signup`)}>Create account</a>
              </div>
            </form>
          </div>
        </div>
        
        <div className="features-section">
          <h2>Connect. Explore. Share.</h2>
          <div className="feature-cards">
            <div className="feature-card">
              <div className="feature-icon">
                <FontAwesomeIcon icon="map-marked-alt" />
              </div>
              <h3>Interactive Maps</h3>
              <p>Discover travel destinations and connect with travelers worldwide</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FontAwesomeIcon icon="comments" />
              </div>
              <h3>Real-time Messaging</h3>
              <p>Connect with fellow travelers and share experiences instantly</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FontAwesomeIcon icon="user-friends" />
              </div>
              <h3>Find Companions</h3>
              <p>Connect with like-minded travelers for your next adventure</p>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="home-footer">
        <div className="footer-content">
          <p>&copy; 2023 TravelsIn. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">About</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
      
      {isLogingLoading && (
        <div className="loading-container">
          <img className="loading-logo" src={loading} alt="" />
        </div>
      )}
    </section>
  )
}
