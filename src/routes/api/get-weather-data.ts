import { fetchWeatherApi } from 'openmeteo'
import { API_WEATHER } from '@/constants'

import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { OpenMeteoResponse } from '@/types'

export const Route = createFileRoute('/api/get-weather-data')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { latitude, longitude, units } = await request.json()
        try {
          const params = {
            latitude,
            longitude,
            current: [
              'temperature_2m',
              'relative_humidity_2m',
              'apparent_temperature',
              'precipitation',
              'weather_code',
              'wind_speed_10m',
              'wind_direction_10m',
              'wind_gusts_10m',
              'uv_index',
              'visibility',
              'pressure_msl',
              'dew_point_2m',
              'cloud_cover',
              'rain',
              'showers',
              'snowfall',
              'snow_depth',
            ],
            hourly: [
              'temperature_2m',
              'apparent_temperature',
              'precipitation_probability',
              'weather_code',
              'wind_speed_10m',
            ],
            daily: [
              'weather_code',
              'temperature_2m_max',
              'temperature_2m_min',
              'apparent_temperature_max',
              'apparent_temperature_min',
              'precipitation_probability_max',
              'sunrise',
              'sunset',
              'uv_index_max',
            ],
            temperature_unit: units === 'metric' ? 'celsius' : 'fahrenheit',
            wind_speed_unit: units === 'metric' ? 'kmh' : 'mph',
            precipitation_unit: units === 'metric' ? 'mm' : 'inch',
            timezone: 'auto',
            forecast_days: 10,
          }

          const responses = await fetchWeatherApi(API_WEATHER, params)

          // Fetch sunrise/sunset separately using JSON API (SDK doesn't support it)
          const sunriseSunsetParams = new URLSearchParams({
            latitude: latitude.toString(),
            longitude: longitude.toString(),
            daily: 'sunrise,sunset',
            timezone: 'auto',
            forecast_days: '10',
          })
          const sunriseSunsetResponse = await fetch(
            `${API_WEATHER}?${sunriseSunsetParams}`,
          )
          const sunriseSunsetData = await sunriseSunsetResponse.json()

          if (!responses || responses.length === 0) {
            throw new Error('No response from Open-Meteo API')
          }

          const response = responses[0]

          // Get timezone and location info
          const utcOffsetSeconds = response.utcOffsetSeconds()
          const timezone = response.timezone()
          const current = response.current()
          const hourly = response.hourly()
          const daily = response.daily()

          if (!current || !hourly || !daily) {
            throw new Error('Missing required data sections in API response')
          }

          const data: OpenMeteoResponse = {
            latitude: response.latitude(),
            longitude: response.longitude(),
            timezone: timezone || 'UTC',
            current: {
              time: new Date(
                (Number(current.time()) + utcOffsetSeconds) * 1000,
              ).toISOString(),
              temperature_2m: current.variables(0)?.value() ?? 0,
              relative_humidity_2m: current.variables(1)?.value() ?? 0,
              apparent_temperature: current.variables(2)?.value() ?? 0,
              precipitation: current.variables(3)?.value() ?? 0,
              weather_code: current.variables(4)?.value() ?? 0,
              wind_speed_10m: current.variables(5)?.value() ?? 0,
              wind_direction_10m: current.variables(6)?.value() ?? 0,
              wind_gusts_10m: current.variables(7)?.value() ?? 0,
              uv_index: current.variables(8)?.value() ?? 0,
              visibility: current.variables(9)?.value() ?? 0,
              pressure_msl: current.variables(10)?.value() ?? 0,
              dew_point_2m: current.variables(11)?.value() ?? 0,
              cloud_cover: current.variables(12)?.value() ?? 0,
              rain: current.variables(13)?.value() ?? 0,
              showers: current.variables(14)?.value() ?? 0,
              snowfall: current.variables(15)?.value() ?? 0,
              snow_depth: current.variables(16)?.value() ?? 0,
            },
            hourly: {
              time: range(
                Number(hourly.time()),
                Number(hourly.timeEnd()),
                hourly.interval(),
              ).map((t) =>
                new Date((t + utcOffsetSeconds) * 1000).toISOString(),
              ),
              temperature_2m: Array.from(
                hourly.variables(0)?.valuesArray() ?? [],
              ),
              apparent_temperature: Array.from(
                hourly.variables(1)?.valuesArray() ?? [],
              ),
              precipitation_probability: Array.from(
                hourly.variables(2)?.valuesArray() ?? [],
              ),
              weather_code: Array.from(
                hourly.variables(3)?.valuesArray() ?? [],
              ),
              wind_speed_10m: Array.from(
                hourly.variables(4)?.valuesArray() ?? [],
              ),
            },
            daily: {
              time: range(
                Number(daily.time()),
                Number(daily.timeEnd()),
                daily.interval(),
              ).map(
                (t) =>
                  new Date((t + utcOffsetSeconds) * 1000)
                    .toISOString()
                    .split('T')[0],
              ),
              weather_code: Array.from(daily.variables(0)?.valuesArray() ?? []),
              temperature_2m_max: Array.from(
                daily.variables(1)?.valuesArray() ?? [],
              ),
              temperature_2m_min: Array.from(
                daily.variables(2)?.valuesArray() ?? [],
              ),
              apparent_temperature_max: Array.from(
                daily.variables(3)?.valuesArray() ?? [],
              ),
              apparent_temperature_min: Array.from(
                daily.variables(4)?.valuesArray() ?? [],
              ),
              precipitation_probability_max: Array.from(
                daily.variables(5)?.valuesArray() ?? [],
              ),

              sunrise:
                sunriseSunsetData?.daily?.sunrise?.map((time: string) => {
                  // API returns ISO strings like "2025-10-26T07:28"
                  // Add seconds and Z to make them full ISO strings
                  return `${time}:00.000Z`
                }) ?? [],
              sunset:
                sunriseSunsetData?.daily?.sunset?.map((time: string) => {
                  // API returns ISO strings like "2025-10-26T17:40"
                  // Add seconds and Z to make them full ISO strings
                  return `${time}:00.000Z`
                }) ?? [],
              uv_index_max: Array.from(daily.variables(8)?.valuesArray() ?? []),
            },
          }

          return new Response(JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json',
            },
          })
        } catch (error) {
          console.error(error)
          return json({ error: 'WeatherData not found' }, { status: 404 })
        }
      },
    },
  },
})

export function range(start: number, stop: number, step: number): number[] {
  return Array.from(
    { length: (stop - start) / step },
    (_, i) => start + i * step,
  )
}
