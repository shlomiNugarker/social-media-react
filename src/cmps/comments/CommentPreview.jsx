import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { removeComment } from '../../store/actions/postActions'
import { useHistory } from 'react-router-dom'
import { userService } from '../../services/user/userService'
import { utilService } from '../../services/utilService'
import { CommentMenu } from './CommentMenu'
import { ReplyList } from '../replies/ReplyList'
import TimeAgo from 'react-timeago'

export const CommentPreview = ({ comment, onSaveComment }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { userId, createdAt, postId, reactions, replies } = comment
  const [userComment, setUserComment] = useState(null)
  const [isShowinputComment, setIsShowinputComment] = useState(false)
  const [isShowreplyList, setIsShowReplyList] = useState(false)
  const [isShowMenu, setIsShowMenu] = useState(false)
  const [isFirstFocus, setIsFirstFocus] = useState(true)

  const [replyField, setReplyField] = useState({
    txt: '',
  })
  const { loggedInUser } = useSelector((state) => state.userModule)

  const toggleMenu = () => {
    setIsShowMenu((prevVal) => !prevVal)
  }

  const loadUserComment = async (userId) => {
    if (!userId) return
    const userComment = await userService.getById(userId)
    setUserComment(userComment)
  }

  const onLikeComment = () => {
    const commentToSave = { ...comment }
    const isAlreadyLike = commentToSave.reactions.some(
      (reaction) => reaction.userId === loggedInUser._id
    )
    if (isAlreadyLike) {
      commentToSave.reactions = commentToSave.reactions.filter(
        (reaction) => reaction.userId !== loggedInUser._id
      )
    } else if (!isAlreadyLike) {
      commentToSave.reactions.push({
        userId: loggedInUser._id,
        fullname: loggedInUser.fullname,
        reaction: 'like',
      })
    }
    onSaveComment(commentToSave)
  }

  const onRemoveComment = () => {
    dispatch(removeComment(comment))
  }

  const addReply = () => {
    if (replyField.txt === '' || !replyField.txt) return
    const commentToSave = { ...comment }
    setIsShowReplyList(true)
    const newRpely = {
      _id: utilService.makeId(24),
      userId: loggedInUser._id,
      postId: postId,
      commentId: comment._id,
      txt: replyField.txt,
      reactions: [],
      createdAt: new Date().getTime(),
    }
    commentToSave.replies.unshift(newRpely)
    onSaveComment(commentToSave)
    setReplyField({
      txt: '',
    })
  }

  const updateReply = (replyToUpdate) => {
    const commentToSave = { ...comment }
    const idx = commentToSave.replies.findIndex(
      (reply) => reply._id === replyToUpdate._id
    )
    commentToSave.replies[idx] = replyToUpdate
    onSaveComment(commentToSave)
  }

  const handleChange = async ({ target }) => {
    const field = target.name
    let value = target.type === 'number' ? +target.value || '' : target.value
    setReplyField({ [field]: value })
  }

  useEffect(() => {
    loadUserComment(userId)
  }, [])

  if (!userComment) return

  const isLogedInUserLikeComment = comment?.reactions.some((reaction) => {
    return loggedInUser._id === reaction.userId
  })

  const likeBtnStyle = isLogedInUserLikeComment ? 'liked' : ''

  const { profession, imgUrl } = userComment

  const inputRef = (elInput) => {
    if (elInput && isFirstFocus) elInput.focus()
    setIsFirstFocus(false)
  }

  if (!comment) return <div>Loading</div>

  return (
    <section className="comment-preview">
      <div
        className="img-container"
        onClick={() => history.push(`/main/profile/${userComment?._id}`)}
      >
        <img src={imgUrl} alt="" className="img-profile" />
      </div>
      <div className="container">
        <div className="comment-header">
          <div className="comment-details">
            <div className="name">
              <h3>{userComment.fullname}</h3>
              <p>{profession}</p>
            </div>
            <div>
              <span>
                <TimeAgo date={createdAt} />
              </span>
              <FontAwesomeIcon
                onClick={toggleMenu}
                className="dots-icon"
                icon="fa-solid fa-ellipsis"
              />
            </div>
          </div>
          <div className="comment-text">
            <p>{comment.txt}</p>
          </div>
        </div>
        <div className="comment-action">
          <span>{reactions?.length || ''}</span>
          <button className={'like ' + likeBtnStyle} onClick={onLikeComment}>
            Like
          </button>
          |
          <button onClick={() => setIsShowinputComment((prev) => !prev)}>
            Reply
          </button>
          |
          {comment.replies?.length ? (
            <button onClick={() => setIsShowReplyList((prev) => !prev)}>
              {isShowreplyList && isShowreplyList
                ? `Hide ${comment.replies?.length} replies`
                : `Show ${comment.replies?.length} replies`}
            </button>
          ) : (
            ''
          )}
        </div>

        {isShowinputComment && (
          <div className="input-reply">
            <div className="img-loggedUser">
              <img src={loggedInUser.imgUrl} alt="" className="img" />
            </div>
            <div className="input-container">
              <input
                ref={inputRef}
                type="text"
                placeholder="Add a reply..."
                onChange={handleChange}
                id="txt"
                name="txt"
                value={replyField.txt}
              />
            </div>
          </div>
        )}

        {replyField.txt && (
          <button className="reply-btn" onClick={() => addReply()}>
            Reply
          </button>
        )}

        {isShowreplyList && (
          <ReplyList replies={replies} updateReply={updateReply} />
        )}

        {isShowMenu && (
          <CommentMenu
            toggleMenu={toggleMenu}
            onRemoveComment={onRemoveComment}
            commentUserId={comment.userId}
          />
        )}
      </div>
    </section>
  )
}
