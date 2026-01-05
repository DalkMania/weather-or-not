import type { ReactNode } from 'react'
import { cn } from '@/utils/utils'

type ContainerProps = {
  children: ReactNode
  className?: string
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn([`w-full max-w-7xl mx-auto px-5 relative`, className])}>
      {children}
    </div>
  )
}
