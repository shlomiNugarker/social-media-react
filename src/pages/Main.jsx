import { Feed } from '../pages/Feed'
import { Header } from '../cmps/Header'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedinUser } from '../store/actions/userActions'
import { Profile } from './Profile'
import { MyNetwork } from './MyNetwork'
import { Jobs } from './Jobs'
import { Message } from './Message'
import { Notifications } from './Notifications'
import { Connections } from './Connections'

export function Main() {
  const dispatch = useDispatch()
  dispatch(getLoggedinUser())
  console.log('render Main')
  return (
    <div className="main-page container">
      <Header />
      {/* <Switch> */}
      <Route path="/main/feed" component={Feed}></Route>
      <Route path="/main/profile/:userId" component={Profile} />
      <Route path="/main/mynetwork" component={MyNetwork} />
      <Route path="/main/jobs" component={Jobs} />
      <Route path="/main/message" component={Message} />
      <Route path="/main/notifications" component={Notifications} />
      <Route path="/main/connections" component={Connections} />
      {/* </Switch> */}
    </div>
  )
}
