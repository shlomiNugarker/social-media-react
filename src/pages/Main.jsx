import { lazy, Suspense, useCallback } from 'react'
import { Header } from '../cmps/header/Header'
import { Switch } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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

import PrivateRoute from '../cmps/PrivateRoute'

const Feed = lazy(() => import('../pages/Feed'))
const SpecificPost = lazy(() => import('./SpecificPost'))
const Profile = lazy(() => import('./Profile'))
const MyNetwork = lazy(() => import('./MyNetwork'))
const Map = lazy(() => import('./Map'))
const Message = lazy(() => import('./Message'))
const Notifications = lazy(() => import('./Notifications'))
const Connections = lazy(() => import('./Connections'))

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
    } else {
    }
  }, [dispatch, loggedInUser?._id])

  useEffect(() => {
    dispatch(setUnreadActivitiesIds())
    return () => {
      dispatch(setUnreadActivitiesIds())
    }
  }, [activities, dispatch])


  const addPost = useCallback((post) => {
    dispatch(addPostForSocket(post))
  }, [dispatch])

  const updatePost = useCallback((post) => {
    dispatch(updatePostForSocket(post))
    dispatch(loadActivities())
  }, [dispatch])

  const removePost = useCallback((postId) => {
    dispatch(removePostForSocket(postId))
  }, [dispatch])

  const addChat = useCallback((chat) => {
    dispatch(addChatForSocket(chat))
  }, [dispatch])

  const updateChat = useCallback((chat) => {
    dispatch(updateChatForSocket(chat))
    dispatch(loadActivities())
  }, [dispatch])

  const addConnectedUsers = useCallback((connectedUsers) => {
    dispatch(addConnectedUsersForSocket(connectedUsers))
  }, [dispatch])

  const addConnectedUser = useCallback((connectedUser) => {
    dispatch(addConnectedUserForSocket(connectedUser))
  }, [dispatch])

  const addComment = useCallback((comment) => {
    dispatch(addCommentForSocket(comment))
    dispatch(loadActivities())
  }, [dispatch])

  const updateComment = useCallback((comment) => {
    dispatch(updateCommentForSocket(comment))
    dispatch(loadActivities())
  }, [dispatch])

  const removeComment = useCallback((comment) => {
    dispatch(removeCommentForSocket(comment))
  }, [dispatch])

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
  }, [addChat, addComment, addConnectedUser, addConnectedUsers, addPost, removeComment, removePost, updateChat, updateComment, updatePost])


  return (
    <div className="main-page container">
      <Header />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <PrivateRoute path="/main/feed" component={Feed} />
          <PrivateRoute
            path="/main/post/:userId/:postId"
            component={SpecificPost}
          />
          <PrivateRoute path="/main/profile/:userId" component={Profile} />
          <PrivateRoute path="/main/mynetwork" component={MyNetwork} />
          <PrivateRoute path="/main/map" component={Map} />
          <PrivateRoute path="/main/message/:userId?" component={Message} />
          <PrivateRoute path="/main/notifications" component={Notifications} />
          <PrivateRoute path="/main/connections" component={Connections} />
        </Switch>
      </Suspense>
    </div>
  )
}
