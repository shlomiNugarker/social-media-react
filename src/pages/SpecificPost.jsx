import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  loadPosts,
  setCurrPage,
  setFilterByPosts,
} from '../store/actions/postActions'
import { useParams } from 'react-router-dom'
import { PostPreview } from '../cmps/posts/post-preview/PostPreview'

export const SpecificPost = (props) => {
  const { loggedInUser } = useSelector((state) => state.userModule)
  const dispatch = useDispatch()
  const params = useParams()
  const { posts } = useSelector((state) => state.postModule)
  //   const [post, setPost] = useState(null)

  useEffect(() => {
    console.log(params.userId)
    console.log(params.postId)
    dispatch(setCurrPage(null))
    const filterBy = {
      _id: params.postId,
    }
    dispatch(setFilterByPosts(filterBy))
    dispatch(loadPosts())

    // eslint-disable-next-line
    return () => {
      dispatch(setFilterByPosts(null))
    }
  }, [])

  console.log('render SpecificPost')
  if (!posts) return <div className="specific-post">Loading...</div>
  return (
    <section className="specific-post">
      {posts.map((post) => (
        <PostPreview key={post._id} post={post} />
      ))}
    </section>
  )
}
