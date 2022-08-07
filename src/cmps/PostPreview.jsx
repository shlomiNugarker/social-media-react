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
import { savePost, loadPosts } from '../store/actions/postActions'

export const PostPreview = ({ post, userId }) => {
  const dispatch = useDispatch()
  const [userPost, setUserPost] = useState(null)
  const [isShowComments, setIsShowComments] = useState(false)

  const { loggedInUser } = useSelector((state) => state.userModule)
  const { comments } = useSelector((state) => state.commentModule)

  const { body, imgBodyUrl, _id } = post

  const loadUserPost = async (id) => {
    if (!post) return
    const userPost = await userService.getById(id)
    setUserPost(() => userPost)
  }

  const onToggleShowComment = () => {
    setIsShowComments((prev) => !prev)
  }

  const onLikePost = () => {
    const postToSave = JSON.parse(JSON.stringify(post))
    const isAlreadyLike = postToSave.reactions.some(
      (reaction) => reaction.userId === loggedInUser._id
    )
    if (isAlreadyLike) {
      postToSave.reactions = postToSave.reactions.filter(
        (reaction) => reaction.userId !== loggedInUser._id
      )
    }
    //
    else if (!isAlreadyLike) {
      postToSave.reactions.push({
        userId: loggedInUser._id,
        fullname: loggedInUser.fullname,
      })
    }
    dispatch(savePost(postToSave))
    dispatch(loadPosts())
  }

  useEffect(() => {
    loadUserPost(userId)
    dispatch(loadComments(_id))
  }, [])

  console.log('render PostPreview')
  return (
    <section className="post-preview">
      <div className="menu">
        <FontAwesomeIcon className="dots-icon" icon="fa-solid fa-ellipsis" />
      </div>
      <PostHeader post={post} userPost={userPost} />
      <PostBody body={body} imgUrl={imgBodyUrl} />
      <SocialDetails
        comments={comments[post._id]}
        post={post}
        onToggleShowComment={onToggleShowComment}
      />
      <hr />
      <PostActions
        post={post}
        onToggleShowComment={onToggleShowComment}
        onLikePost={onLikePost}
        loggedInUser={loggedInUser}
      />

      {isShowComments && (
        <Comments comments={comments[post._id]} postId={_id} />
      )}
    </section>
  )
}
