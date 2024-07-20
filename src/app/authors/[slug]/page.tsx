import { getPostsByAuthorSlug } from '@/lib/posts'
import { getAuthorByNameSlug } from '@/lib/users'
import Link from 'next/link'

export default async function Category({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const user = await getAuthorByNameSlug(params.slug)
  const posts = user ? await getPostsByAuthorSlug(user.slug) : null

  return (
    <>
      <h1>All Posts by: {user?.name}</h1>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
