import { useCallback, useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrPage } from '../store/actions/postActions'

export function Message() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setCurrPage('message'))
    // eslint-disable-next-line
  }, [])

  return (
    <div className="message-page">
      <h1>Message!</h1>
    </div>
  )
}
