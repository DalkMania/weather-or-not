import { useEffect, useState } from 'react'
import { useSettings } from './useLocalStorage'
import { useInterval } from './useInterval'
import type { Location } from '@/types'
import { formatRelativeFromMs, formatTimeWithMinutes } from '@/utils/formatting'
import { useWeatherData } from '@/queries/useWeatherData'

export const useLastUpdated = (
  location: Location,
): {
  relative: string | null
  absolute: string | null
  iso: string | null
} => {
  const { preferences } = useSettings()
  const { data, dataUpdatedAt } = useWeatherData({
    latitude: location.latitude,
    longitude: location.longitude,
    units: preferences?.settings.units || 'imperial',
  })

  const [now, setNow] = useState(dataUpdatedAt)

  useEffect(() => {
    setNow(dataUpdatedAt)
  }, [dataUpdatedAt])

  useInterval(() => {
    setNow(new Date().getTime())
  }, 60 * 1000)

  const iso = data?.current.time ?? null

  // Absolute label from API's current.time (already converted to location's timezone in our transformer)
  const absolute = iso ? formatTimeWithMinutes(iso) : null

  // Relative label from  Query's dataUpdatedAt
  let relative: string | null = null
  if (typeof dataUpdatedAt === 'number' && Number.isFinite(dataUpdatedAt)) {
    const diffMs = Math.max(0, now - dataUpdatedAt)
    relative = formatRelativeFromMs(diffMs)
  }

  return { relative, absolute, iso }
}
