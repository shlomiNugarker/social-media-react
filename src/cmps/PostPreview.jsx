import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Comments } from './Comments'
import { PostActions } from './PostActions'
import { PostBody } from './PostBody'
import { PostHeader } from './PostHeader'
import { SocialDetails } from './SocialDetails'
import { useCallback, useEffect, useRef, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../services/user/userService'

export const PostPreview = ({ post, fullname, userId }) => {
  const { body, comments, imgBodyUrl, _id } = post
  const [userPost, setUserPost] = useState(null)
  const [isShowComments, setIsShowComments] = useState(false)

  const loadUserPost = async (id) => {
    if (!post) return
    const userPost = await userService.getById(id)
    setUserPost(() => userPost)
  }

  const toggleShowComment = () => {
    setIsShowComments((prev) => !prev)
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
      <SocialDetails
        comments={comments}
        toggleShowComment={toggleShowComment}
      />
      <hr />
      <PostActions post={post} toggleShowComment={toggleShowComment} />

      {isShowComments && <Comments comments={comments} postId={_id} />}
    </section>
  )
}
