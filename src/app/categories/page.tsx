import Link from 'next/link'
import { getAllCategories, categoryPathBySlug } from '../../lib/categories'

export default async function Categories() {
  const { categories } = await getAllCategories()
  // console.log({ categories })

  return (
    <main className="">
      Hello Categories:
      <br />
      <section>
        <ul>
          {categories.map((category: { slug: string; name: any }) => {
            return (
              <li key={category.slug}>
                <Link href={categoryPathBySlug(category.slug)}>
                  {category.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}
