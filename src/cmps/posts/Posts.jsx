import { useEffect } from 'react'
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

  const { posts } = useSelector((state) => state.postModule)

  useEffect(() => {
    dispatch(loadPosts())
    dispatch(getPostsLength())
  }, [dispatch])

  const onSetSort = (value) => {
    const filterBy = {
      sort: +value,
    }
    dispatch(addFilterByPosts(filterBy))
    dispatch(loadPosts())
    dispatch(getPostsLength())
  }

  // console.log('render Posts')
  return (
    <section className="posts">
      <AddPost />
      <SortBy onSetSort={onSetSort} />
      {posts && <PostsList />}
    </section>
  )
}
