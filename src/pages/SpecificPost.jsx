import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { PostPreview } from '../cmps/posts/post-preview/PostPreview'
import {
  getPostsLength,
  loadPosts,
  setCurrPage,
  setFilterByPosts,
} from '../store/actions/postActions'

const SpecificPost = (props) => {
  const dispatch = useDispatch()
  const params = useParams()
  const { posts } = useSelector((state) => state.postModule)

  useEffect(() => {
    dispatch(setCurrPage(null))
    const filterBy = {
      _id: params.postId,
    }
    dispatch(setFilterByPosts(filterBy))
    dispatch(loadPosts())
    dispatch(getPostsLength())

    return () => {
      dispatch(setFilterByPosts(null))
    }
  }, [dispatch, params.postId])

  if (!posts) return <div className="specific-post">Loading...</div>
  return (
    <section className="specific-post">
      {posts.map((post) => (
        <PostPreview key={post._id} post={post} />
      ))}
    </section>
  )
}

export default SpecificPost
