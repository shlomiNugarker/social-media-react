import './assets/scss/global.scss'
// import { Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Home } from './pages/Home'
import { Main } from './pages/Main'
import { About } from './pages/About'
import { Signup } from './pages/Signup'
import { getLoggedinUser } from '../src/store/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const App = () => {
  // function handleCallbackResponse(response) {
  //   console.log('Encoded JWT ID token: ' + response.credential)
  //   const userObject = jwt_decode(response.credential)
  //   console.log(userObject)
  // }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLoggedinUser())

    //   google.accounts.id.initialize({
    //     client_id:
    //       '623819778069-7n3g3kj4ivchsgf4s46ud0av2m6kulmk.apps.googleusercontent.com',
    //     callback: handleCallbackResponse,
    //   })

    //   google.accounts.id.renderButton(document.getElementById('signIdDiv'), {
    //     theme: 'outline',
    //     size: 'large',
    //   })
  }, [])

  return (
    <Router>
      <div className="app">
        <div className="temp-div">
          <Link to="/home">Home</Link>|-<Link to="/signup">signup</Link>|-
          <Link to="/about">About</Link>|-<Link to="/main/feed">feed</Link>|-
          <Link to="/main/mynetwork">my-network</Link>|-
          <Link to="/main/jobs">jobs</Link>|-
          <Link to="/main/connections">connections</Link>|-
        </div>
        <main>
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/main" component={Main} />
            <Route path="/about" component={About} />

            <Route path="/" component={Home} />
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default App
