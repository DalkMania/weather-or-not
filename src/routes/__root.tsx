import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { RootDocument } from '@/pages/RootDocument'
import appCss from '@/styles/app.css?url'

interface MyRouterContext {
  queryClient: QueryClient
}

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Weather or Not ?',
      },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),

  shellComponent: RootComponent,
})
