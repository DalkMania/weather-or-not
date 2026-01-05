import { useQuery } from '@tanstack/react-query'
import type { Location, LocationQueryParams } from '@/types'

export const useGeoCode = ({ city, count = 10 }: LocationQueryParams) =>
  useQuery({
    queryKey: ['location', city],
    queryFn: () => geoCodeCity(city, count),
    enabled: Boolean(city.length > 1),
    refetchOnWindowFocus: false,
  })

const geoCodeCity = async (city: string, count: number) => {
  try {
    const response = await fetch('/api/get-geo-code', {
      method: 'POST',
      body: JSON.stringify({ city, count }),
    })

    const data = await response.json()
    return data as Array<Location>
  } catch (error: any) {
    console.error('Error fetching data:', error)
  }

  return null
}
