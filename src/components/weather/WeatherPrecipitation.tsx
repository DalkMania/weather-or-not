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
      className="row-start-2 row-end-3 col-start-2 col-end-3"
    >
      {hasPrecipitation ? (
        <>
          {hasRain && (
            <>
              <h4 className="text-3xl">{formattedRain}</h4>
              <p className="text-sm text-muted-foreground mt-auto">Rain</p>
            </>
          )}
          {hasSnow && (
            <>
              <h4 className="text-3xl">{formattedSnow}</h4>
              <p className="text-sm text-muted-foreground mt-auto">Snow</p>
            </>
          )}
        </>
      ) : (
        <>
          <h4 className="text-3xl">None</h4>
          <p className="text-sm text-muted-foreground mt-auto">{description}</p>
        </>
      )}
    </WeatherCard>
  )
}
