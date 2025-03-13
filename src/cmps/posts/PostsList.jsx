import { PostPreview } from './post-preview/PostPreview'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import loadingGif from '../../assets/imgs/loading-gif.gif'
import { useParams } from 'react-router-dom'
import {
  addPosts,
  addFilterByPosts,
  setNextPage,
} from '../../store/actions/postActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const PostsList = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { posts } = useSelector((state) => state.postModule)
  const { pageNumber } = useSelector((state) => state.postModule)
  const { isPostsLoading } = useSelector((state) => state.postModule)
  const { postsLength } = useSelector((state) => state.postModule)

  const onLoadNextPage = () => {
    const filterBy = {
      pageNumber,
    }
    if (params.userId) filterBy.userId = params.userId
    if (!postsLength && !posts) return
    if (postsLength === posts?.length) return
    dispatch(addFilterByPosts(filterBy))
    dispatch(addPosts())
    dispatch(setNextPage())
  }

  const handleScroll = () => {
    if (posts?.length >= postsLength) return
    if (
      window.scrollY + window.innerHeight + 0.9 >=
      document.documentElement.scrollHeight
    ) {
      onLoadNextPage()
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [postsLength])

  if (!posts)
    return (
      <div className="posts-list">
        <span className="gif-container">
          <img className="loading-gif" src={loadingGif} alt="" />
        </span>
      </div>
    )

  return (
    <section className="posts-list">
      {posts.map((post,idx) => (
        <PostPreview key={post._id+idx} post={post} />
      ))}
      <div onClick={onLoadNextPage} className="load-more">
        {!isPostsLoading && posts?.length < postsLength && (
          <p className="load-btn">
            <span>
              <FontAwesomeIcon icon="fa-solid fa-caret-down" />
            </span>
          </p>
        )}
        {isPostsLoading && posts?.length < postsLength && (
          <span className="gif-container">
            <img className="loading-gif" src={loadingGif} alt="" />
          </span>
        )}
        {posts?.length === postsLength &&  <p >No more posts</p>}
      </div>
    </section>
  )
}
