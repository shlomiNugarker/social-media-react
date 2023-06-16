import './assets/scss/global.scss'

import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Home } from './pages/Home'
import { Main } from './pages/Main'
import { About } from './pages/About'
import { Signup } from './pages/Signup'
import { getLoggedinUser } from '../src/store/actions/userActions'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import PrivateRoute from './cmps/PrivateRoute'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLoggedinUser())
  }, [dispatch])

  return (
    <Router>
      <div className="app">
        <main>
          <Switch>
            <PrivateRoute path="/main" component={Main} />
            <Route path="/about" component={About} />
            <Route path="/signup" component={Signup} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default App
