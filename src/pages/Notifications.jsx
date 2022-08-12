import { useCallback, useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrPage } from '../store/actions/postActions'

export function Notifications() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setCurrPage('notifications'))
    // eslint-disable-next-line
  }, [])

  return (
    <div className="notifications-page">
      <h1>Message!</h1>
    </div>
  )
}
