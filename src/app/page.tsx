import { getPaginatedPosts } from './lib/posts'

export default async function Home() {
  const { posts, pagination } = await getPaginatedPosts({
    queryIncludes: 'archive',
  })

  console.log(posts, pagination)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello WordPress + Nextjs
    </main>
  )
}
