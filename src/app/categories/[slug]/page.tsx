import { getCategoryBySlug } from '@/lib/categories'
import { getPostsByCategoryId } from '@/lib/posts'

export default async function Category({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const { category } = await getCategoryBySlug(params?.slug)

  const { posts } = await getPostsByCategoryId({
    categoryId: (category as any).databaseId,
    queryIncludes: 'archive',
  })

  // console.log({ posts, category })

  return <main className="">Hello a category slug</main>
}
