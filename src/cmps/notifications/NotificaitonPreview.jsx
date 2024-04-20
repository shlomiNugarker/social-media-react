import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userService } from '../../services/user/userService'
import TimeAgo from 'react-timeago'
import { useHistory } from 'react-router-dom'
import { postService } from '../../services/posts/postService'
import loadingCircle from '../../assets/imgs/loading-circle.gif'

export function NotificaitonPreview({ activity }) {
  const history = useHistory()
  const [theNotLoggedUser, setTheNotLoggedUser] = useState(null)
  const [str, setStr] = useState(null)
  const [link, setLink] = useState(null)
  const [createdByUser, setCreatedByUser] = useState(null)
  const [createdToUser, setCreatedToUser] = useState(null)
  const [isActivityUnread, setIsActivityUnread] = useState(false)

  const { loggedInUser } = useSelector((state) => state.userModule)
  const { unreadActivities } = useSelector((state) => state.activityModule)

  const checkIfActivityUnread = () => {
    return unreadActivities.some((activityId) => activityId === activity._id)
  }

  const getTheNotLoggedInUser = async () => {
    const userId =
      activity.createdBy === loggedInUser._id
        ? activity.createdTo
        : activity.createdBy

    const user = await userService.getById(userId)
    setTheNotLoggedUser(user)
  }

  const getTheCreatedByUser = () => {
    const user =
      activity.createdBy === loggedInUser._id ? loggedInUser : theNotLoggedUser

    setCreatedByUser(user)
  }

  const getTheCreatedToUser = () => {
    const user =
      activity.createdTo === loggedInUser._id ? loggedInUser : theNotLoggedUser

    setCreatedToUser(user)
  }

  const buildActivityStr = async () => {
    if (!createdByUser || !createdToUser) return

    if (activity.type === 'add-like') {
      const post = await postService.getById(activity.postId)
      const str = `${
        createdByUser?._id === loggedInUser?._id
          ? 'You'
          : createdByUser?.fullname
      } liked  post of ${
        createdToUser._id === loggedInUser._id ? 'you' : createdToUser?.fullname
      }`

      const linkToPost = `post/${post?.userId}/${activity?.postId}`
      setLink(linkToPost)
      setStr(str)
    } else if (activity.type === 'remove-like') {
      const post = await postService.getById(activity.postId)
      const str = `${
        createdByUser?._id === loggedInUser?._id
          ? 'You'
          : createdByUser?.fullname
      } unliked  post of ${
        createdToUser._id === loggedInUser._id ? 'you' : createdToUser?.fullname
      }`

      const linkToPost = `post/${post?.userId}/${activity?.postId}`
      setLink(linkToPost)
      setStr(str)
    }
    //
    else if (activity.type === 'add-comment') {
      const post = await postService.getById(activity.postId)
      const str = `${
        createdByUser?._id === loggedInUser?._id
          ? 'You'
          : createdByUser?.fullname
      } added a comment in your post `

      const linkToPost = `post/${post?.userId}/${activity?.postId}`
      setLink(linkToPost)
      setStr(str)
    } else if (activity.type === 'private-message') {
      const str = `${createdByUser.fullname} sent you a private message`
      const linkToPost = `message/`
      setLink(linkToPost)
      setStr(str)
    }
  }

  useEffect(() => {
    buildActivityStr()
  }, [createdByUser, createdToUser])

  useEffect(() => {
    getTheCreatedToUser()
    getTheCreatedByUser()

    return () => {}
  }, [theNotLoggedUser])

  useEffect(() => {
    if (!theNotLoggedUser) {
      getTheNotLoggedInUser()
    }

    const isActivityUnread = checkIfActivityUnread()

    setIsActivityUnread(isActivityUnread)

    return () => {}
  }, [unreadActivities])

  return (
    <section
      className={`notificaiton-preview ${isActivityUnread ? 'unread' : ''}`}
      onClick={() => {
        history.push(link)
      }}
    >
      <div className="img-container">
        {(createdByUser?.imgUrl && (
          <img src={createdByUser?.imgUrl} alt="" className="img" />
        )) || <img src={loadingCircle} alt="" />}
      </div>

      <div className="content">
        <p>{str}</p>
      </div>
      <div className="menu">
        <p>
          <TimeAgo date={activity.createdAt} />
        </p>
      </div>
    </section>
  )
}
