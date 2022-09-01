import { useState } from 'react'
import { useEffect } from 'react'
import { userService } from '../../services/user/userService'
import TimeAgo from 'react-timeago'
import { useHistory } from 'react-router-dom'
import loadingCircle from '../../assets/imgs/loading-circle.gif'

export function ThreadMsgPreview({ msg }) {
  const [userMsg, setUserMsg] = useState(null)
  const history = useHistory()

  const loadUserMsg = async (id) => {
    if (!msg) return
    const user = await userService.getById(id)
    setUserMsg(() => user)
  }

  useEffect(() => {
    loadUserMsg(msg.userId)
  }, [])

  return (
    <section className="thread-msg-preview">
      <div className="container-msg">
        <div
          className="img-container"
          onClick={() => history.push(`/main/profile/${userMsg?._id}`)}
        >
          {(userMsg?.imgUrl && (
            <img src={userMsg?.imgUrl || ''} alt="" className="img" />
          )) || <img src={loadingCircle} className="img" alt="" />}
        </div>

        <div className="name-time-container">
          <div className="fullname">
            <h3>{userMsg?.fullname}</h3>
          </div>
          <div className="time">
            <span>
              <TimeAgo date={msg.createdAt} />
            </span>
          </div>
        </div>
      </div>
      <div className="the-msg">
        <p>{msg.txt}</p>
      </div>
    </section>
  )
}
