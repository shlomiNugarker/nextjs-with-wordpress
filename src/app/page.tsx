import { getPaginatedPosts } from '../lib/posts'

export default async function Home() {
  const { posts, pagination } = await getPaginatedPosts({
    queryIncludes: 'archive',
  })
  const basePath = '/posts'

  // console.log(posts, pagination)

  return <main className="">Hello nextjs, {posts.length} posts fetched</main>
}
