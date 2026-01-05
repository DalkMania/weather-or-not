import * as React from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { HeartIcon, SearchIcon } from 'lucide-react'
import { ClientOnly } from '@tanstack/react-router'
import type { Location } from '@/types'
import { cn } from '@/utils/utils'
import { useSettings } from '@/hooks/useLocalStorage'

type LocationInputProps = React.ComponentProps<
  typeof CommandPrimitive.Input
> & {
  selectedLocation?: Location
}

export const LocationInput = ({
  className,
  selectedLocation,
  ...props
}: LocationInputProps) => {
  const { getFavorites, addFavorite, removeFavorite } = useSettings()
  const favorites = getFavorites() ?? []

  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-16 items-center gap-2 border-b px-3"
    >
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          'placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
      <ClientOnly
        fallback={
          <HeartIcon className="size-4 shrink-0 opacity-50 hover:cursor-pointer" />
        }
      >
        {favorites.length > 0 &&
        favorites.some((item) => item.id === selectedLocation?.id) ? (
          <HeartIcon
            fill="#FFFFFF"
            className="size-4 shrink-0 opacity-50 hover:cursor-pointer"
            onClick={() => removeFavorite(selectedLocation!)}
          />
        ) : (
          <HeartIcon
            className="size-4 shrink-0 opacity-50 hover:cursor-pointer"
            onClick={() => addFavorite(selectedLocation!)}
          />
        )}
      </ClientOnly>
    </div>
  )
}
