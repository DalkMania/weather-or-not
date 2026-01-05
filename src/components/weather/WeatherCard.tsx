import type { ReactNode } from 'react'
import type { IconName } from '@/components/icons/Icon'
import { Card } from '@/components/ui/card'
import Icon from '@/components/icons/Icon'
import { cn } from '@/utils/utils'

type WeatherCardProps = {
  title: string
  icon?: IconName
  iconAlt?: string
  className?: string
  children: ReactNode
}

export const WeatherCard = ({
  title,
  icon,
  iconAlt,
  className,
  children,
}: WeatherCardProps) => {
  return (
    <Card className={cn('flex flex-col items-center', className)}>
      <h2 className="uppercase font-sans text-muted-foreground font-normal">
        {title}
      </h2>

      {icon && iconAlt && <Icon icon={icon} alt={iconAlt} />}

      {children}
    </Card>
  )
}
