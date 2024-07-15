import { getPostBySlug, getRelatedPosts } from '@/lib/posts'
import { authorPathByName } from '@/lib/users'
import Link from 'next/link'

export default async function Post({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const { post } = await getPostBySlug(params?.slug)

  const {
    categories,
    databaseId: postId,
    title,
    excerpt,
    slug,
    date,
    author,
    isSticky = false,
  } = post as any

  const { category: relatedCategory, posts: relatedPosts } =
    await getRelatedPosts(categories, postId)

  const hasRelated =
    relatedCategory && Array.isArray(relatedPosts) && relatedPosts.length

  // console.log({ post, categories, postId, relatedCategory, relatedPosts })

  return (
    <main className="">
      Hello a post
      <div>
        <section>
          {post?.title} <br />
          <Link href={authorPathByName(author.name)} rel="author">
            {author.name}
          </Link>
        </section>
      </div>
    </main>
  )
}
