import { getAllPostsSlugs } from '@/lib/posts'
import Link from 'next/link'

export default async function Posts() {
  const posts = await getAllPostsSlugs()

  return (
    <div>
      <h1>All Posts</h1>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
