export function SocialDetails({
  comments,
  shares,
  reactions,
  toggleShowComment,
}) {
  if (!comments) return
  return (
    <section className="social-details">
      <div className="likes-count">
        <span>{reactions?.length || ''}</span>
      </div>
      <div className="share-comment">
        <div className="comment-count" onClick={toggleShowComment}>
          <p>
            {!comments?.length
              ? ''
              : comments?.length > 1
              ? comments?.length + ' comments'
              : '1 comment'}
          </p>
        </div>
        <div className="share-count">
          <p>
            {!shares?.length
              ? ''
              : shares?.length > 1
              ? shares?.length + ' shares'
              : '1 share'}
          </p>
        </div>
      </div>
    </section>
  )
}
