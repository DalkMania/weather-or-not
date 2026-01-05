import { useSettings } from './useLocalStorage'
import type { Location } from '@/types'
import { useWeatherData } from '@/queries/useWeatherData'
import { getWindDirection } from '@/utils/conditions'

export const useWindData = (location: Location) => {
  const { preferences } = useSettings()
  const { data: weather } = useWeatherData({
    latitude: location.latitude,
    longitude: location.longitude,
    units: preferences?.settings.units || 'imperial',
  })

  const windSpeed = Math.round(weather?.current.wind_speed_10m || 0)
  const windGusts = Math.round(weather?.current.wind_gusts_10m || 0)
  const windDirection = weather?.current.wind_direction_10m || 0
  const directionLabel = getWindDirection(windDirection)
  const speedUnit = preferences?.settings.units === 'metric' ? 'km/h' : 'mph'

  return {
    windSpeed,
    windGusts,
    windDirection,
    directionLabel,
    speedUnit,
  }
}
