import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { setCurrPage } from '../store/actions/postActions'
import { NotificationsList } from '../cmps/notifications/NotificationsList'
import loadingGif from '../assets/imgs/loading-gif.gif'
import {
  loadActivities,
  setFilterByActivities,
} from '../store/actions/activityAction'
import { updateUser } from '../store/actions/userActions'

export function Notifications() {
  const { loggedInUser } = useSelector((state) => state.userModule)
  const { activities } = useSelector((state) => state.activityModule)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrPage('notifications'))
    if (loggedInUser?._id) {
      const filterBy = {
        userId: loggedInUser._id,
      }
      dispatch(setFilterByActivities(filterBy))
      dispatch(loadActivities())
    }

    updateLastSeenLoggedUser()

    // eslint-disable-next-line
  }, [loggedInUser])

  const updateLastSeenLoggedUser = () => {
    console.log('updateLastSeenLoggedUser')
    const lastSeen = new Date().getTime()

    dispatch(updateUser({ _id: loggedInUser?._id, lastSeen }))
  }

  if (!activities)
    return (
      <div className="message-page">
        <div className="gif-container">
          <img className="loading-gif" src={loadingGif} alt="" />
        </div>
      </div>
    )

  return (
    <div className="notifications-page">
      <div className="side-bar">
        <div className="container"></div>
      </div>

      <div className="main">
        <div className="container">
          <NotificationsList />
        </div>
      </div>
      <div className="aside">
        <div className="container"></div>
      </div>
    </div>
  )
}
