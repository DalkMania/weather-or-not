import type {ReactNode} from 'react';
import { cn } from '@/utils/utils'

type SectionProps = {
  children: ReactNode
  className?: string
}

export const Section = ({ children, className }: SectionProps) => {
  return (
    <section className={cn([`py-8 relative`, className])}>{children}</section>
  )
}
