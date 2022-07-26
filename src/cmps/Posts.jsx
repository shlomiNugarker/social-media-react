import { AddPost } from './AddPost'
import { PostsList } from './PostsList'
import { SortBy } from './SortBy'

export const Posts = () => {
  return (
    <section className="posts">
      <AddPost />
      <SortBy />
      <PostsList />
    </section>
  )
}
