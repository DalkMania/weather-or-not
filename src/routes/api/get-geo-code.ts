import { API_GEO } from '@/constants'

import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { Location, OpenMeteoGeocodeResponse } from '@/types'

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

          if (json.results && json.results.length > 0) {
            // Transform to our Location type
            const data: Location[] = json.results.map((result) => ({
              id: result.id,
              name: result.name,
              latitude: result.latitude,
              longitude: result.longitude,
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
          }
        } catch (error) {
          console.error(error)
          return json({ error: 'Location not found' }, { status: 404 })
        }
      },
    },
  },
})
