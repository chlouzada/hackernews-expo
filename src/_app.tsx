import { registerRootComponent } from 'expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import Navigation from './navigation';
import { useState } from 'react';
import { trpc } from './utils/trpc';
import { httpBatchLink } from '@trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'https://hackernews-web-chlouzada.vercel.app/',
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider style={{ padding: 16, backgroundColor: 'black' }}>
          <StatusBar />
          <Navigation />
        </SafeAreaProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

registerRootComponent(App);
