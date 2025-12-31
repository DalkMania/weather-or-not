import { Location, LocationQueryParams } from '@/types'
import { useQuery } from '@tanstack/react-query'

export const useGeoCode = ({ city, count = 10 }: LocationQueryParams) =>
  useQuery({
    queryKey: ['location', city],
    queryFn: () => geoCodeCity(city, count),
    enabled: Boolean(city.length > 1),
    refetchOnWindowFocus: false,
  })

const geoCodeCity = async (city: string, count: number) => {
  try {
    const response = await fetch('http://localhost:3000/api/get-geo-code', {
      method: 'POST',
      body: JSON.stringify({ city, count }),
    })

    const data = await response.json()
    return data as Location[]
  } catch (error: any) {
    console.error('Error fetching data:', error)
  }

  return null
}
