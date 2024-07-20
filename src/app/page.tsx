import SeoMeta from '@/layouts/partials/SeoMeta'
import { getAllUsers } from '@/lib/users'

export default async function Home() {
  getAllUsers()
  return (
    <>
      <SeoMeta />
    </>
  )
}
