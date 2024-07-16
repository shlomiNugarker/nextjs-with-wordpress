import { getPaginatedPosts } from '../../lib/posts'

export default async function Posts() {
  const { posts, pagination } = await getPaginatedPosts({
    queryIncludes: 'archive',
  })
  const basePath = '/posts'
  // console.log(posts, pagination)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello posts
    </main>
  )
}
