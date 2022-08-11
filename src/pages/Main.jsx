import { Feed } from '../pages/Feed'
import { Header } from '../cmps/Header'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedinUser } from '../store/actions/userActions'
import { Profile } from './Profile'
import { MyNetwork } from './MyNetwork'

export function Main() {
  const dispatch = useDispatch()
  dispatch(getLoggedinUser())
  console.log('render Main')
  return (
    <div className="main container">
      <Header />
      {/* <Switch> */}
      <Route path="/main/feed" component={Feed}></Route>
      <Route path="/main/profile/:userId" component={Profile} />
      <Route path="/main/mynetwork" component={MyNetwork} />
      {/* </Switch> */}
    </div>
  )
}
