import { useCloudCover } from '@/hooks/useCloudCover'
import { Progress } from '../ui/progress'
import { WeatherCard } from './WeatherCard'
import { WeatherCardBlockProps } from '@/types'

export const WeatherCloudCover = ({ location }: WeatherCardBlockProps) => {
  if (!location) {
    return null
  }

  const clouds = useCloudCover(location)

  if (!clouds) {
    return null
  }

  return (
    <WeatherCard
      title="Cloud Cover"
      icon="cloudy"
      iconAlt="Cloud Coverage"
      className="row-start-2 row-end-3 col-start-3 col-end-4"
    >
      <h4 className="text-3xl">{clouds.cloudCover}%</h4>
      <div className="px-4 w-full">
        <Progress
          value={clouds.cloudCover}
          aria-label={`Cloud cover: ${clouds.cloudCover}%`}
        />
      </div>

      <p className="text-sm text-muted-foreground mt-auto">
        {clouds.description}
      </p>
    </WeatherCard>
  )
}
