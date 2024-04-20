import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setCurrPage } from '../store/actions/postActions'
import { NotificationsList } from '../cmps/notifications/NotificationsList'
import loadingGif from '../assets/imgs/loading-gif.gif'
import {
  loadActivities,
  setFilterByActivities,
  setUnreadActivitiesIds,
} from '../store/actions/activityAction'
import { updateUser } from '../store/actions/userActions'

function Notifications() {
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

    return async () => {
      await updateLastSeenLoggedUser()
      dispatch(setUnreadActivitiesIds())
    }
  }, [])

  const updateLastSeenLoggedUser = async () => {
    const lastSeenActivity = new Date().getTime()

    await dispatch(updateUser({ ...loggedInUser, lastSeenActivity }))
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

export default Notifications
