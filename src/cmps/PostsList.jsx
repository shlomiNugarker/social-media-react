import { PostPreview } from './PostPreview'

export const PostsList = ({ posts }) => {
  if (!posts) return <div>Loading...</div>
  return (
    <section className="posts-list">
      {posts.map((post) =>
        post.posts.map((innerPost) => (
          <PostPreview
            key={post._id}
            post={innerPost}
            fullname={post.fullname}
          />
        ))
      )}
    </section>
  )
}
