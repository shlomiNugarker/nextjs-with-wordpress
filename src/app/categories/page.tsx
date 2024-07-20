import Link from 'next/link'

export default async function Categories() {
  return (
    <main className="">
      Hello Categories:
      <br />
      <section>
        <ul>
          {/* {categories.map((category: { slug: string; name: any }) => {
            return (
              <li key={category.slug}>
                <Link href={categoryPathBySlug(category.slug)}>
                  {category.name}
                </Link>
              </li>
            )
          })} */}
        </ul>
      </section>
    </main>
  )
}
