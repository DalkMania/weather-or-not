import { useSettings } from './useLocalStorage'
import type { Location } from '@/types'
import { useWeatherData } from '@/queries/useWeatherData'
import { formatPrecipitation } from '@/utils/formatting'

export const usePrecipitation = (location: Location) => {
  const { preferences } = useSettings()
  const { data: weather } = useWeatherData({
    latitude: location.latitude,
    longitude: location.longitude,
    units: preferences?.settings.units || 'imperial',
  })

  const rain = weather?.current.rain ?? 0
  const showers = weather?.current.showers ?? 0
  const snowfall = weather?.current.snowfall ?? 0

  // Total liquid precipitation (rain + showers)
  const totalLiquid = rain + showers

  // Format values
  const formattedRain = formatPrecipitation(
    preferences?.settings.units || 'imperial',
    totalLiquid,
  )
  const formattedSnow = formatPrecipitation(
    preferences?.settings.units || 'imperial',
    snowfall,
  )

  // Determine primary precipitation type
  const hasRain = totalLiquid > 0
  const hasSnow = snowfall > 0
  const hasPrecipitation = hasRain || hasSnow

  // Description - optimized with early returns
  const getDescription = (): string => {
    if (!hasPrecipitation) return 'No precipitation'
    if (hasRain && hasSnow) return 'Mixed precipitation'
    if (hasRain) return totalLiquid < 0.1 ? 'Light rain' : 'Rain'
    return snowfall < 0.1 ? 'Light snow' : 'Snow'
  }

  return {
    rain,
    showers,
    snowfall,
    totalLiquid,
    formattedRain,
    formattedSnow,
    hasRain,
    hasSnow,
    hasPrecipitation,
    description: getDescription(),
  }
}
