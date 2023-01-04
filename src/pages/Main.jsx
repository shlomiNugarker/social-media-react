import { Feed } from '../pages/Feed'
import { Header } from '../cmps/header/Header'
import { Switch, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Profile } from './Profile'
import { MyNetwork } from './MyNetwork'
import { Map } from './Map'
import { Message } from './Message'
import { Notifications } from './Notifications'
import { SpecificPost } from './SpecificPost'
import { Connections } from './Connections'
import { socketService } from '../services/socket.service'
import {
  addConnectedUserForSocket,
  addConnectedUsersForSocket,
} from '../store/actions/userActions'
import {
  addChatForSocket,
  updateChatForSocket,
} from '../store/actions/chatActions'
import {
  loadActivities,
  setFilterByActivities,
  setUnreadActivitiesIds,
} from '../store/actions/activityAction'
import {
  addCommentForSocket,
  addPostForSocket,
  removeCommentForSocket,
  removePostForSocket,
  updateCommentForSocket,
  updatePostForSocket,
} from '../store/actions/postActions'

export function Main() {
  const dispatch = useDispatch()

  const { loggedInUser } = useSelector((state) => state.userModule)
  const { activities } = useSelector((state) => state.activityModule)
  // const { unreadActivities } = useSelector((state) => state.activityModule)
  // const { unreadMessages } = useSelector((state) => state.activityModule)

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
    return () => {
      dispatch(setUnreadActivitiesIds())
    }
  }, [activities, dispatch])

  useEffect(() => {
    socketService.on('add-post', addPost)
    socketService.on('update-post', updatePost)
    socketService.on('remove-post', removePost)

    socketService.on('add-chat', addChat)
    socketService.on('update-chat', updateChat)

    socketService.on('add-connected-users', addConnectedUsers)
    socketService.on('add-connected-user', addConnectedUser)

    socketService.on('update-comment', updateComment)
    socketService.on('add-comment', addComment)
    socketService.on('remove-comment', removeComment)

    return () => {
      socketService.off('add-post', addPost)
      socketService.off('update-post', updatePost)
      socketService.off('remove-post', removeComment)

      socketService.off('add-chat', addChat)
      socketService.off('update-chat', updateChat)

      socketService.off('add-connected-users', addConnectedUsers)
      socketService.off('add-connected-user', addConnectedUser)

      socketService.off('update-comment', updateComment)
      socketService.off('add-comment', addComment)
      socketService.off('remove-comment', removeComment)
    }
  }, [])

  const addPost = (post) => {
    dispatch(addPostForSocket(post))
  }
  const updatePost = (post) => {
    dispatch(updatePostForSocket(post))
    dispatch(loadActivities())
  }
  const removePost = (postId) => {
    dispatch(removePostForSocket(postId))
  }

  const addChat = (chat) => {
    dispatch(addChatForSocket(chat))
  }
  const updateChat = (chat) => {
    dispatch(updateChatForSocket(chat))
    dispatch(loadActivities())
  }
  const addConnectedUsers = (connectedUsers) => {
    dispatch(addConnectedUsersForSocket(connectedUsers))
  }
  const addConnectedUser = (connectedUser) => {
    dispatch(addConnectedUserForSocket(connectedUser))
  }

  const addComment = (comment) => {
    dispatch(addCommentForSocket(comment))
    dispatch(loadActivities())
  }
  const updateComment = (comment) => {
    dispatch(updateCommentForSocket(comment))
    dispatch(loadActivities())
  }
  const removeComment = (comment) => {
    dispatch(removeCommentForSocket(comment))
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
