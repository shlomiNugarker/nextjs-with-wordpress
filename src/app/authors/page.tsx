import { getAllUsers } from '@/lib/users'
import Link from 'next/link'

export default async function Category() {
  const users = await getAllUsers()

  return (
    <>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            <Link href={`/authors/${user.slug}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
