import { useCallback, useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrPage } from '../store/actions/postActions'
import { Messaging } from '../cmps/message/Messaging'
import { loadChats } from '../store/actions/chatActions'
import { useParams } from 'react-router-dom'

export function Message() {
  const dispatch = useDispatch()
  const params = useParams()
  const { loggedInUser } = useSelector((state) => state.userModule)
  const { chats } = useSelector((state) => state.chatModule)

  const openChat = () => {
    if (params.userId) {
      // console.log('show/create chat of the userId', params.userId)
    } else {
      // console.log('no userId, open the first user in the list')
    }
  }

  const checkIfChatExist = () => {
    return chats?.some((chat) => {
      return chat.userId === params.userId || chat.userId2 === params.userId
    })
  }

  useEffect(() => {
    dispatch(setCurrPage('message'))
    const userId = loggedInUser?._id
    if (userId) dispatch(loadChats(userId))
    const isChatExist = checkIfChatExist()
    console.log(isChatExist)

    openChat()
  }, [loggedInUser, params.userId])

  // console.log('render Message')
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
