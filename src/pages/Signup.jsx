import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, signup, logout } from '../store/actions/userActions'
import { useHistory } from 'react-router-dom'

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

  const tooggle = () => {
    setIsSignin((prevVal) => !prevVal)
  }

  if (loggedInUser) {
    return (
      <section className="sign-up-page">
        <div className="logged-in-mode">
          <div className="img-container">
            <img src={loggedInUser.imgUrl} alt="" className="img" />
          </div>
          <p>{loggedInUser.fullname}</p>
          <button onClick={doLogout}>Logout</button>
        </div>
      </section>
    )
  }

  return (
    <section className="sign-up-page">
      <div className="logo-container" onClick={() => history.push(`/home`)}>
        <p>T</p>
      </div>
      <div className="form-container">
        <form
          onSubmit={(ev) => {
            ev.preventDefault()
            doSubmit()
          }}
        >
          <h1>{signin ? 'Sign in' : 'Sign up'}</h1>
          <p>Stay updated with your amazing community</p>
          {!signin && (
            <input
              required
              onChange={handleChange}
              type="text"
              placeholder="Fullname"
              id="fullname"
              name="fullname"
              value={cred.fullname}
            />
          )}
          <input
            onChange={handleChange}
            type="text"
            id="username"
            name="username"
            value={cred.username}
            placeholder="Username"
            required
          />
          <input
            onChange={handleChange}
            type="password"
            id="password"
            name="password"
            value={cred.password}
            placeholder="Passsword"
            required
          />
          <a href=" ">Forgot password?</a>

          <button className="sign-in-btn">
            {signin ? 'Sign in' : 'Sign up'}
          </button>
          {/* <div className="divider-container">
            <span></span>
            <span>or</span>
            <span></span>
          </div>
          <button className="sign-in-apple-btn">Sign in with Apple</button> */}
        </form>
        <div className="to-sign-up-container">
          <p>
            <a
              href=" "
              onClick={(ev) => {
                ev.preventDefault()
                tooggle()
              }}
            >
              {signin
                ? ' New to Travelsdin? Join now'
                : 'Already on Travelsdin? Sign in'}
            </a>
          </p>
        </div>
      </div>

      {/* <footer className="footer-container">
        <div className="footer">footer</div>
      </footer> */}
    </section>
  )
}
