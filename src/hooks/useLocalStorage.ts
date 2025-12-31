import { useLiveQuery, eq } from '@tanstack/react-db'
import { Favorite, Settings, settingsCollection } from '@/db-collections'

const useLocalStorage = () => {
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
  const { preferences, settingsCollection } = useLocalStorage()

  const updateSettings = (updatedSettings: Partial<Settings>) => {
    settingsCollection.update('user-settings', (draft) => {
      draft.settings = { ...draft.settings, ...updatedSettings }
    })
  }

  const getFavorites = () => {
    return preferences?.favorites
  }

  const addFavorite = (favorite: Favorite) => {
    settingsCollection.update('user-settings', (draft) => {
      draft.favorites = [...draft.favorites, favorite]
    })
  }
  const removeFavorite = (favorite: Favorite) => {
    settingsCollection.update('user-settings', (draft) => {
      draft.favorites = [
        ...draft.favorites.filter((obj) => obj.id !== favorite.id),
      ]
    })
  }

  const clearFavorites = () => {
    settingsCollection.update('user-settings', (draft) => {
      draft.favorites = []
    })
  }

  return {
    preferences,
    updateSettings,
    getFavorites,
    addFavorite,
    removeFavorite,
    clearFavorites,
  }
}
