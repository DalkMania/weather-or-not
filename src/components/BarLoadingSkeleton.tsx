import { Skeleton } from '@/components/ui/skeleton'

export const BarLoadingSkeleton = () => (
  <div className="flex h-full flex-col overflow-hidden rounded-lg border w-full max-w-4xl mx-auto gap-2 pb-1">
    <Skeleton className="h-16 border-b px-3" />
    <Skeleton className="h-32" />
  </div>
)
