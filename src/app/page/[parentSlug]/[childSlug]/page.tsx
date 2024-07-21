import { getPageByUri } from '@/lib/pages'
import React from 'react'

export default async function Page({
  params,
}: {
  params: { slugPage: string }
}) {
  console.log(params)
  // await getPageByUri(params.slugPage)
  return <></>
}
