import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Comments } from './Comments'
import { PostActions } from './PostActions'
import { PostBody } from './PostBody'
import { PostHeader } from './PostHeader'
import { SocialDetails } from './SocialDetails'
import { useCallback, useEffect, useRef, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../services/user/userService'
import { savePost, loadPosts } from '../store/actions/postActions'
import { useEffectUpdate } from '../hooks/useEffectUpdate'

export const PostPreview = ({ post, idx }) => {
  const dispatch = useDispatch()
  const [userPost, setUserPost] = useState(null)
  const [isShowComments, setIsShowComments] = useState(false)

  // const post = useSelector((state) => state.postModule.posts[idx])

  const { loggedInUser } = useSelector((state) => state.userModule)

  const loadUserPost = async (id) => {
    if (!post) return
    const userPost = await userService.getById(id)
    setUserPost(() => userPost)
  }

  const onToggleShowComment = () => {
    setIsShowComments((prev) => !prev)
  }

  const onSharePost = (post) => {
    console.log('share !', post)
  }

  const onLikePost = () => {
    const isAlreadyLike = post.reactions.some(
      (reaction) => reaction.userId === loggedInUser._id
    )
    if (isAlreadyLike) {
      post.reactions = post.reactions.filter(
        (reaction) => reaction.userId !== loggedInUser._id
      )
    } else if (!isAlreadyLike) {
      post.reactions.push({
        userId: loggedInUser._id,
        fullname: loggedInUser.fullname,
        reaction: 'like',
      })
    }
    dispatch(savePost(post))
  }

  useEffect(() => {
    loadUserPost(post.userId)
  }, [])

  console.log('render PostPreview')
  return (
    <section className="post-preview">
      <div className="menu">
        <FontAwesomeIcon className="dots-icon" icon="fa-solid fa-ellipsis" />
      </div>
      <PostHeader post={post} userPost={userPost} />
      <PostBody body={post.body} imgUrl={post.imgBodyUrl} />
      <SocialDetails
        comments={post.comments}
        post={post}
        onToggleShowComment={onToggleShowComment}
      />
      <hr />
      <PostActions
        post={post}
        onToggleShowComment={onToggleShowComment}
        onLikePost={onLikePost}
        loggedInUser={loggedInUser}
        onSharePost={onSharePost}
      />

      {isShowComments && (
        <Comments comments={post.comments} postId={post._id} />
      )}
    </section>
  )
}
