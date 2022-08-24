import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddPost } from './AddPost'
import { PostsList } from './PostsList'
import { SortBy } from './SortBy'
import { loadPosts, setFilterByPosts } from '../../store/actions/postActions'

export const Posts = () => {
  const dispatch = useDispatch()

  const { filterBy } = useSelector((state) => state.postModule)
  // dispatch(setFilterByPosts(filterBy))

  useEffect(() => {
    dispatch(loadPosts())
  }, [])

  // console.log('render Posts')
  return (
    <section className="posts">
      <AddPost />
      <SortBy />
      <PostsList />
    </section>
  )
}
