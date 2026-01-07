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

export const SelectDropdown = () => {
  const { getSettings, updateUnit } = useSettings()
  const settings = getSettings()

  const handleUnitChange = (unit: string) => {
    updateUnit(unit)
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
        </DropdownMenuContent>
      </ClientOnly>
    </DropdownMenu>
  )
}
