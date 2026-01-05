import { WeatherCard } from './WeatherCard'
import { useMoonPhase } from '@/hooks/useMoonPhase'

export const WeatherMoonPhase = () => {
  const { phaseName, phaseIcon, illumination } = useMoonPhase()

  return (
    <WeatherCard
      title="Moon Phase"
      icon={phaseIcon}
      iconAlt="Moon Phase"
      className="row-start-3 row-end-4 col-start-2 col-end-3"
    >
      <h4 className="text-3xl text-center">{phaseName}</h4>
      <p className="text-sm text-muted-foreground mt-auto">
        {illumination} illuminated
      </p>
    </WeatherCard>
  )
}
