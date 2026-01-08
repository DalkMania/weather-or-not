import { SettingsIcon } from 'lucide-react'
import { ClientOnly } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSettings } from '@/hooks/useLocalStorage'
import { useState, useEffect } from 'react'
import { UserTheme, useTheme } from '../providers/ThemeProvider'

export const SelectDropdown = () => {
  const { getSettings, updateUnit, updateTheme } = useSettings()
  const { setTheme } = useTheme()
  const settings = getSettings()
  const [notCurrentUnit, setNotCurrentUnit] = useState(settings?.units)

  useEffect(() => {
    if (settings?.units === 'imperial') {
      setNotCurrentUnit('metric')
    } else {
      setNotCurrentUnit('imperial')
    }
  }, [settings?.units])

  const handleUnitChange = (unit: string) => {
    updateUnit(unit)
  }

  const handleThemeChange = (theme: string) => {
    setTheme(theme as UserTheme)
    updateTheme(theme)
  }

  if (!settings) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <SettingsIcon /> Settings
        </Button>
      </DropdownMenuTrigger>
      <ClientOnly>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel
            onClick={() =>
              handleUnitChange(
                settings?.units === 'metric' ? 'imperial' : 'metric',
              )
            }
          >
            Switch to{' '}
            <span className="first-letter:uppercase inline-block hover:cursor-pointer">
              {notCurrentUnit}
            </span>{' '}
            Units
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Temperature</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={settings?.units === 'metric' ? 'celsius' : 'fahrenheit'}
            onValueChange={() =>
              handleUnitChange(
                settings?.units === 'metric' ? 'imperial' : 'metric',
              )
            }
          >
            <DropdownMenuRadioItem value="celsius">
              Celsius (°C)
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="fahrenheit">
              Fahrenheit (°F)
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Wind Speed</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={settings?.units === 'metric' ? 'kmh' : 'mph'}
            onValueChange={() =>
              handleUnitChange(
                settings?.units === 'metric' ? 'imperial' : 'metric',
              )
            }
          >
            <DropdownMenuRadioItem value="kmh">
              Kilomenters per Hour
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="mph">
              Miles per Hour
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Precipitation</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={settings?.units === 'metric' ? 'mm' : 'in'}
            onValueChange={() =>
              handleUnitChange(
                settings?.units === 'metric' ? 'imperial' : 'metric',
              )
            }
          >
            <DropdownMenuRadioItem value="mm">
              Millimeters (mm)
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="in">
              Inches (in)
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Toggle theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={settings?.theme}
            onValueChange={(value) => handleThemeChange(value)}
          >
            <DropdownMenuRadioItem value="light">
              Light Theme
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">
              Dark Theme
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system">
              System Theme
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </ClientOnly>
    </DropdownMenu>
  )
}
