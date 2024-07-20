import React from 'react'
import ThemeSwitcher from '../components/ThemeSwitcher'

export const Header = async () => {
  return (
    <header>
      <ThemeSwitcher />

      <nav>
        <ul></ul>
      </nav>
    </header>
  )
}
