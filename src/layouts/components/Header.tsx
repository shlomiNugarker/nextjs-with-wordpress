'use client'

import React, { useState } from 'react'
import ThemeSwitcher from './ThemeSwitcher'
import Link from 'next/link'

export const Header = ({
  pages,
}: {
  pages: {
    uri: string
    title: string
    hasParent: boolean
    children: {
      slug: string
      uri: string
      id: string
      title: string
      __typename: 'Page'
    }[]
  }[]
}) => {
  const [hoveredPage, setHoveredPage] = useState<string>('')

  const handleMouseEnter = (uri: string) => {
    setHoveredPage(uri)
  }

  const handleMouseLeave = (uri: string) => {
    setHoveredPage(uri)
  }

  return (
    <>
      <header className=" ">
        <nav className="container mx-auto p-4 flex justify-between items-center">
          <Link href={'/'} className="text-2xl font-bold">
            My Website
          </Link>
          <ThemeSwitcher />
          <ul className="flex space-x-4">
            {pages.map(
              (page) =>
                !page.hasParent && (
                  <li
                    key={page.uri}
                    onMouseEnter={() => handleMouseEnter(page.uri)}
                    className="relative"
                  >
                    <Link href={'/page/' + page.uri} className="">
                      {page.title}
                    </Link>
                    {hoveredPage === page.uri && page.children.length > 0 && (
                      <div
                        className="absolute left-0 mt-2 w-48  shadow-lg p-2"
                        onMouseEnter={() => handleMouseEnter(page.uri)}
                      >
                        <ul>
                          {page.children.map((child) => (
                            <li key={child.id}>
                              <Link
                                onMouseLeave={() => handleMouseLeave(child.uri)}
                                href={'/page/' + child.uri}
                                className="block px-4 py-2"
                              >
                                {child.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                )
            )}
          </ul>
        </nav>
      </header>
    </>
  )
}
