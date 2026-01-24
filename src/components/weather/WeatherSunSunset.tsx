import { DateTime } from 'luxon'
import { WeatherCard } from './WeatherCard'
import type { WeatherCardBlockProps } from '@/types'
import { useSunriseSunset } from '@/hooks/useSunriseSunset'
import { formatRelativeFromMs, formatRelativeToMs } from '@/utils/formatting'
import { Skeleton } from '../ui/skeleton'

export const WeatherSunSunset = ({ location }: WeatherCardBlockProps) => {
  const { sunrise, sunset, sunPosition, timeZone, sunriseISO, sunsetISO } =
    useSunriseSunset(location)
  const sunIcon = sunPosition > 50 ? 'sunset' : 'sunrise'
  const timeString = calculateTimeString(
    sunPosition,
    timeZone!,
    sunriseISO!,
    sunsetISO!,
  )

  if (!sunrise || !sunset || !timeZone || !sunriseISO || !sunsetISO) {
    return (
      <Skeleton className="row-start-7 row-end-8 md:row-start-4 md:row-end-5 lg:row-start-3 lg:row-end-4" />
    )
  }

  return (
    <WeatherCard
      title={sunPosition > 50 ? `Sunset` : `Sunrise`}
      icon={sunIcon}
      iconAlt={sunPosition > 50 ? 'sunset' : 'sunrise'}
      className="row-start-7 row-end-8 md:row-start-4 md:row-end-5 lg:row-start-3 lg:row-end-4"
    >
      <h3 className="text-3xl text-center first-letter:uppercase">
        {timeString}
      </h3>

      <div className="flex justify-between w-full mt-auto px-4">
        <div className="flex flex-col items-center">
          <h4 className="text-base">Sunrise</h4>
          <p className="text-sm text-muted-foreground">{sunrise}</p>
        </div>

        <div className="flex flex-col items-center">
          <h4 className="text-base">Sunset</h4>
          <p className="text-sm text-muted-foreground ">{sunset}</p>
        </div>
      </div>
    </WeatherCard>
  )
}

const calculateTimeString = (
  sunPosition: number,
  timeZone: string,
  sunriseISO: string,
  sunsetISO: string,
) => {
  const now = DateTime.local().setZone(timeZone)
  const sunrise = DateTime.fromISO(sunriseISO)
    .setZone('utc')
    .setZone(timeZone, { keepLocalTime: true })
  const sunset = DateTime.fromISO(sunsetISO)
    .setZone('utc')
    .setZone(timeZone, { keepLocalTime: true })

  // before sunrise
  if (sunPosition === 0) {
    if (now.toMillis() > sunrise.toMillis()) {
      return formatRelativeFromMs(now.diff(sunrise).toMillis())
    }

    return formatRelativeToMs(sunrise.diff(now).toMillis())
  }

  // after sunset
  if (sunPosition === 100) {
    if (now.toMillis() > sunset.toMillis()) {
      return formatRelativeFromMs(now.diff(sunset).toMillis())
    }

    return formatRelativeToMs(sunset.diff(now).toMillis())
  }

  // sunrise
  if (sunPosition > 0 && sunPosition < 50) {
    if (now.toMillis() > sunrise.toMillis()) {
      return formatRelativeFromMs(now.diff(sunrise).toMillis())
    }

    return formatRelativeToMs(sunrise.diff(now).toMillis())
  }

  // sunset
  if (sunPosition >= 50 && sunPosition < 100) {
    if (now.toMillis() > sunset.toMillis()) {
      return formatRelativeFromMs(now.diff(sunset).toMillis())
    }

    return formatRelativeToMs(sunset.diff(now).toMillis())
  }
}
