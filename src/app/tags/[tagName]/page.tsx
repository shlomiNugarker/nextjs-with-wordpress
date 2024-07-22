import { getPostsByTagName } from '@/lib/posts'
import Link from 'next/link'

export default async function Tag({ params }: { params: { tagName: string } }) {
  const posts = await getPostsByTagName(params.tagName)
  console.log(posts)

  // console.log(posts)

  return (
    <div>
      <h1>All Posts by Tag name: {params.tagName}</h1>
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
