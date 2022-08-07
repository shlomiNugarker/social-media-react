import { PostPreview } from './PostPreview'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useRef, useMemo, useState } from 'react'

export const PostsList = ({}) => {
  const { posts } = useSelector((state) => state.postModule)

  if (!posts) return <div>Loading posts...</div>

  console.log('render PostsList')
  return (
    <section className="posts-list">
      {posts.map((post) => (
        <PostPreview key={post._id} post={post} userId={post.userId} />
      ))}
    </section>
  )
}
