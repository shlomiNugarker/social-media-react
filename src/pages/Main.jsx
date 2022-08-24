import { Feed } from '../pages/Feed'
import { Header } from '../cmps/header/Header'
import { Switch, Route } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedinUser } from '../store/actions/userActions'
import { Profile } from './Profile'
import { MyNetwork } from './MyNetwork'
import { Map } from './Map'
import { Message } from './Message'
import { Notifications } from './Notifications'
import { Connections } from './Connections'
import { loadChats } from '../store/actions/chatActions'

export function Main() {
  const dispatch = useDispatch()
  dispatch(getLoggedinUser())

  // const { loggedInUser } = useSelector((state) => state.userModule)

  // useEffect(() => {
  //   const userId = loggedInUser?._id
  //   if (userId) dispatch(loadChats(userId))
  //   // eslint-disable-next-line
  // }, [])

  // console.log('render Main')
  return (
    <div className="main-page container">
      <Header />
      {/* <Switch> */}
      <Route path="/main/feed" component={Feed}></Route>
      <Route path="/main/profile/:userId" component={Profile} />
      <Route path="/main/mynetwork" component={MyNetwork} />
      <Route path="/main/map" component={Map} />
      <Route path="/main/message/:userId?" component={Message} />
      <Route path="/main/notifications" component={Notifications} />
      <Route path="/main/connections" component={Connections} />
      {/* </Switch> */}
    </div>
  )
}
