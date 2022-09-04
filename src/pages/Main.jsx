import { Feed } from '../pages/Feed'
import { Header } from '../cmps/header/Header'
import { Switch, Route } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { socketService } from '../services/socket.service'

import { getLoggedinUser } from '../store/actions/userActions'
import { Profile } from './Profile'
import { MyNetwork } from './MyNetwork'
import { Map } from './Map'
import { Message } from './Message'
import { Notifications } from './Notifications'
import { Connections } from './Connections'
import {
  addChatForSocket,
  loadChats,
  updateChatForSocket,
} from '../store/actions/chatActions'
import { SpecificPost } from './SpecificPost'
import {
  loadActivities,
  setFilterByActivities,
  setUnreadActivitiesIds,
} from '../store/actions/activityAction'

import { socketService } from '../services/socket.service'
import {
  addPostForSocket,
  removePostForSocket,
  updatePostForSocket,
} from '../store/actions/postActions'

export function Main() {
  const dispatch = useDispatch()

  const { loggedInUser } = useSelector((state) => state.userModule)
  const { activities } = useSelector((state) => state.activityModule)
  const { unreadActivities } = useSelector((state) => state.activityModule)
  const { unreadMessages } = useSelector((state) => state.activityModule)

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
    dispatch(setUnreadActivitiesIds())
    // if (!activities) return
    return () => {
      dispatch(setUnreadActivitiesIds())
    }
  }, [activities])

  useEffect(() => {
    socketService.on('add-post', addPost)
    socketService.on('update-post', updatePost)
    socketService.on('remove-post', removePost)

    socketService.on('add-chat', addChat)
    socketService.on('update-chat', updateChat)

    return () => {
      socketService.off('add-post', addPost)
      socketService.off('update-post', updatePost)
      socketService.off('remove-post', removePost)
      socketService.off('add-chat', addChat)
      socketService.off('update-chat', updateChat)
    }
  }, [])

  const addPost = (post) => {
    console.log('adding post')
    dispatch(addPostForSocket(post))
  }
  const updatePost = (post) => {
    console.log('updating post')
    dispatch(updatePostForSocket(post))
  }
  const removePost = (postId) => {
    console.log('removing post')
    dispatch(removePostForSocket(postId))
  }

  const addChat = (chat) => {
    console.log('adding chat')
    dispatch(addChatForSocket(chat))
  }
  const updateChat = (chat) => {
    console.log('updating chat')
    dispatch(updateChatForSocket(chat))
  }

  console.log('render Main')
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
