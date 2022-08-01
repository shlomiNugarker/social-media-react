export function PostBody({ body, imgUrl }) {
  return (
    <section className="post-body">
      <div className="post-text">
        <p>{body}</p>
      </div>
      <div className="img-container">
        <img src={imgUrl} alt="" />
      </div>
    </section>
  )
}
