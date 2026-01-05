import { useSettings } from './useLocalStorage'
import type { Location } from '@/types'
import { useWeatherData } from '@/queries/useWeatherData'
import { getCloudCoverDescription } from '@/utils/conditions'

export const useCloudCover = (location: Location) => {
  const { preferences } = useSettings()
  const { data: weather } = useWeatherData({
    latitude: location.latitude,
    longitude: location.longitude,
    units: preferences?.settings.units || 'imperial',
  })

  if (!weather?.current) {
    return null
  }

  const cloudCover = Math.round(weather.current.cloud_cover || 0)
  const description = getCloudCoverDescription(cloudCover)

  return {
    cloudCover,
    description,
  }
}
