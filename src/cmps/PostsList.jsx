import { PostPreview } from './PostPreview'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useRef, useMemo, useState } from 'react'
import { utilService } from '../services/utilService'
// import _ from 'underscore'
// import { useEffectUpdate } from '../hooks/useEffectUpdate'

export const PostsList = () => {
  // const postsLength = useSelector((state) => state.postModule.posts?.length)
  const posts = useSelector((state) => state.postModule.posts)
  // console.log(postsLength)

  // const postsPreviews = []

  // for (let i = 0; i < postsLength; i++) {
  //   postsPreviews.push(<PostPreview key={utilService.makeId()} idx={i} />)
  // }

  // useEffectUpdate(() => {}, [postsLength])

  if (!posts) return <div>Loading posts...</div>
  console.log('render PostsList')
  return (
    <section className="posts-list">
      {posts.map((post) => (
        <PostPreview key={post._id} post={post} />
        // <PostPreview key={utilService.makeId()} post={post} />
      ))}

      {/* {postsPreviews} */}
    </section>
  )
}
