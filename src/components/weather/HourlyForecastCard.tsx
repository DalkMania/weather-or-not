import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import Icon from '../icons/Icon'
import type { WeatherCardBlockProps } from '@/types'
import { useForecast } from '@/hooks/useForecast'
import { formatTemperature, formatTime } from '@/utils/formatting'
import { getWeatherInfo } from '@/utils/conditions'
import { Skeleton } from '../ui/skeleton'

export const HourlyForecastCard = ({ location }: WeatherCardBlockProps) => {
  const forecastData = useForecast(location)

  if (!forecastData) {
    return (
      <Skeleton className="w-full col-span-full xl:items-center xl:col-start-4 xl:col-end-5 xl:row-start-1 xl:row-end-4" />
    )
  }

  const { weather, hourlyForecasts, tempUnit } = forecastData

  return (
    <div className="flex flex-col bg-card text-card-foreground gap-6 rounded-xl border px-4 py-6 shadow-sm w-full col-span-full xl:items-center xl:col-start-4 xl:col-end-5 xl:row-start-1 xl:row-end-4">
      <h2 className="uppercase font-sans text-muted-foreground font-normal">
        Hourly Forecast
      </h2>
      <ScrollArea className="xl:max-h-300 flex-1 w-full">
        <div className="flex w-max xl:flex-col items-center xl:w-full border-b py-4 gap-2 rounded-none last:border-none last:pt-4 last:pb-0">
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
              <div
                key={forecast.time}
                className="flex flex-col gap-4 w-37.5 items-center pb-6"
              >
                <h2 className="uppercase font-sans text-muted-foreground font-normal">
                  {formatTime(forecast.time)}
                </h2>

                <Icon icon={icon} size={64} />

                <h3 className="text-xl">
                  {formatTemperature(tempUnit, forecast.temp)}
                </h3>
                <p className="text-sm text-muted-foreground mt-auto">
                  {description}
                </p>
              </div>
            )
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
