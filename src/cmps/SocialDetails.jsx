export function SocialDetails({ comments, shares, reactions }) {
  if (!comments) return
  return (
    <section className="social-details">
      <div className="likes-count">
        <span>{reactions?.length || ''}</span>
      </div>
      <div className="share-comment">
        <div className="comment-count">
          <p>{comments.length || ''} comment</p>
        </div>
        <div className="share-count">
          <p>{shares?.length || ''} shares</p>
        </div>
      </div>
    </section>
  )
}
