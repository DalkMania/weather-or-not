import { useEffect, useState } from 'react'
import { useInterval } from './useInterval'
import { DateTime } from 'luxon'

export const useTime = (timeNow: DateTime<true> | DateTime<false>) => {
  const [now, setNow] = useState(timeNow)

  useEffect(() => {
    setNow(timeNow)
  }, [timeNow])

  useInterval(() => {
    setNow(now.plus(1000))
  }, 1000)

  return now
}
