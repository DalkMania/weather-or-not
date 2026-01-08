import { Progress } from '../ui/progress'
import { WeatherCard } from './WeatherCard'
import type { WeatherCardBlockProps } from '@/types'
import { useCloudCover } from '@/hooks/useCloudCover'
import { Skeleton } from '../ui/skeleton'

export const WeatherCloudCover = ({ location }: WeatherCardBlockProps) => {
  const clouds = useCloudCover(location)

  if (!clouds) {
    return (
      <Skeleton className="row-start-4 row-end-5 md:row-start-3 md:row-end-4 col-start-1 col-end-2 lg:row-start-2 lg:row-end-3 lg:col-start-3 lg:col-end-4" />
    )
  }

  return (
    <WeatherCard
      title="Cloud Cover"
      icon="cloudy"
      iconAlt="Cloud Coverage"
      className="row-start-4 row-end-5 md:row-start-3 md:row-end-4 col-start-1 col-end-2 lg:row-start-2 lg:row-end-3 lg:col-start-3 lg:col-end-4"
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
