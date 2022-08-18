import { useCallback, useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrPage } from '../store/actions/postActions'
import { Messaging } from '../cmps/message/Messaging'

export function Message() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setCurrPage('message'))
  }, [])

  return (
    <section className="message-page">
      <Messaging />
      <div className="right-side-message">
        <p>This ad could be yours</p>
      </div>
    </section>
  )
}
