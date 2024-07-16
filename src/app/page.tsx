import Link from 'next/link'
import { getPaginatedPosts, postPathBySlug } from '../lib/posts'
import SeoMeta from '@/layouts/partials/SeoMeta'
import ThemeSwitcher from '@/layouts/components/ThemeSwitcher'

export default async function Home() {
  const { posts, pagination } = await getPaginatedPosts({
    // queryIncludes: 'archive',
    queryIncludes: 'all',
  })
  const basePath = '/posts'

  // console.log(posts, pagination)

  // console.log({ slugs: posts.map((post) => post.slug) })

  return (
    <>
      <SeoMeta />
      <ThemeSwitcher className="mr-4 md:mr-6" />
      <main className="">
        Hello nextjs,
        {posts.map((post) => (
          <Link key={post.title} href={postPathBySlug(post.slug)} rel="post">
            <div>{post.title}</div>
          </Link>
        ))}
        fetched
      </main>
    </>
  )
}
