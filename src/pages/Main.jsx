import { Feed } from '../cmps/Feed'
import { Header } from '../cmps/Header'
import { Switch, Route } from 'react-router-dom'

export function Main() {
  return (
    <div className="main">
      main
      <Header />
      {/* <Switch> */}
      <Route path="/main/feed" component={Feed}></Route>
      {/* </Switch> */}
    </div>
  )
}
