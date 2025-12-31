import { useWeatherData } from '@/queries/useWeatherData'
import { Location } from '@/types'
import { useSettings } from './useLocalStorage'
import { calculateSunPosition } from '@/utils/calculations'
import { formatTimeWithMinutes } from '@/utils/formatting'

export const useSunriseSunset = (location: Location) => {
  const { preferences } = useSettings()
  const { data: weather } = useWeatherData({
    latitude: location.latitude,
    longitude: location.longitude,
    units: preferences?.settings.units || 'imperial',
  })

  const sunriseISO = weather?.daily?.sunrise?.[0]
  const sunsetISO = weather?.daily?.sunset?.[0]
  const now = weather?.current?.time

  const sunrise = sunriseISO ? formatTimeWithMinutes(sunriseISO) : '--:--'
  const sunset = sunsetISO ? formatTimeWithMinutes(sunsetISO) : '--:--'
  const sunPosition = calculateSunPosition(now, sunriseISO, sunsetISO)

  return {
    sunrise,
    sunset,
    sunPosition,
    timeZone: weather?.timezone,
    lastUpdated: weather?.current?.time,
    sunriseISO,
    sunsetISO,
  }
}
