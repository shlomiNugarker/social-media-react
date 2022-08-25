import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { setCurrPage } from '../store/actions/postActions'
import { NotificationsList } from '../cmps/notifications/NotificationsList'

export function Notifications() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setCurrPage('notifications'))
    // eslint-disable-next-line
  }, [])

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
