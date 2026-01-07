import { useRef } from 'react'
import { ClientOnly, Link } from '@tanstack/react-router'
import { SelectDropdown } from '../weather/SelectDropdown'
import { Container } from '@/components/layout/Container'
import { useSticky } from '@/hooks/useSticky'
import { WeatherOrNotLogoMark } from '@/components/icons/WeatherOrNotLogoMark'
import { Button } from '../ui/button'
import { SettingsIcon } from 'lucide-react'

export const Header = () => {
  const headerRef = useRef(null)
  const { isSticky } = useSticky(headerRef, 0)
  const defaultClasses = 'py-4 border-transparent'
  const stickyClasses = 'py-3'

  return (
    <header
      id="masthead"
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 ${
        !isSticky ? defaultClasses : stickyClasses
      }`}
      role="banner"
      ref={headerRef}
    >
      <Container>
        <nav
          className="header-navigation flex items-center justify-between"
          role="navigation"
        >
          <Link to="/" className="flex gap-1">
            <WeatherOrNotLogoMark />
            <h1 className="text-3xl font-bold leading-16 pt-1">
              Weather or Not ?
            </h1>
          </Link>
          <ClientOnly
            fallback={
              <Button variant="outline">
                <SettingsIcon /> Settings
              </Button>
            }
          >
            <SelectDropdown />
          </ClientOnly>
        </nav>
      </Container>
    </header>
  )
}
