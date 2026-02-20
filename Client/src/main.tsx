import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/layout/styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import App from './app/layout/App.tsx'
import { RouterProvider } from 'react-router';
import { router } from './app/router/Routes.tsx';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // good defaults
      staleTime: 60_000,        // 1 min: data considered fresh
      gcTime: 5 * 60_000,       // cache garbage-collect after 5 mins (v5)
      retry: 2,                 // retry failed queries twice
      refetchOnWindowFocus: false
    },
  },
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
