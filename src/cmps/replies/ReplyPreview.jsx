import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { userService } from '../../services/user/userService'
import TimeAgo from 'react-timeago'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const ReplyPreview = ({ reply, updateReply }) => {
  const { userId } = reply
  const { loggedInUser } = useSelector((state) => state.userModule)
  const [userReply, setUserReply] = useState(null)

  const onLikeReply = () => {
    const replyToUpdate = { ...reply }
    const isAlreadyLike = replyToUpdate.reactions.some(
      (reaction) => reaction.userId === loggedInUser._id
    )
    if (isAlreadyLike) {
      replyToUpdate.reactions = replyToUpdate.reactions.filter(
        (reaction) => reaction.userId !== loggedInUser._id
      )
    } else if (!isAlreadyLike) {
      replyToUpdate.reactions.push({
        userId: loggedInUser._id,
        fullname: loggedInUser.fullname,
        reaction: 'like',
      })
    }
    updateReply(replyToUpdate)
  }

  const loadUser = async () => {
    const userReply = await userService.getById(userId)
    setUserReply(userReply)
  }

  useEffect(() => {
    loadUser()
  }, [])

  if (!userReply) return

  const isLogedInUserLikeReply = reply?.reactions.some((reaction) => {
    return loggedInUser._id === reaction.userId
  })

  const likeBtnStyle = isLogedInUserLikeReply ? 'liked' : ''

  return (
    <section className="reply-preview">
      <div className="img-profile-reply">
        <img src={userReply.imgUrl} alt="" className="img" />
      </div>
      <div className="user-container">
        <div className="user-details">
          <div className="details-user-container">
            <div>
              <h3>{userReply.fullname}</h3>
              <p>{userReply.profession}</p>
            </div>
            <div>
              <TimeAgo date={reply.createdAt}></TimeAgo>
              <span className="logo-dots">
                <FontAwesomeIcon
                  className="dots-icon"
                  icon="fa-solid fa-ellipsis"
                />
              </span>
            </div>
          </div>
          <p className="reply-txt">{reply.txt}</p>
        </div>
        <div className="reply-actions">
          <span>{reply.reactions?.length || ''}</span>
          <button
            className={'like ' + likeBtnStyle}
            onClick={() => onLikeReply()}
          >
            Like
          </button>
        </div>
      </div>
    </section>
  )
}
