import { getPostsByAuthorSlug } from '@/lib/posts'
import { getUserByNameSlug } from '@/lib/users'
import Link from 'next/link'

export default async function Category({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const { user } = await getUserByNameSlug(params?.slug)
  const { posts } = await getPostsByAuthorSlug({
    slug: user?.slug,
    queryIncludes: 'archive',
  })

  // console.log({ user, posts })

  return <main className="">Hello a author slug</main>
}
