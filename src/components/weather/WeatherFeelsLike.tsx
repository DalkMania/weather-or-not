import { Card } from '../ui/card'
import Icon from '../icons/Icon'
import type { Location } from '@/types'
import { useFeelsLike } from '@/hooks/useFeelsLike'
import { formatTemperature } from '@/utils/formatting'
import { Skeleton } from '../ui/skeleton'

type WeatherCardBlockProps = {
  location: Location
}

const getThermometerIcon = (feels: number, actual: number) => {
  const diff = feels - actual
  const absDiff = Math.abs(diff)

  if (absDiff < 2) return 'thermometer'
  return diff > 0 ? `thermometer-warmer` : `thermometer-colder`
}

export const WeatherFeelsLike = ({ location }: WeatherCardBlockProps) => {
  const { feelsLike, actual, unit, description } = useFeelsLike(location)
  const icon = getThermometerIcon(feelsLike, actual)

  if (!feelsLike || !actual) {
    return <Skeleton className="row-start-2 row-end-3 col-start-1 col-end-2" />
  }

  return (
    <Card className="row-start-2 row-end-3 col-start-1 col-end-2 flex flex-col items-center">
      <h2 className="uppercase font-sans text-muted-foreground font-normal">
        Feels Like
      </h2>
      <Icon icon={icon} alt="feels like" />
      <h3 className="text-3xl">{formatTemperature(unit, feelsLike)}</h3>
      <p className="text-sm text-muted-foreground mt-auto">{description}</p>
    </Card>
  )
}
