import { useEffect, useId, useState } from 'react'
import { Globe } from 'lucide-react'
import { ClientOnly } from '@tanstack/react-router'
import { LocationInput } from '../LocationInput'
import type { SetStateAction } from 'react'
import type { Location } from '@/types'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { defaultSuggestions } from '@/utils/default-suggestions'
import { useGeoCode } from '@/queries/useGeoCode'
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
  const [results, setResults] = useState<Array<Location>>([])
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
        placeholder="Search Location ..."
        onValueChange={handleValueChange}
        value={value}
        className="h-16"
        selectedLocation={selectedLocation}
        setValue={handleValueChange}
      />

      <CommandList>
        <ClientOnly>
          {results.length === 0 && !selectedLocation && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          {favorites.length === 0 ? (
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
          {results.length > 0 && value !== selectedLocation?.display && (
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
