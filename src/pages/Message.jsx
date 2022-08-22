import { useCallback, useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrPage } from '../store/actions/postActions'
import { Messaging } from '../cmps/message/Messaging'
import { loadChats } from '../store/actions/chatActions'

export function Message() {
  const dispatch = useDispatch()
  const { loggedInUser } = useSelector((state) => state.userModule)
  const { chats } = useSelector((state) => state.chatModule)

  useEffect(() => {
    dispatch(setCurrPage('message'))
    const userId = loggedInUser?._id
    if (userId) {
      dispatch(loadChats(userId))
    }
  }, [loggedInUser])

  console.log('render Message')
  if (!chats) return
  return (
    <section className="message-page">
      <Messaging chats={chats} />
      <div className="right-side-message">
        <p>This ad could be yours</p>
      </div>
    </section>
  )
}
