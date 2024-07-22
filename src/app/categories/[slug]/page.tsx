import { getCategoryBySlug } from '@/lib/categories'
import { getPostsByCategoryId } from '@/lib/posts'
import Link from 'next/link'

export default async function Category({
  params,
}: {
  params: { slug: string }
}) {
  const category = await getCategoryBySlug(params?.slug)
  const postsByCategory = category
    ? await getPostsByCategoryId(category.databaseId)
    : null

  return (
    <main className="">
      {postsByCategory &&
        postsByCategory.map((post) => (
          <Link key={post.title} href={'/posts/' + post.slug}>
            {post.title}
          </Link>
        ))}
    </main>
  )
}
