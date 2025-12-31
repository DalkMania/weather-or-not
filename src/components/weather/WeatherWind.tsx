import { useWindData } from '@/hooks/useWindData'
import { WeatherCard } from './WeatherCard'
import { WeatherCardBlockProps } from '@/types'

export const WeatherWind = ({ location }: WeatherCardBlockProps) => {
  if (!location) {
    return null
  }

  const { windSpeed, windGusts, windDirection, directionLabel, speedUnit } =
    useWindData(location)

  const windIcon = windSpeed < 4 ? 'windsock-weak' : 'windsock'

  return (
    <WeatherCard
      title="Wind"
      icon={windIcon}
      iconAlt="Wind Information"
      className="row-start-3 row-end-4 col-start-1 col-end-2"
    >
      <h4 className="text-3xl">
        {windSpeed} {speedUnit}
      </h4>
      <div className="flex justify-between w-full mt-auto px-4">
        <div className="flex flex-col items-center">
          <h4 className="text-base">Gusts</h4>
          <p className="text-sm text-muted-foreground ">
            {windGusts} {speedUnit}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <h4 className="text-base">Direction</h4>
          <p className="text-sm text-muted-foreground ">
            {Math.round(windDirection)}° {directionLabel}
          </p>
        </div>
      </div>
    </WeatherCard>
  )
}
