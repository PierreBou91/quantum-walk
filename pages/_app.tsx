import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return <Layout>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  </Layout>
}

export default MyApp
