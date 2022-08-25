export function PostBody({ body, imgUrl, videoUrl }) {
  return (
    <section className="post-body">
      <div className="post-text">
        <p>{body}</p>
      </div>
      <div className="img-container">
        {imgUrl && <img src={imgUrl} alt="" />}
      </div>
      <div className="video-container">
        {videoUrl && (
          <video width="100%" height="300" controls>
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}
      </div>
    </section>
  )
}
