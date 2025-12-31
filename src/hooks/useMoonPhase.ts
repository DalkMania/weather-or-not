import { getMoonIllumination } from '@/utils/calculations'
import { getMoonPhaseIcon, getMoonPhaseName } from '@/utils/conditions'
import { getMoonIlluminationPercentage } from '@/utils/formatting'

export type MoonPhaseData = {
  phaseName: string
  phaseIcon: import('@/components/icons/Icon').IconName
  illumination: string
  fraction: number
  phase: number
}

export const useMoonPhase = () => {
  const moonData = getMoonIllumination()

  return {
    phaseName: getMoonPhaseName(moonData.phase),
    phaseIcon: getMoonPhaseIcon(moonData.phase),
    illumination: getMoonIlluminationPercentage(moonData.fraction),
    fraction: moonData.fraction,
    phase: moonData.phase,
  }
}
