import { PostPreview } from './PostPreview'

export const PostsList = ({ posts }) => {
  if (!posts) return <div>Loading posts...</div>
  console.log(posts)
  return (
    <section className="posts-list">
      {posts.map((post) => (
        <PostPreview key={post._id} post={post} userId={post.userId} />
      ))}
    </section>
  )
}
