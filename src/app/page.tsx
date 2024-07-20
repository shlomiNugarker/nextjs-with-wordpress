import Link from 'next/link'
import SeoMeta from '@/layouts/partials/SeoMeta'
import ThemeSwitcher from '@/layouts/components/ThemeSwitcher'

export default async function Home() {
  return (
    <>
      <SeoMeta />
      <ThemeSwitcher className="mr-4 md:mr-6" />
    </>
  )
}
