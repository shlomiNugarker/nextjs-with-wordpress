import Link from 'next/link'

export default async function Post({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  return (
    <main className="">
      Hello a post
      {/* <div>
        <section>
          {post?.title} <br />
          <Link href={authorPathByName(author.name)} rel="author">
            {author.name}
          </Link>
        </section>
        <div
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />{' '}
      </div> */}
    </main>
  )
}
