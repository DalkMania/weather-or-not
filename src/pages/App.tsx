import { useState } from 'react'
import { Location } from '@/types'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { SearchInput } from '@/components/weather/SearchInput'
import { WeatherDashboard } from '@/components/weather/WeatherDashboard'
import { ClientOnly } from '@tanstack/react-router'
import { LoadingSkeleton } from '@/components/LoadingSkeleton'

export const App = () => {
  const [selectedLocation, setSelectedLocation] = useState<
    Location | undefined
  >(undefined)

  return (
    <>
      <Section className="pt-16 pb-4">
        <Container>
          <h1 className="text-center text-5xl">How's the sky looking today?</h1>
        </Container>
      </Section>
      <Section>
        <Container>
          <ClientOnly fallback={<LoadingSkeleton />}>
            <SearchInput
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </ClientOnly>
        </Container>
      </Section>
      <WeatherDashboard location={selectedLocation} />
    </>
  )
}
