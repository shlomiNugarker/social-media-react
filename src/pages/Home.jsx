import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { login, setLogingLoading } from '../store/actions/userActions'
import { useHistory } from 'react-router-dom'

import loading from '../assets/imgs/loading-gif.gif'

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
        <div>
          <div className="home-logo">T</div>
        </div>
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

      <div className="welcome-signin-container">
        <form
          onSubmit={(ev) => {
            ev.preventDefault()
            doLogin()
          }}
          className="form"
        >
          <h1 className="title">
            Welcome to your <br /> traveler's community
          </h1>
          <input
            onChange={handleChange}
            type="text"
            id="username"
            name="username"
            value={creds.username}
            placeholder="Email or phone number"
            required
          />
          <input
            onChange={handleChange}
            type="password"
            id="password"
            name="password"
            value={creds.password}
            placeholder="Passsword"
            required
          />

          <div className="msg">
            <p>{msg}</p>
          </div>

          <a onClick={() => history.push(`/signup`)}>Or sign-up</a>
          <div>
            <button>Sign in</button>
          </div>
        </form>
      </div>
      {isLogingLoading && <img className="loading-logo" src={loading} alt="" />}
    </section>
  )
}
