import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'

export const AddPost = () => {
  const { loggedInUser } = useSelector((state) => state.userModule)
  console.log(loggedInUser)
  const { imgUrl } = loggedInUser
  return (
    <section className="add-post">
      <section className="top">
        <div className="img-container">
          <img src={imgUrl} alt="" className="icon" />
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
    </section>
  )
}
