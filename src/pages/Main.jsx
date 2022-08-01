import { Feed } from '../pages/Feed'
import { Header } from '../cmps/Header'
import { Switch, Route } from 'react-router-dom'

export function Main() {
  return (
    <div className="main container">
      main
      <Header />
      {/* <Switch> */}
      <Route path="/main/feed" component={Feed}></Route>
      {/* </Switch> */}
    </div>
  )
}
