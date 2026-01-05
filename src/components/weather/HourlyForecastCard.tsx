import { Card } from '../ui/card'
import { ScrollArea } from '../ui/scroll-area'
import Icon from '../icons/Icon'
import type { WeatherCardBlockProps } from '@/types'
import { useForecast } from '@/hooks/useForecast'
import { formatTemperature, formatTime } from '@/utils/formatting'
import { getWeatherInfo } from '@/utils/conditions'

export const HourlyForecastCard = ({ location }: WeatherCardBlockProps) => {
  const forecastData = useForecast(location)

  if (!forecastData) {
    return null
  }

  const { weather, hourlyForecasts, tempUnit } = forecastData

  return (
    <Card className="flex flex-col items-center col-start-4 col-end-5 row-start-1 row-end-4">
      <h2 className="uppercase font-sans text-muted-foreground font-normal">
        Hourly Forecast
      </h2>
      <ScrollArea className="w-full flex-1 rounded-xl max-h-300">
        {hourlyForecasts.map((forecast) => {
          const sunrise = weather.daily.sunrise[0]
          const sunset = weather.daily.sunset[0]
          const { description, icon } = getWeatherInfo(
            forecast.weather_code,
            forecast.time,
            sunrise,
            sunset,
          )
          return (
            <Card
              key={forecast.time}
              className="flex flex-col items-center w-full border-0 border-b py-4 gap-1 rounded-none last:border-none last:pt-4 last:pb-0"
            >
              <h2 className="uppercase font-sans text-muted-foreground font-normal">
                {formatTime(forecast.time)}
              </h2>

              <Icon icon={icon} size={64} />

              <h4 className="text-xl">
                {formatTemperature(tempUnit, forecast.temp)}
              </h4>
              <p className="text-sm text-muted-foreground mt-auto">
                {description}
              </p>
            </Card>
          )
        })}
      </ScrollArea>
    </Card>
  )
}
