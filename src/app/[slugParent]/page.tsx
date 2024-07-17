import { getPageByUri } from '@/lib/pages'
import React from 'react'

export default async function Page({
  params,
}: {
  params: { slugParent: string; slugChild: string }
}) {
  console.log({ params })

  const { slugParent, slugChild } = params

  // We can use the URI to look up our page and subsequently its ID, so
  // we can first contruct our URI from the page params

  let pageUri = `/${slugParent}/`

  // We only want to apply deeper paths to the URI if we actually have
  // existing children

  if (Array.isArray(slugChild) && slugChild.length > 0) {
    pageUri = `${pageUri}${slugChild.join('/')}/`
  }

  const { page } = await getPageByUri(pageUri)
  // console.log({ page })

  return (
    <>
      <div> slugParent: {params.slugParent}</div>
      <div
        dangerouslySetInnerHTML={{
          __html: page?.content,
        }}
      />
    </>
  )
}
