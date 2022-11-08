import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { CreatePostModal } from './CreatePostModal'
import { useState } from 'react'
import { savePost } from '../../store/actions/postActions'

export const AddPost = () => {
  const dispatch = useDispatch()

  const { loggedInUser } = useSelector((state) => state.userModule)

  const [isShowCreatePost, setIsShowCreatePost] = useState(false)

  const toggleShowCreatePost = () => {
    setIsShowCreatePost((prev) => !prev)
  }

  const onAddPost = (post) => {
    const postToAdd = {
      ...post,
      userId: loggedInUser._id,
      fullname: loggedInUser.fullname,
    }
    dispatch(savePost(postToAdd)).then(() => toggleShowCreatePost())
  }

  return (
    <section className="add-post" onClick={toggleShowCreatePost}>
      <section className="top">
        <div className="img-container">
          <img src={loggedInUser.imgUrl} alt="" className="icon" />
        </div>
        <button className="input-container">
          <span>Start a post</span>
        </button>
      </section>

      <section className="btns-container">
        <button>
          <FontAwesomeIcon className="photo icon" icon="fa-solid fa-image" />
          <span>Photo</span>
        </button>
        <button>
          <FontAwesomeIcon className="video icon" icon="fa-solid fa-video" />
          <span>Video</span>
        </button>
        <button>
          <FontAwesomeIcon
            className="calendar icon"
            icon="fa-solid fa-calendar-days"
          />
          <span>Event</span>
        </button>
        <button>
          <FontAwesomeIcon
            className="newspaper icon"
            icon="fa-solid fa-newspaper"
          />
          <span>Write article</span>
        </button>
      </section>
      {
        <CreatePostModal
          isShowCreatePost={isShowCreatePost}
          toggleShowCreatePost={toggleShowCreatePost}
          onAddPost={onAddPost}
          loggedInUser={loggedInUser}
        />
      }
    </section>
  )
}
