import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Comments } from './Comments'
import { PostActions } from './PostActions'
import { PostBody } from './PostBody'
import { PostHeader } from './PostHeader'
import { SocialDetails } from './SocialDetails'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../services/user/userService'

export const PostPreview = ({ post, fullname, userId }) => {
  const { body, comments, imgBodyUrl } = post
  const [userPost, setUserPost] = useState(null)

  const loadUserPost = async (userId) => {
    if (!post) return
    const userPost = await userService.getById(userId)
    setUserPost(userPost)
  }

  useEffect(() => {
    loadUserPost(userId)
    // eslint-disable-next-line
  }, [])

  return (
    <section className="post-preview">
      <div className="menu">
        <FontAwesomeIcon className="dots-icon" icon="fa-solid fa-ellipsis" />
      </div>
      <PostHeader post={post} userPost={userPost} />
      <PostBody body={body} imgUrl={imgBodyUrl} />
      <SocialDetails comments={comments} />
      <hr />
      <PostActions post={post} />
      <Comments comments={comments} />
    </section>
  )
}
