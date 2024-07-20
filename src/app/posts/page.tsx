import { getAllPosts } from '@/lib/posts'

export default async function Posts() {
  const posts = await getAllPosts()

  return (
    <div>
      <h1>All Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h5>{post.title}</h5>
            {/* <div dangerouslySetInnerHTML={{ __html: post.content }} /> */}
          </li>
        ))}
      </ul>
    </div>
  )
}
