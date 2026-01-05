import { useEffect, useState } from 'react'
import { DateTime } from 'luxon'
import { useInterval } from './useInterval'

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
