import { getPageByUri } from '@/lib/pages'
import React from 'react'

export default async function Page({
  params,
}: {
  params: { parentSlug: string; childSlug: string }
}) {
  const page = await getPageByUri(`/${params.parentSlug}/${params.childSlug}`)

  if (!page) return <p>Can&apos;t get page</p>
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: page.content,
      }}
    ></div>
  )
}
