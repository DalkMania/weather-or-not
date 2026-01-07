import { useQuery } from '@tanstack/react-query'
import type { OpenMeteoResponse, WeatherQueryParams } from '@/types'

export const useWeatherData = ({
  latitude,
  longitude,
  units,
}: WeatherQueryParams) =>
  useQuery({
    queryKey: ['weather', latitude, longitude, units],
    enabled: Boolean(latitude && longitude && units),
    refetchInterval: 1000 * 60 * 5,
    queryFn: async () => {
      try {
        const response = await fetch('/api/get-weather-data', {
          method: 'POST',
          body: JSON.stringify({ latitude, longitude, units }),
        })

        const data = await response.json()
        return data as OpenMeteoResponse
      } catch (error: any) {
        console.error('Error fetching data:', error)
      }
    },
  })
