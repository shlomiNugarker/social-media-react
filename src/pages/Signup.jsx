import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, signup, logout } from '../store/actions/userActions'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Logo } from '../assets/imgs/Logo'

export const Signup = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [signin, setIsSignin] = useState(true)
  const [cred, setCred] = useState({
    username: '',
    password: '',
    fullname: '',
  })

  const { loggedInUser } = useSelector((state) => state.userModule)

  const handleChange = async ({ target }) => {
    const field = target.name
    let value = target.type === 'number' ? +target.value || '' : target.value
    setCred((prevCred) => ({ ...prevCred, [field]: value }))
  }

  const cleanFields = () =>
    setCred(() => ({ username: '', password: '', fullname: '' }))

  const doLogin = async () => {
    dispatch(login(cred)).then((user) => {
      if (user) history.push('/main/feed')
    })
    cleanFields()
  }

  const doLogout = async () => {
    dispatch(logout())
    cleanFields()
  }

  const doSignup = async () => {
    dispatch(signup(cred)).then((user) => {
      if (user) history.push('/main/feed')
    })
    cleanFields()
  }

  const doSubmit = () => {
    if (signin) doLogin()
    else {
      doSignup()
    }
  }

  const toggle = () => {
    setIsSignin((prevVal) => !prevVal)
  }

  if (loggedInUser) {
    return (
      <section className="sign-up-page">
        <header className="signup-header">
          <Logo />
        </header>
        
        <div className="logged-in-container">
          <div className="logged-in-card">
            <div className="user-profile">
              <div className="img-container">
                <img src={loggedInUser.imgUrl} alt={loggedInUser.fullname} className="profile-img" />
              </div>
              <h2>Welcome back, {loggedInUser.fullname}!</h2>
              <p>You're already signed in</p>
            </div>
            
            <div className="action-buttons">
              <button className="feed-button" onClick={() => history.push('/main/feed')}>
                Go to Feed
              </button>
              <button className="logout-button" onClick={doLogout}>
                <FontAwesomeIcon icon="arrow-right-from-bracket" className="btn-icon" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="sign-up-page">
      <header className="signup-header">
        <Logo />
      </header>
      
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>{signin ? 'Welcome Back' : 'Join TravelsIn'}</h1>
            <p>Connect with travelers around the world</p>
          </div>
          
          <form
            onSubmit={(ev) => {
              ev.preventDefault()
              doSubmit()
            }}
            className="auth-form"
          >
            {!signin && (
              <div className="input-group">
                <label htmlFor="fullname">Full Name</label>
                <div className="input-wrapper">
                  <FontAwesomeIcon icon="user" className="input-icon" />
                  <input
                    required
                    onChange={handleChange}
                    type="text"
                    placeholder="Your full name"
                    id="fullname"
                    name="fullname"
                    value={cred.fullname}
                  />
                </div>
              </div>
            )}
            
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <div className="input-wrapper">
                <FontAwesomeIcon icon="user" className="input-icon" />
                <input
                  onChange={handleChange}
                  type="text"
                  id="username"
                  name="username"
                  value={cred.username}
                  placeholder="Enter your username"
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
                  value={cred.password}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
            
            {signin && (
              <div className="forgot-password">
                <a href="#" onClick={(e) => e.preventDefault()}>Forgot password?</a>
              </div>
            )}
            
            <button type="submit" className="auth-button">
              {signin ? 'Sign In' : 'Create Account'}
            </button>
            
            <div className="mode-toggle">
              <p>
                {signin ? "Don't have an account?" : "Already have an account?"}
                <a
                  href="#"
                  onClick={(ev) => {
                    ev.preventDefault()
                    toggle()
                  }}
                >
                  {signin ? 'Join Now' : 'Sign In'}
                </a>
              </p>
            </div>
          </form>
        </div>
        
        <div className="auth-features">
          <h2>Why Join TravelsIn?</h2>
          <div className="features-list">
            <div className="feature-item">
              <FontAwesomeIcon icon="map-marked-alt" className="feature-icon" />
              <div className="feature-text">
                <h3>Discover New Places</h3>
                <p>Find hidden gems and popular destinations shared by fellow travelers</p>
              </div>
            </div>
            
            <div className="feature-item">
              <FontAwesomeIcon icon="user-friends" className="feature-icon" />
              <div className="feature-text">
                <h3>Connect with Travelers</h3>
                <p>Build your network of travel enthusiasts from around the globe</p>
              </div>
            </div>
            
            <div className="feature-item">
              <FontAwesomeIcon icon="comments" className="feature-icon" />
              <div className="feature-text">
                <h3>Share Your Experiences</h3>
                <p>Post photos, tips, and stories from your adventures</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
