import {
  createCollection,
  localStorageCollectionOptions,
} from '@tanstack/react-db'
import { z } from 'zod'

const LocationSchema = z.object({
  id: z.number(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string(),
  admin1: z.optional(z.string()),
  country: z.string(),
  display: z.string(),
})

const SettingsSchema = z.object({
  id: z.string(),
  settings: z.object({
    units: z.enum(['metric', 'imperial']),
    theme: z.enum(['light', 'dark', 'system']),
  }),
  favorites: z.array(LocationSchema),
})

export type Settings = z.infer<typeof SettingsSchema>
export type Favorite = z.infer<typeof LocationSchema>

export const settingsCollection = createCollection(
  localStorageCollectionOptions({
    id: 'user-settings',
    storageKey: 'user-weather-settings',
    getKey: (item) => item.id,
    schema: SettingsSchema,
  }),
)
