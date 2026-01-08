import Icon from '../icons/Icon'
import type { WeatherCardBlockProps } from '@/types'
import { useForecast } from '@/hooks/useForecast'
import { formatDay, formatTemperature } from '@/utils/formatting'
import { getWeatherInfo } from '@/utils/conditions'
import { Skeleton } from '../ui/skeleton'

export const WeatherForecast = ({ location }: WeatherCardBlockProps) => {
  const forecastData = useForecast(location)

  if (!forecastData) {
    return (
      <Skeleton className="flex flex-col bg-card text-card-foreground gap-6 rounded-xl border px-4 py-6 shadow-sm w-full col-span-full row-start-9 md:row-start-6 lg:row-start-5 xl:row-start-4" />
    )
  }

  const { weather, dailyForecasts, tempUnit, tempScale } = forecastData

  return (
    <div className="flex flex-col bg-card text-card-foreground gap-6 rounded-xl border px-4 py-6 shadow-sm w-full col-span-full row-start-9 md:row-start-6 lg:row-start-5 xl:row-start-4">
      <h2 className="uppercase font-sans text-muted-foreground font-normal">
        10 Day Forecast
      </h2>
      {dailyForecasts.map((forecast, index) => {
        const noonTime = `${forecast.date}T12:00:00`
        const sunrise = weather.daily.sunrise[index]
        const sunset = weather.daily.sunset[index]

        const { icon } = getWeatherInfo(
          forecast.weather_code,
          noonTime,
          sunrise,
          sunset,
        )

        // Calculate percentage positions for temp range
        const minPercent =
          ((forecast.temp_min - tempScale.min) / tempScale.range) * 100
        const maxPercent =
          ((forecast.temp_max - tempScale.min) / tempScale.range) * 100
        const barWidth = maxPercent - minPercent

        // Calculate current temp indicator position (only for today)
        let currentTempPercent: number | undefined
        if (forecast.temp_current !== undefined) {
          currentTempPercent =
            ((forecast.temp_current - tempScale.min) / tempScale.range) * 100
        }

        return (
          <div
            key={forecast.date}
            className="flex w-full border-b-2 items-center justify-between last:border-none h-16 pb-4 last:pb-0"
          >
            <div className="flex gap-x-8 items-center">
              <h2 className="uppercase font-sans text-muted-foreground font-normal w-14">
                {formatDay(forecast.date, weather.current.time)}
              </h2>

              <Icon icon={icon} size={64} />

              <h4 className="text-xl">
                {formatTemperature(tempUnit, forecast.temp_min)}
              </h4>
            </div>

            <div className="flex-1 h-1 rounded-[2px] bg-transparent min-w-20 relative overflow-visible">
              <div
                className="block h-1 rounded-[2px] bg-linear-to-r from-[#4fc3f7] via-[#fdd835] to-[#ff5722]"
                style={{
                  marginLeft: `${minPercent}%`,
                  width: `${barWidth}%`,
                }}
              />
              {currentTempPercent !== undefined && (
                <div
                  className="absolute top-[50%] h-3 w-3 bg-white rounded-full translate-x-[-50%] translate-y-[-50%] pointer-events-none"
                  style={{
                    left: `${currentTempPercent}%`,
                  }}
                />
              )}
            </div>

            <h4 className="text-xl">
              {formatTemperature(tempUnit, forecast.temp_max)}
            </h4>
          </div>
        )
      })}
    </div>
  )
}
