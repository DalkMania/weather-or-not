import { Progress } from '../ui/progress'
import { WeatherCard } from './WeatherCard'
import type { WeatherCardBlockProps } from '@/types'
import { useCloudCover } from '@/hooks/useCloudCover'

export const WeatherCloudCover = ({ location }: WeatherCardBlockProps) => {
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
