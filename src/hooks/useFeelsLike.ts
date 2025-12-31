import { useWeatherData } from '@/queries/useWeatherData'
import { Location } from '@/types'
import { getFeelsLikeDescription } from '@/utils/conditions'
import { useSettings } from './useLocalStorage'

/**
 * Hook to get processed feels like (apparent temperature) data for display.
 *
 * Handles data fetching and comparison description.
 * Returns ready-to-display feels like information.
 */
export const useFeelsLike = (location: Location) => {
  const { preferences } = useSettings()
  const { data: weather } = useWeatherData({
    latitude: location.latitude,
    longitude: location.longitude,
    units: preferences?.settings.units || 'imperial',
  })

  const feelsLike = weather?.current?.apparent_temperature || 0
  const actual = weather?.current?.temperature_2m || 0
  const description = getFeelsLikeDescription(feelsLike, actual)

  return {
    unit: preferences?.settings.units || 'imperial',
    feelsLike,
    actual,
    description,
  }
}
