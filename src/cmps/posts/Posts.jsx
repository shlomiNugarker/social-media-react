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
import loadongGif from '../../assets/imgs/loading-gif.gif'

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

  if (!posts)
    return (
      <section className="posts">
        <img
          src={loadongGif}
          alt=""
          style={{
            position: 'relative',
            left: ' 50%',
            transform: ' translate(-50%)',
          }}
        />
      </section>
    )

  return (
    <section className="posts">
      <AddPost />
      <SortBy onSetSort={onSetSort} />
      {posts && <PostsList />}
    </section>
  )
}
