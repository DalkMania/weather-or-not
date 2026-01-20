import { WeatherCard } from './WeatherCard'
import type { WeatherCardBlockProps } from '@/types'
import { usePrecipitation } from '@/hooks/usePrecipitation'

export const WeatherPrecipitation = ({ location }: WeatherCardBlockProps) => {
  const {
    formattedRain,
    formattedSnow,
    hasRain,
    hasSnow,
    hasPrecipitation,
    description,
  } = usePrecipitation(location)

  return (
    <WeatherCard
      title="Precipitation"
      icon="raindrops"
      iconAlt="Precipitation"
      className="row-start-3 row-end-4 col-start-1 col-end-2 md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-3"
    >
      {hasPrecipitation ? (
        <>
          {hasRain && (
            <>
              <h3 className="text-3xl">{formattedRain}</h3>
              <p className="text-sm text-muted-foreground mt-auto">Rain</p>
            </>
          )}
          {hasSnow && (
            <>
              <h3 className="text-3xl">{formattedSnow}</h3>
              <p className="text-sm text-muted-foreground mt-auto">Snow</p>
            </>
          )}
        </>
      ) : (
        <>
          <h3 className="text-3xl">None</h3>
          <p className="text-sm text-muted-foreground mt-auto">{description}</p>
        </>
      )}
    </WeatherCard>
  )
}
