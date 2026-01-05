import { WeatherForecast } from './WeatherForecast'
import { WeatherMoonPhase } from './WeatherMoonPhase'
import { WeatherSunSunset } from './WeatherSunSunset'
import type { Location } from '@/types'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { CurrentWeatherCard } from '@/components/weather/CurrentWeatherCard'
import { WeatherFeelsLike } from '@/components/weather/WeatherFeelsLike'
import { WeatherPrecipitation } from '@/components/weather/WeatherPrecipitation'
import { WeatherCloudCover } from '@/components/weather/WeatherCloudCover'
import { WeatherWind } from '@/components/weather/WeatherWind'
import { HourlyForecastCard } from '@/components/weather/HourlyForecastCard'

type WeatherDashboardProps = {
  location: Location | undefined
}

export const WeatherDashboard = ({ location }: WeatherDashboardProps) => {
  if (!location) {
    return null
  }

  return (
    <Section>
      <Container className="grid grid-cols-4 grid-rows-[auto] gap-8">
        <CurrentWeatherCard location={location} />
        <WeatherFeelsLike location={location} />
        <WeatherPrecipitation location={location} />
        <WeatherCloudCover location={location} />
        <WeatherWind location={location} />
        <WeatherMoonPhase />
        <WeatherSunSunset location={location} />
        <HourlyForecastCard location={location} />
        <WeatherForecast location={location} />
      </Container>
    </Section>
  )
}
