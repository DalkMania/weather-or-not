import { createFileRoute } from '@tanstack/react-router'
import type { Location, OpenMeteoGeocodeResponse } from '@/types'
import { API_GEO } from '@/constants'

export const Route = createFileRoute('/api/get-geo-code')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { city, count = 10 } = await request.json()
        const searchTerm = city.split(',')[0]
        const url = `${API_GEO}?name=${searchTerm}&count=${count}`
        try {
          const response = await fetch(url)
          if (!response.ok) {
            throw new Error(response.statusText)
          }

          const json: OpenMeteoGeocodeResponse = await response.json()

          // Transform to our Location type
          const data: Array<Location> = json.results.map((result) => ({
            id: result.id,
            name: result.name,
            latitude: result.latitude,
            longitude: result.longitude,
            timezone: result.timezone,
            admin1: result.admin1,
            country: result.country,
            display: [result.name, result.admin1, result.country]
              .filter(Boolean)
              .join(', '),
          }))

          return new Response(JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json',
            },
          })
        } catch (error) {
          console.error(error)
          return Response.json({ error: 'Location not found' }, { status: 404 })
        }
      },
    },
  },
})
