import { PostPreview } from './PostPreview'

export const PostsList = ({ posts }) => {
  console.log(posts)

  if (!posts) return <div>Loading posts...</div>
  return (
    <section className="posts-list">
      {posts.map((post) => (
        <PostPreview
          key={post._id}
          post={post}
          fullname={post.fullname}
          userId={post.userId}
        />
      ))}
    </section>
  )
}
