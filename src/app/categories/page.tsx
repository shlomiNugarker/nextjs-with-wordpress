import { getAllCategories } from '@/lib/categories'
import Link from 'next/link'

export default async function Categories() {
  const categories = await getAllCategories()
  return (
    <main className="">
      Hello Categories:
      <br />
      <section>
        <ul>
          {categories?.map((category: { slug: string; name: any }) => {
            return (
              <li key={category.slug}>
                <Link href={'categories/' + category.slug}>
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
