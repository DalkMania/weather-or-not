import { WeatherCard } from './WeatherCard'
import { useMoonPhase } from '@/hooks/useMoonPhase'

export const WeatherMoonPhase = () => {
  const { phaseName, phaseIcon, illumination } = useMoonPhase()

  return (
    <WeatherCard
      title="Moon Phase"
      icon={phaseIcon}
      iconAlt="Moon Phase"
      className="row-start-6 row-end-7 md:row-start-4 md:row-end-5 lg:row-start-3 lg:row-end-4 lg:col-start-2 lg:col-end-3"
    >
      <h3 className="text-3xl text-center">{phaseName}</h3>
      <p className="text-sm text-muted-foreground mt-auto">
        {illumination} illuminated
      </p>
    </WeatherCard>
  )
}
