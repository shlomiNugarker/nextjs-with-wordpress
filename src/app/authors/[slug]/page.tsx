export default async function Category({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  return <main className="">Hello a author slug:</main>
}
