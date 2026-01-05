import { useSettings } from './useLocalStorage'
import type { Location } from '@/types'
import { useWeatherData } from '@/queries/useWeatherData'
import { generateForecastStatement } from '@/utils/calculations'
import { getWeatherInfo } from '@/utils/conditions'

export const useCurrentConditions = (location: Location) => {
  const { preferences } = useSettings()
  const { data: weather } = useWeatherData({
    latitude: location.latitude,
    longitude: location.longitude,
    units: preferences?.settings.units || 'imperial',
  })

  if (!weather?.current) {
    return null
  }

  const {
    current: { weather_code, temperature_2m, apparent_temperature, time },
    daily: { sunrise, sunset },
  } = weather

  // Get current conditions with day/night icon
  const { description, icon } = getWeatherInfo(
    weather_code,
    time,
    sunrise[0],
    sunset[0],
  )

  // Generate forecast statement
  const forecastStatement = generateForecastStatement(weather)

  // Should show "Feels Like" if apparent temp is significantly higher
  const showFeelsLike = apparent_temperature > temperature_2m

  return {
    locationDisplay: location.display,
    tempUnit: preferences?.settings.units || 'imperial',
    temperature: temperature_2m,
    apparentTemperature: apparent_temperature,
    forecastStatement,
    showFeelsLike,
    description,
    icon,
  }
}
