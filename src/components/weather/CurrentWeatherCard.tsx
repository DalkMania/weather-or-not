import { Card } from '../ui/card'
import Icon from '../icons/Icon'
import type { Location } from '@/types'
import { useCurrentConditions } from '@/hooks/useCurrentConditions'
import { formatTemperature } from '@/utils/formatting'
import { useLastUpdated } from '@/hooks/useLastUpdated'
import { useTime } from '@/hooks/useTime'
import { Skeleton } from '../ui/skeleton'

type WeatherCardBlockProps = {
  location: Location
}

export const CurrentWeatherCard = ({ location }: WeatherCardBlockProps) => {
  const conditions = useCurrentConditions(location)
  const { relative, absolute } = useLastUpdated(location)
  const currentTime = useTime(location.timezone)

  if (!conditions) {
    return (
      <Skeleton className="flex h-116.25 rounded-lg w-full col-start-1 col-end-2 md:col-end-3 lg:col-end-4 row-start-1 row-end-2" />
    )
  }

  const {
    locationDisplay,
    tempUnit,
    temperature,
    apparentTemperature,
    description,
    icon,
    forecastStatement,
    showFeelsLike,
  } = conditions

  return (
    <Card className="flex items-center col-start-1 col-end-2 md:col-end-3 lg:col-end-4 row-start-1 row-end-2">
      <h2 className="uppercase font-sans text-muted-foreground font-normal">
        <span className="block text-center">{locationDisplay}</span>
        <span className="block text-center">
          {`Local Time: ${currentTime.toFormat('tt')}`}
        </span>
      </h2>
      <div className="flex gap-4 items-center">
        <Icon icon={icon} alt="" />
        <p className="text-4xl font-bold">{description}</p>
      </div>

      <h3 className="text-7xl font-bold">
        {formatTemperature(tempUnit, temperature)}
      </h3>
      {showFeelsLike && (
        <p>Feels Like: {formatTemperature(tempUnit, apparentTemperature)}</p>
      )}
      <p>{forecastStatement}</p>
      {(relative || absolute) && (
        <p className="text-sm text-muted-foreground">
          Last updated {relative ?? absolute}
        </p>
      )}
    </Card>
  )
}
