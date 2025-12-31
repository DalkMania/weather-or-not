import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SettingsIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ClientOnly } from '@tanstack/react-router'

export const SelectDropdown = () => {
  const [temperature, setTemperature] = useState('celsius')
  const [windSpeed, setWindSpeed] = useState('kmh')
  const [precipitation, setPrecipitation] = useState('mm')
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
            value={temperature}
            onValueChange={setTemperature}
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
            value={windSpeed}
            onValueChange={setWindSpeed}
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
            value={precipitation}
            onValueChange={setPrecipitation}
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
