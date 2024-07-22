import { getAllPostsSlugs } from '@/lib/posts'
import { getAllTags } from '@/lib/tags'
import Link from 'next/link'

export default async function Tags() {
  const tags = await getAllTags()

  return (
    <div>
      <h1>All Tags</h1>
      <ul>
        {tags?.map((tag) => (
          <li key={tag.id}>
            <Link href={`/tags/${tag.name}`}>{tag.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
