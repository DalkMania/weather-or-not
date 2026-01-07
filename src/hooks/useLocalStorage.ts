import { eq, useLiveQuery } from '@tanstack/react-db'
import type { Favorite } from '@/db-collections'
import { settingsCollection } from '@/db-collections'

type UnitType = 'imperial' | 'metric'

export const useLocalStorage = () => {
  const { data: preferences, isReady } = useLiveQuery((q) =>
    q
      .from({ settings: settingsCollection })
      .where(({ settings }) => eq(settings.id, 'user-settings'))
      .findOne(),
  )

  if (!preferences && isReady) {
    // Set defaults
    settingsCollection.insert({
      id: 'user-settings',
      settings: {
        units: 'imperial',
        theme: 'system',
      },
      favorites: [],
    })
  }

  return {
    preferences,
    settingsCollection,
  }
}

export const useSettings = () => {
  const { preferences, settingsCollection: setCollection } = useLocalStorage()

  /* const updateSettings = (updatedSettings: Partial<Settings>) => {
    setCollection.update('user-settings', (draft) => {
      draft.settings = { ...draft.settings, ...updatedSettings }
    })
  } */

  const updateUnit = (unit: string) => {
    setCollection.update('user-settings', (draft) => {
      draft.settings.units = unit as UnitType
    })
  }

  const getSettings = () => {
    return preferences?.settings
  }

  const getFavorites = () => {
    return preferences?.favorites
  }

  const addFavorite = (favorite: Favorite) => {
    setCollection.update('user-settings', (draft) => {
      draft.favorites = [...draft.favorites, favorite]
    })
  }
  const removeFavorite = (favorite: Favorite) => {
    setCollection.update('user-settings', (draft) => {
      draft.favorites = [
        ...draft.favorites.filter((obj) => obj.id !== favorite.id),
      ]
    })
  }

  const clearFavorites = () => {
    setCollection.update('user-settings', (draft) => {
      draft.favorites = []
    })
  }

  return {
    preferences,
    getSettings,
    updateUnit,
    getFavorites,
    addFavorite,
    removeFavorite,
    clearFavorites,
  }
}
