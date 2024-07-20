import { getPostBySlug } from '@/lib/posts'
import Link from 'next/link'

export default async function Post({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const post = await getPostBySlug(params.slug)

  if (!post) return <div>cant get a post</div>
  return (
    <div>
      <h1>{post.title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: post.content,
        }}
      />
    </div>
  )
}
