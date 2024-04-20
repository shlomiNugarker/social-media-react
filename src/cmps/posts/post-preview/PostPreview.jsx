import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Comments } from '../../comments/Comments'
import { PostActions } from './PostActions'
import { PostBody } from './PostBody'
import { PostHeader } from './PostHeader'
import { SocialDetails } from './SocialDetails'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../../../services/user/userService'

import { PostMenu } from './PostMenu'
import { savePost, removePost } from '../../../store/actions/postActions'
import { saveActivity } from '../../../store/actions/activityAction'
import { ImgPreview } from '../../profile/ImgPreview'
import { useParams } from 'react-router-dom'

export const PostPreview = ({ post }) => {
  const dispatch = useDispatch()
  const params = useParams()

  const [userPost, setUserPost] = useState(null)
  const [isShowComments, setIsShowComments] = useState(false)
  const [isShowMenu, setIsShowMenu] = useState(false)
  const [isShowImgPreview, setIsShowImgPreview] = useState(false)

  const { loggedInUser } = useSelector((state) => state.userModule)

  useEffect(() => {
    loadUserPost(post.userId)
    if (params.postId) setIsShowComments(true)
  }, [loggedInUser])

  const toggleMenu = () => {
    setIsShowMenu((prevVal) => !prevVal)
  }

  const toggleShowImgPreview = () => {
    setIsShowImgPreview((prev) => !prev)
  }

  const loadUserPost = async (id) => {
    if (!post) return
    const userPost = await userService.getById(id)
    setUserPost(() => userPost)
  }

  const onToggleShowComment = () => {
    setIsShowComments((prev) => !prev)
  }

  const onSharePost = async () => {
    const shareData = {
      title: 'Post',
      text: 'a post from Travelsdin',
      url: `/main/post/${post.userId}/${post._id}`,
    }

    try {
      await navigator.share(shareData)
    } catch (err) {
      console.log(`Error: ${err}`)
    }
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

    dispatch(savePost(post)).then((savedPost) => {
      if (savedPost?._id === post._id) {
        const newActivity = {
          type: isAlreadyLike ? 'remove-like' : 'add-like',
          createdBy: loggedInUser._id,
          createdTo: post.userId,
          postId: post._id,
        }
        dispatch(saveActivity(newActivity))
      }
    })
  }

  const onRemovePost = () => {
    dispatch(removePost(post._id))
  }

  function copyToClipBoard() {
    const postUrl = `https://travelsdin-express-production.up.railway.app/#/main/post/${post.userId}/${post._id}`
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(postUrl)
    // alert('Copied the text: ' + postUrl)
  }

  return (
    <section className="post-preview">
      <div className="menu" onClick={toggleMenu}>
        <FontAwesomeIcon className="dots-icon" icon="fa-solid fa-ellipsis" />
      </div>
      <PostHeader post={post} userPost={userPost} />
      <PostBody
        body={post.body}
        imgUrl={post.imgBodyUrl}
        videoUrl={post.videoBodyUrl}
        link={post.link}
        title={post.title}
        toggleShowImgPreview={toggleShowImgPreview}
      />
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
        <Comments
          comments={post.comments}
          postId={post._id}
          userPostId={post.userId}
        />
      )}

      {isShowMenu && (
        <PostMenu
          toggleMenu={toggleMenu}
          onRemovePost={onRemovePost}
          postUserId={post.userId}
          copyToClipBoard={copyToClipBoard}
        />
      )}

      {isShowImgPreview && (
        <ImgPreview
          toggleShowImg={toggleShowImgPreview}
          imgUrl={post.imgBodyUrl}
          title="Image"
        />
      )}
    </section>
  )
}
