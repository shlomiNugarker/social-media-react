import './assets/scss/global.scss'
// import { Redirect } from 'react-router-dom'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Home } from './pages/Home'
import { Main } from './pages/Main'
import { About } from './pages/About'
import { Signup } from './pages/Signup'

function App() {
  return (
    <Router>
      <div className="app">
        <main className="">
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
