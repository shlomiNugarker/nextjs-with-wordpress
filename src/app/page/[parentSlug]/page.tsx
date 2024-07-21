import { getPageByUri } from '@/lib/pages'
import React from 'react'

export default async function Page({
  params,
}: {
  params: { parentSlug: string }
}) {
  const page = await getPageByUri(params.parentSlug)

  if (!page) return <p>Can&apos;t get page</p>
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: page.content,
        }}
      />
    </>
  )
}
