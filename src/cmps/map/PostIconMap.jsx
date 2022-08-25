import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export const PostIconMap = ({ post, setPostToPreview }) => {
  return (
    <section className="post-icon-map">
      <div className="container">
        <div
          className="logo-post-icon-map-container"
          onClick={() => setPostToPreview(post)}
        >
          <span className="img-logo">
            {(post.imgBodyUrl && (
              <img src={post.imgBodyUrl} alt="" className="img" />
            )) || (
              <p>
                <span className="post-logo">
                  <FontAwesomeIcon icon="fa-solid fa-comment-dots" />
                </span>
              </p>
            )}
          </span>
        </div>
      </div>
    </section>
  )
}
