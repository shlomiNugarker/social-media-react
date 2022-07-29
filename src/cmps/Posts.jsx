//hooks
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//cmps
import { AddPost } from './AddPost'
import { PostsList } from './PostsList'
import { SortBy } from './SortBy'
//actions
import { loadPosts } from '../store/actions/postActions'

export const Posts = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('use effect')
    dispatch(loadPosts())
    // eslint-disable-next-line
  }, [])

  return (
    <section className="posts">
      <AddPost />
      <SortBy />
      <PostsList />
    </section>
  )
}
