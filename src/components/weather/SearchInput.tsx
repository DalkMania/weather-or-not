import { useId, SetStateAction, useState, useEffect } from 'react'
import { Globe } from 'lucide-react'
import { Location } from '@/types'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { defaultSuggestions } from '@/utils/default-suggestions'
import { useGeoCode } from '@/queries/useGeoCode'
import { ClientOnly } from '@tanstack/react-router'
import { LocationInput } from '../LocationInput'
import { useSettings } from '@/hooks/useLocalStorage'

type SearchProps = {
  selectedLocation?: Location
  setSelectedLocation: (value: SetStateAction<Location | undefined>) => void
}

export const SearchInput = ({
  selectedLocation,
  setSelectedLocation,
}: SearchProps) => {
  const { getFavorites } = useSettings()
  const [value, setValue] = useState('')
  const [results, setResults] = useState<Location[]>([])
  const id = useId()

  const { data } = useGeoCode({ city: value, count: 10 })
  const favorites = getFavorites() ?? []

  useEffect(() => {
    if (data?.length) {
      setResults([...new Set(data)])
    }
  }, [data])

  const handleValueChange = (search: string) => {
    setValue(search)

    if (search.length === 0) {
      setResults([])
    }
  }

  return (
    <Command className="rounded-lg border w-full max-w-4xl space-y-2 mx-auto">
      <LocationInput
        id={id}
        placeholder="Type a command or search..."
        onValueChange={handleValueChange}
        value={value}
        className="h-16"
        selectedLocation={selectedLocation}
      />

      <CommandList>
        <ClientOnly>
          <CommandEmpty>No results found.</CommandEmpty>
          {favorites?.length === 0 ? (
            <CommandGroup heading="Suggestions">
              {defaultSuggestions.map((item) => (
                <CommandItem
                  value={item.display}
                  key={item.id}
                  onSelect={() => {
                    setSelectedLocation(item)
                    setValue(item.display)
                  }}
                  className="flex"
                >
                  <Globe />
                  <span className="flex-1">{`${item.name}, ${item.admin1}, ${item.country}`}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : (
            <CommandGroup heading="Favorites">
              {favorites.map((item) => (
                <CommandItem
                  value={item.display}
                  key={item.id}
                  onSelect={() => {
                    setSelectedLocation(item)
                    setValue(item.display)
                  }}
                  className="flex"
                >
                  <Globe />
                  <span className="flex-1">{`${item.name}, ${item.admin1}, ${item.country}`}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          <CommandSeparator />
          {results.length > 0 && (
            <CommandGroup heading="Search Results">
              {results.map((item) => (
                <CommandItem
                  value={item.display}
                  key={item.id}
                  onSelect={() => {
                    setSelectedLocation(item)
                    setValue(item.display)
                  }}
                >
                  <Globe />
                  <span>{`${item.name}, ${item.admin1}, ${item.country}`}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </ClientOnly>
      </CommandList>
    </Command>
  )
}
