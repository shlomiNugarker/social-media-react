import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { setCurrPage } from '../store/actions/postActions'
import { NotificationsList } from '../cmps/notifications/NotificationsList'
import {
  loadActivities,
  setFilterByActivities,
} from '../store/actions/activityAction'

export function Notifications() {
  const { loggedInUser } = useSelector((state) => state.userModule)

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

    // eslint-disable-next-line
  }, [loggedInUser])

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
