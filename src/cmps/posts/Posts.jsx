import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddPost } from './AddPost'
import { PostsList } from './PostsList'
import { SortBy } from './SortBy'
import {
  loadPosts,
  addFilterByPosts,
  getPostsLength,
} from '../../store/actions/postActions'

export const Posts = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadPosts())
    dispatch(getPostsLength())
  }, [])

  const onSetSort = (value) => {
    const filterBy = {
      sort: +value,
    }
    console.log(filterBy)
    dispatch(addFilterByPosts(filterBy))
    dispatch(loadPosts())
    dispatch(getPostsLength())
  }

  // console.log('render Posts')
  return (
    <section className="posts">
      <AddPost />
      <SortBy onSetSort={onSetSort} />
      <PostsList />
    </section>
  )
}
