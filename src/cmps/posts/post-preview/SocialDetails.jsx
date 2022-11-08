import { useState } from 'react'
import { LikeList } from '../../LikeList'

export function SocialDetails({ comments, shares, post, onToggleShowComment }) {
  const [isShowLikes, setisShowLikes] = useState(false)

  const toggleLikes = () => {
    setisShowLikes((prevVal) => !prevVal)
  }

  if (!comments) return
  return (
    <section className="social-details">
      <div className="likes-count">
        <span onClick={toggleLikes}>
          {!post.reactions?.length
            ? ''
            : post.reactions?.length > 1
            ? post.reactions?.length + ' likes'
            : '1 like'}
        </span>
      </div>
      <div className="share-comment">
        <div className="comment-count" onClick={onToggleShowComment}>
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
      {isShowLikes && (
        <div
          className="likes-container"
          onClick={(ev) => {
            ev.stopPropagation()
            toggleLikes()
          }}
        >
          <div
            className="likes"
            onClick={(ev) => {
              ev.stopPropagation()
            }}
          >
            <LikeList reactions={post.reactions} toggleLikes={toggleLikes} />
          </div>
        </div>
      )}
    </section>
  )
}
