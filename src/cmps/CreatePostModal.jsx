import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useMemo, useState } from 'react'

export const CreatePostModal = ({
  toggleShowCreatePost,
  onAddPost,
  isShowCreatePost,
  loggedInUser,
}) => {
  const [newPost, setNewPost] = useState({
    body: '',
    imgBodyUrl: '',
    title: '',
    style: {
      textAlign: 'ltr',
    },
  })

  const handleChange = async (e) => {
    const field = e.target.name
    let value =
      e.target.type === 'number' ? +e.target.value || '' : e.target.value
    setNewPost((prevCred) => ({ ...prevCred, [field]: value }))
  }

  const doSubmit = () => {
    onAddPost(newPost)
  }

  const inputRef = (elInput) => {
    if (elInput) elInput.focus()
  }

  return (
    <section
      className={
        isShowCreatePost ? ' create-post-modal' : 'hide create-post-modal'
      }
      onClick={(ev) => {
        ev.stopPropagation()
        toggleShowCreatePost()
      }}
    >
      <form
        className="container"
        onSubmit={(ev) => {
          ev.preventDefault()
          doSubmit()
        }}
        onClick={(ev) => {
          ev.stopPropagation()
        }}
      >
        <div className="title">
          <h1>Create a post</h1>
          <span className="close-icon" onClick={toggleShowCreatePost}>
            <FontAwesomeIcon icon="fa-solid fa-x" />
          </span>
        </div>

        <div className="name-container">
          <div className="img-container">
            <img src={loggedInUser.imgUrl} alt="" className="img-profile" />
          </div>
          <div className="name">
            <h2>Shlomi Nugarker</h2>
          </div>
        </div>
        <div className="input-container">
          <textarea
            required
            ref={inputRef}
            onChange={handleChange}
            type="text"
            id="body"
            name="body"
            value={newPost.txt}
            placeholder="What do you want to talk about?"
          ></textarea>
        </div>

        {/* <div className="tools">
          <span>
            <FontAwesomeIcon icon="fa-solid fa-align-right" />
          </span>
        </div> */}

        <div className="btns-add-container">
          <button className="post-btn">Post</button>
        </div>
      </form>
    </section>
  )
}
