import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Comments } from './Comments'
import { PostActions } from './PostActions'
import { PostBody } from './PostBody'
import { PostHeader } from './PostHeader'
import { SocialDetails } from './SocialDetails'
import { useCallback, useEffect, useRef, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../services/user/userService'
import { loadComments } from '../store/actions/commentAction'

export const PostPreview = ({ post, userId }) => {
  const { body, imgBodyUrl, _id } = post
  const [userPost, setUserPost] = useState(null)
  const [isShowComments, setIsShowComments] = useState(false)

  const { comments } = useSelector((state) => state.commentModule)

  const postComments = comments.filter((comment) => comment.postId === post._id)

  const loadUserPost = async (id) => {
    if (!post) return
    const userPost = await userService.getById(id)
    setUserPost(() => userPost)
  }
  const dispatch = useDispatch()

  const toggleShowComment = () => {
    setIsShowComments((prev) => !prev)
  }

  useEffect(() => {
    loadUserPost(userId)
    dispatch(loadComments(_id))
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
        comments={postComments}
        toggleShowComment={toggleShowComment}
      />
      <hr />
      <PostActions post={post} toggleShowComment={toggleShowComment} />

      {isShowComments && <Comments comments={postComments} postId={_id} />}
    </section>
  )
}
