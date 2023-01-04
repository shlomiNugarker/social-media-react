import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'

import { uploadImg, uploadVid } from '../../services/imgUpload.service'
import LoadingGif from '../../assets/imgs/loading-gif.gif'

export const CreatePostModal = ({
  toggleShowCreatePost,
  onAddPost,
  isShowCreatePost,
  loggedInUser,
}) => {
  const initPost = {
    body: '',
    imgBodyUrl: null,
    videoBodyUrl: null,
    link: '',
    title: '',
    style: {
      textAlign: 'ltr',
    },
  }

  const [newPost, setNewPost] = useState(initPost)
  const [isUploding, setIsUploding] = useState(false)

  const handleChange = async (e) => {
    const field = e.target.name
    let value =
      e.target.type === 'number' ? +e.target.value || '' : e.target.value
    setNewPost((prevCred) => ({
      ...prevCred,
      [field]: value,
    }))
  }

  useEffect(() => {
    return () => {
      setNewPost(null)
    }
  }, [])

  const doSubmit = () => {
    onAddPost(newPost)
  }

  const inputRef = (elInput) => {
    if (elInput) elInput.focus()
  }

  const onUploadImg = async (ev) => {
    try {
      setIsUploding(true)
      const res = await uploadImg(ev)
      setIsUploding(false)
      setNewPost((prev) => {
        return {
          ...prev,
          imgBodyUrl: res.url,
        }
      })
    } catch (err) {
      setIsUploding(false)
      console.log(err)
    }
  }

  const onUploadVideo = async (ev) => {
    try {
      setIsUploding(true)
      const res = await uploadVid(ev)
      setIsUploding(false)
      setNewPost((prev) => {
        return {
          ...prev,
          videoBodyUrl: res.url,
        }
      })
    } catch (err) {
      setIsUploding(false)
      console.log(err)
    }
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
            <img src={loggedInUser?.imgUrl} alt="" className="img-profile" />
          </div>
          <div className="name">
            <h2>{loggedInUser?.fullname}</h2>
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

        <div className="link-container">
          <input
            id="link"
            name="link"
            value={newPost.link}
            onChange={handleChange}
            type="text"
            placeholder="Add a link here"
          />
        </div>

        <div className="is-loading-container">
          <p>
            {isUploding && (
              <span>
                <img src={LoadingGif} alt="" />
              </span>
            )}
          </p>
        </div>

        <div className="container-video-body">
          <div className="body-video">
            {newPost.videoBodyUrl && (
              <video width="100%" height="300" controls>
                <source src={newPost.videoBodyUrl} type="video/mp4" />
              </video>
            )}
          </div>
        </div>

        <div className="container-img-body">
          <div className="body-img">
            {newPost.imgBodyUrl && (
              <img src={newPost.imgBodyUrl} alt="" className="img" />
            )}
          </div>
        </div>

        <div className="btns-add-container">
          <div
            className="cancel-btn btn"
            onClick={() => {
              setNewPost({
                body: '',
                imgBodyUrl: null,
                videoBodyUrl: null,
                title: '',
                style: {
                  textAlign: 'ltr',
                },
              })

              toggleShowCreatePost()
            }}
          >
            Cancel
          </div>
          {!newPost.videoBodyUrl && (
            <div className="add-video-btn btn">
              <label htmlFor="videoUrl" className="add-video-container">
                <input
                  onChange={onUploadVideo}
                  id="videoUrl"
                  type="file"
                  name="videoUrl"
                  accept="video/*"
                  hidden
                />
                <p className="add-video-body">Add video</p>
              </label>
            </div>
          )}

          {!newPost.imgBodyUrl && (
            <div className="add-img-btn btn">
              <label htmlFor="imgUrl" className="add-img-container">
                <input
                  onChange={onUploadImg}
                  id="imgUrl"
                  type="file"
                  name="imgUrl"
                  accept="image/*"
                  hidden
                />
                <p className="add-img-body">Add photo</p>
              </label>
            </div>
          )}

          <button className="post-btn btn">Done</button>
        </div>
      </form>
    </section>
  )
}
