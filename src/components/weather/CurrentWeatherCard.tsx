import { useCurrentConditions } from '@/hooks/useCurrentConditions'
import { Location } from '@/types'
import { Card } from '../ui/card'
import { formatTemperature } from '@/utils/formatting'
import Icon from '../icons/Icon'
import { useLastUpdated } from '@/hooks/useLastUpdated'
import { useTime } from '@/hooks/useTime'
import { DateTime } from 'luxon'

type WeatherCardBlockProps = {
  location: Location
}

export const CurrentWeatherCard = ({ location }: WeatherCardBlockProps) => {
  const conditions = useCurrentConditions(location)
  const { relative, absolute } = useLastUpdated(location)
  const now = DateTime.local({ zone: location.timezone })
  const currentTime = useTime(now)

  if (!conditions) {
    return null
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
    <Card className="flex items-center col-start-1 col-end-4 row-start-1 row-end-2">
      <h2 className="uppercase font-sans text-muted-foreground font-normal">
        <span className="block text-center">{locationDisplay}</span>
        <span className="block text-center">
          {currentTime && `Local Time: ${currentTime.toFormat('tt')}`}
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
