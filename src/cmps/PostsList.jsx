import { PostPreview } from './PostPreview'

export const PostsList = ({ posts }) => {
  if (!posts) return <div>Loading...</div>
  console.log(posts)

  return (
    <section className="posts-list">
      {posts.map((post) => (
        <PostPreview key={post._id} post={post} />
      ))}
    </section>
  )
}
