'use client'

import config from '../../config/config.json'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const ThemeSwitcher = () => {
  const { theme_switcher } = config.settings
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  useEffect(() => setMounted(true), [])

  return (
    <>
      {theme_switcher && (
        <span>
          <input
            id="theme-switcher"
            type="checkbox"
            defaultChecked={
              mounted && (theme === 'dark' || resolvedTheme === 'dark')
            }
            onClick={() =>
              setTheme(
                theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark'
              )
            }
          />
          <br />
        </span>
      )}
    </>
  )
}

export default ThemeSwitcher
