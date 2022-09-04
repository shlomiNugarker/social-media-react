import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PostPreview } from '../cmps/posts/post-preview/PostPreview'
import {
  getPostsLength,
  loadPosts,
  setCurrPage,
  setFilterByPosts,
} from '../store/actions/postActions'

export const SpecificPost = (props) => {
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
    // eslint-disable-next-line
  }, [])

  // console.log('render SpecificPost')
  if (!posts) return <div className="specific-post">Loading...</div>
  return (
    <section className="specific-post">
      {posts.map((post) => (
        <PostPreview key={post._id} post={post} />
      ))}
    </section>
  )
}
