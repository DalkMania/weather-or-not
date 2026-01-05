import { useEffect, useState } from 'react'
import { useInterval } from './useInterval'
import { DateTime } from 'luxon'

export const useTime = (timeZone: string) => {
  const timeNow = DateTime.local({ zone: timeZone })
  const [now, setNow] = useState(timeNow)

  useEffect(() => {
    setNow(timeNow)
  }, [timeZone])

  useInterval(() => {
    setNow(now.plus(1000))
  }, 1000)

  return now
}
