import { PostPreview } from './PostPreview'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useRef, useMemo, useState } from 'react'
import { utilService } from '../services/utilService'

export const PostsList = ({ posts }) => {
  // const { posts } = useSelector((state) => state.postModule)

  if (!posts) return <div>Loading posts...</div>

  console.log('render PostsList')
  return (
    <section className="posts-list">
      {posts.map((post) => (
        <PostPreview key={utilService.makeId()} post={post} />
      ))}
    </section>
  )
}
