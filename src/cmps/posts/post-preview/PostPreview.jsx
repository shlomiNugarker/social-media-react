import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Comments } from '../../comments/Comments'
import { PostActions } from './PostActions'
import { PostBody } from './PostBody'
import { PostHeader } from './PostHeader'
import { SocialDetails } from './SocialDetails'
import { useCallback, useEffect, useRef, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../../../services/user/userService'
import {
  savePost,
  loadPosts,
  removePost,
} from '../../../store/actions/postActions'
import { useEffectUpdate } from '../../../hooks/useEffectUpdate'
import { PostMenu } from './PostMenu'

export const PostPreview = ({ post }) => {
  const dispatch = useDispatch()
  const [userPost, setUserPost] = useState(null)
  const [isShowComments, setIsShowComments] = useState(false)
  const [isShowMenu, setIsShowMenu] = useState(false)
  const { loggedInUser } = useSelector((state) => state.userModule)

  const toggleMenu = () => {
    console.log('ddd')
    setIsShowMenu((prevVal) => !prevVal)
  }

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

  const onRemovePost = () => {
    console.log(post._id)
    dispatch(removePost(post._id))
  }

  useEffect(() => {
    loadUserPost(post.userId)
  }, [])

  console.log('render PostPreview')
  return (
    <section className="post-preview">
      <div className="menu" onClick={toggleMenu}>
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

      {isShowMenu && (
        <PostMenu toggleMenu={toggleMenu} onRemovePost={onRemovePost} />
      )}
    </section>
  )
}
