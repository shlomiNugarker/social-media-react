import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../../services/user/userService'
import TimeAgo from 'react-timeago'
import { useHistory } from 'react-router-dom'
import { postService } from '../../services/posts/postService'

export function NotificaitonPreview({ activity }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const [theNotLoggedUser, setTheNotLoggedUser] = useState(null)
  const [str, setStr] = useState(null)
  const [link, setLink] = useState(null)
  const [createdByUser, setCreatedByUser] = useState(null)
  const [createdToUser, setCreatedToUser] = useState(null)

  const { loggedInUser } = useSelector((state) => state.userModule)
  const { baseUrl } = useSelector((state) => state.postModule)

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
    }
    //
    else if (activity.type === 'add-comment') {
      const post = await postService.getById(activity.postId)
      const str = `${
        createdByUser?._id === loggedInUser?._id
          ? 'You'
          : createdByUser?.fullname
      } post a comment in your post `

      const linkToPost = `post/${post.userId}/${activity.postId}`
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

    return () => {}
  }, [])

  console.log('render NotificaitonPreview')

  return (
    <section
      className="notificaiton-preview"
      onClick={() => {
        history.push(link)
      }}
    >
      <div className="img-container">
        <img src={createdByUser?.imgUrl} alt="" className="img" />
      </div>

      <div className="content">
        {/* <p>{activity.description}</p> */}
        <p>{str}</p>
        {/* <div className="actions">
          <p>reactions</p>
          <p>14 comments</p>
        </div> */}
      </div>
      <div className="menu">
        <p>
          <TimeAgo date={activity.createdAt} />
        </p>
        {/* <span>
          <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
        </span> */}
      </div>
    </section>
  )
}
