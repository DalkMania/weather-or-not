import { useFeelsLike } from '@/hooks/useFeelsLike'
import { Location } from '@/types'
import { Card } from '../ui/card'
import { formatTemperature } from '@/utils/formatting'
import Icon from '../icons/Icon'

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
  if (!location) {
    return null
  }

  const { feelsLike, actual, unit, description } = useFeelsLike(location)
  const icon = getThermometerIcon(feelsLike, actual)

  return (
    <Card className="row-start-2 row-end-3 col-start-1 col-end-2 flex flex-col items-center">
      <h2 className="uppercase font-sans text-muted-foreground font-normal">
        Feels Like
      </h2>
      <Icon icon={icon} alt="feels like" />
      <h4 className="text-3xl">{formatTemperature(unit, feelsLike)}</h4>
      <p className="text-sm text-muted-foreground mt-auto">{description}</p>
    </Card>
  )
}
