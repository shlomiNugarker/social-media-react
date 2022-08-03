import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const CreatePostModal = () => {
  return (
    <section className="create-post-modal">
      <div className="container">
        <div className="title">
          <h1>Create a post</h1>
          <FontAwesomeIcon icon="fa-solid fa-x" />
        </div>

        <div className="name-container">
          <div className="img-container">
            <img src="" alt="" className="img-profile" />
          </div>
          <div className="name">
            <h2>Shlomi Nugarker</h2>
          </div>
        </div>
        <div className="input-container">
          {/* <input type="text" placeholder="What do you want to talk about?" /> */}
          <textarea
            name=""
            id=""
            placeholder="What do you want to talk about?"
          ></textarea>
        </div>

        <div className="btns-add-container">
          <button>Post</button>
        </div>
      </div>
    </section>
  )
}
