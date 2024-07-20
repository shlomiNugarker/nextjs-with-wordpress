import React from 'react'

export default async function Page({
  params,
}: {
  params: { slugParent: string; slugChild: string }
}) {
  console.log({ params })

  return <></>
}
