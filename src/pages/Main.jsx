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
import { SpecificPost } from './SpecificPost'
import {
  loadActivities,
  setFilterByActivities,
  setUnreadActivitiesIds,
} from '../store/actions/activityAction'

export function Main() {
  const dispatch = useDispatch()

  const { loggedInUser } = useSelector((state) => state.userModule)
  const { activities } = useSelector((state) => state.activityModule)

  useEffect(() => {
    if (loggedInUser?._id) {
      const filterBy = {
        userId: loggedInUser._id,
      }
      dispatch(setFilterByActivities(filterBy))
      dispatch(loadActivities())
    }
  }, [])

  useEffect(() => {
    getUnreadNotfications()

    return () => {}
  }, [activities])

  const getUnreadNotfications = () => {
    if (!activities) return
    // lastSennUser > activity.createdAt = unread++
    getUnReadActivitiesCount()
  }

  const getUnReadActivitiesCount = () => {
    if (!activities) return
    let unreadActivities = []
    activities.forEach((activity) => {
      if (loggedInUser.lastSeen < activity.createdAt) {
        if (loggedInUser._id === activity.createdBy) return
        unreadActivities.push(activity._id)
      }
    })
    // console.log({ unreadActivities })

    dispatch(setUnreadActivitiesIds(unreadActivities))
  }

  // console.log('render Main')
  return (
    <div className="main-page container">
      <Header />
      <Switch>
        <Route path="/main/feed" component={Feed} />
        <Route path="/main/post/:userId/:postId" component={SpecificPost} />
        <Route path="/main/profile/:userId" component={Profile} />
        <Route path="/main/mynetwork" component={MyNetwork} />
        <Route path="/main/map" component={Map} />
        <Route path="/main/message/:userId?" component={Message} />
        <Route path="/main/notifications" component={Notifications} />
        <Route path="/main/connections" component={Connections} />
      </Switch>
    </div>
  )
}
