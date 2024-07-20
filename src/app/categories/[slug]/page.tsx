export default async function Category({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  return (
    <main className="">
      Hello a category slug <br />
      {/* {posts &&
        (posts as any[]).map((post) => (
          <Link key={post.title} href={postPathBySlug(post.slug)}>
            {post.title}
          </Link>
        ))} */}
    </main>
  )
}
