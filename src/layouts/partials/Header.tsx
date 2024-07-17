import { getAllMenus } from '@/lib/menus'
import React from 'react'

export const Header = async () => {
  const { menus } = await getAllMenus()
  const { menuItems, location } = menus[0]

  return (
    <header>
      <nav>
        <ul>
          {menuItems.map(
            (item: { id: string; path: string; label: string }) => (
              <li key={item.id}>
                <a href={item.path}>{item.label}</a>
              </li>
            )
          )}
        </ul>
      </nav>
    </header>
  )
}
