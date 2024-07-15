import { getCategoryBySlug } from '@/lib/categories'
import { getPostsByCategoryId, postPathBySlug } from '@/lib/posts'
import Link from 'next/link'

export default async function Category({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const { category } = await getCategoryBySlug(params.slug)

  const { posts } = await getPostsByCategoryId({
    categoryId: (category as any).databaseId,
    queryIncludes: 'all',
  })

  console.log({ posts, category })

  return (
    <main className="">
      Hello a category slug <br />
      {posts &&
        (posts as any[]).map((post) => (
          <Link key={post.title} href={postPathBySlug(post.slug)}>
            {post.title}
          </Link>
        ))}
    </main>
  )
}
